import {
    FactoryC,
    ClayTokenC,
    MockERC20C,
    RouterC,
    ProspectorC,
    IUniswapV2PairC,
    ZygoProtocolC,
    WETHC,
    ClayBondsC
} from './artifacts';
import { advanceTime } from './evm';

export const setup = async (owner, userA, userB) => {
    const weth = await WETHC.new();
    await weth.deposit({ value: web3.utils.toWei('2000000', 'ether'), from: owner });

    const clay = await ClayTokenC.new();
    clay.mint(owner, web3.utils.toWei('1000000000', 'ether'));

    const tokenA = await MockERC20C.new('Token A', 'TKA', web3.utils.toWei('100000', 'ether'));
    const tokenB = await MockERC20C.new('Token B', 'TKB', web3.utils.toWei('100000', 'ether'));

    const factory = await FactoryC.new('0x' + '0'.repeat(40));
    const wethTokenAPairTX = await factory.createPair(weth.address, tokenA.address);
    const wethClayPairTX = await factory.createPair(weth.address, clay.address);
    const tokenATokenBPairTX = await factory.createPair(tokenA.address, tokenB.address);

    const wethTokenAPair = wethTokenAPairTX.receipt.logs[0].args.pair;
    const wethClayPair = wethClayPairTX.receipt.logs[0].args.pair;
    const tokenATokenBPair = tokenATokenBPairTX.receipt.logs[0].args.pair;

    const pair = await IUniswapV2PairC.at(wethClayPair);

    const router = await RouterC.new(factory.address, weth.address);
    const blockNumber = await web3.eth.getBlockNumber();
    const block = await web3.eth.getBlock(blockNumber);
    const timestamp = block.timestamp + 300;

    await weth.approve(router.address, '2000000000000000000000000');
    await clay.approve(router.address, '2000000000000000000000000');
    await tokenA.approve(router.address, '2000000000000000000000000');

    const tx = await router.addLiquidity(
        weth.address,
        clay.address,
        '40000000000000000000',
        '100000000000000000000',
        '3999999999999990000000',
        '199999999999999000000',
        owner,
        timestamp,
        { gas: 4000000 }
    );

    // console.log(decoded);
    //     address tokenA,
    // address tokenB,
    // uint256 amountADesired,
    // uint256 amountBDesired,
    // uint256 amountAMin,
    // uint256 amountBMin,
    // address to,
    // uint256 deadline

    // await deployer.deploy(SushiToken);
    // const sushiToken = await SushiToken.deployed();

    const prospector = await ProspectorC.new(clay.address, web3.utils.toWei('100'), 1, 1);
    await prospector.add(web3.utils.toWei('50'), wethClayPair, false);
    await prospector.add(web3.utils.toWei('10'), wethTokenAPair, false);
    await clay.transferOwnership(prospector.address);

    const tx1 = await router.addLiquidity(
        weth.address,
        tokenA.address,
        '40000000000000000000',
        '100000000000000000000',
        '3999999999999990000000',
        '199999999999999000000',
        owner,
        timestamp,
        { gas: 4000000 }
    );

    const bonds = await ClayBondsC.new(clay.address, web3.utils.toWei('200000000', 'ether'));
    await clay.transfer(bonds.address, web3.utils.toWei('200000000', 'ether'));

    // await deployer.deploy(SushiBar, sushiToken.address);
    // const sushiBar = await SushiBar.deployed();

    // await deployer.deploy(SushiMaker, factory.address, sushiBar.address, sushiToken.address, weth.address);
    // const sushiMaker = await SushiMaker.deployed();
    // await factory.setFeeTo(sushiMaker.address, { from: addresses[0] });

    // await deployer.deploy(
    //     Migrator,
    //     masterChef.address,
    //     '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    //     factory.address,
    //     1
    // );
    return { clay, weth, factory, router, prospector, pair, bonds };
};
