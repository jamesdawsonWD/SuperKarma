// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import {ISuperfluid, ISuperToken, ISuperApp, ISuperAgreement, SuperAppDefinitions} from './interfaces/superFluidInterfaces/superfluid/ISuperfluid.sol';
// When ready to move to leave Remix, change imports to follow this pattern:
// "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import {IConstantFlowAgreementV1} from './interfaces/superFluidInterfaces/agreements/IConstantFlowAgreementV1.sol';
import {ILendingPool} from './interfaces/ILendingPool.sol';
import {IERC20} from './interfaces/IERC20.sol';
import {SuperKarmaPoolToken} from './SuperKarmaPoolToken.sol';
import {SuperAppBase} from './interfaces/superFluidInterfaces/SuperAppBase.sol';

contract SuperKarmaPool is SuperAppBase, SuperKarmaPoolToken {
    ISuperfluid private _host; // host
    IConstantFlowAgreementV1 private _cfa; // the stored constant flow agreement class address
    ILendingPool _aave;
    string public _name;
    mapping(address => uint256) totalDeposits;
    struct FlowInfo {
        uint256 lastClaim;
        int96 flowRate;
    }

    mapping(address => FlowInfo) public flowInfos;

    constructor(
        ISuperfluid host,
        IConstantFlowAgreementV1 cfa,
        ILendingPool aave,
        string memory name,
        string memory symbol
    ) SuperKarmaPoolToken(name, symbol) {
        assert(address(host) != address(0));
        assert(address(cfa) != address(0));
        //assert(!_host.isApp(ISuperApp(receiver)));

        _host = host;
        _cfa = cfa;
        _aave = aave;
        _name = name;

        uint256 configWord = SuperAppDefinitions.APP_LEVEL_FINAL |
            SuperAppDefinitions.BEFORE_AGREEMENT_CREATED_NOOP |
            SuperAppDefinitions.BEFORE_AGREEMENT_UPDATED_NOOP |
            SuperAppDefinitions.BEFORE_AGREEMENT_TERMINATED_NOOP;

        _host.registerApp(configWord);
    }

    event AgreementCreated(uint256 superTokenBalance, uint256 underlyingBalance);

    function donateERC20(IERC20 _token, uint256 _amount) external {
        _token.transferFrom(msg.sender, address(this), _amount);
        _aave.deposit(address(_token), _token.balanceOf(address(this)), address(this), 0);
        _mint(msg.sender, 1 ether);
    }

    function withdraw(
        IERC20 _token,
        uint256 _amount,
        address _to
    ) external {
        _aave.withdraw(address(_token), _amount, _to);
    }

    function updateDeposits(ISuperToken _superToken) public {
        if (_superToken.balanceOf(address(this)) > 0) {
            _superToken.downgrade(_superToken.balanceOf(address(this)));
            if (
                IERC20(_superToken.getUnderlyingToken()).allowance(address(this), address(_aave)) ==
                uint256(0)
            ) {
                IERC20(_superToken.getUnderlyingToken()).approve(address(_aave), uint256(-1));
            }
            totalDeposits[address(_superToken)] =
                totalDeposits[address(_superToken)] +
                _superToken.balanceOf(address(this));
            _aave.deposit(
                _superToken.getUnderlyingToken(),
                IERC20(_superToken.getUnderlyingToken()).balanceOf(address(this)),
                address(this),
                0
            );
        }
    }

    function claimSuperKarma(ISuperToken _superToken) external returns (bytes memory newCtx) {
        require(
            block.timestamp > flowInfos[msg.sender].lastClaim + 1 weeks,
            'Can only claim rewards once a week'
        );
        (, int96 outFlowRate, , ) = _cfa.getFlow(_superToken, address(this), msg.sender);
        require(outFlowRate > int96(0), 'You must have an active flow to claim');
        require(_superToken.balanceOf(msg.sender) > uint256(0), 'Balance must be greater than zero');
        _mint(msg.sender, 1 ether);
        (, int96 tokenFlowRate, , ) = _cfa.getFlow(_superToken, msg.sender, address(this));
        flowInfos[msg.sender] = FlowInfo({lastClaim: block.timestamp, flowRate: tokenFlowRate});
    }

    /**************************************************************************
     * SuperApp callbacks
     *************************************************************************/

    function afterAgreementCreated(
        ISuperToken _superToken,
        address _agreementClass,
        bytes32, // _agreementId,
        bytes calldata _agreementData,
        bytes calldata, // _cbdata,
        bytes calldata _ctx
    ) external override onlyHost returns (bytes memory newCtx) {
        updateDeposits(_superToken);
        return _ctx;
    }

    function afterAgreementUpdated(
        ISuperToken _superToken,
        address _agreementClass,
        bytes32, //_agreementId,
        bytes calldata _agreementData,
        bytes calldata, //_cbdata,
        bytes calldata _ctx
    ) external override onlyHost returns (bytes memory newCtx) {
        updateDeposits(_superToken);
        return _ctx;
    }

    function afterAgreementTerminated(
        ISuperToken _superToken,
        address _agreementClass,
        bytes32, //_agreementId,
        bytes calldata, /*_agreementData*/
        bytes calldata, //_cbdata,
        bytes calldata _ctx
    ) external override onlyHost returns (bytes memory newCtx) {
        updateDeposits(_superToken);
        return _ctx;
    }

    function _isCFAv1(address agreementClass) private view returns (bool) {
        return
            ISuperAgreement(agreementClass).agreementType() ==
            keccak256('org.superfluid-finance.agreements.ConstantFlowAgreement.v1');
    }

    modifier onlyHost() {
        require(msg.sender == address(_host), 'RedirectAll: support only one host');
        _;
    }
}
