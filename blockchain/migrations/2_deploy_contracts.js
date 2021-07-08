const SuperKarmaGovernanceV2 = artifacts.require('SuperKarmaGovernanceV2.sol');
const GovernanceStrategy = artifacts.require('GovernanceStrategy.sol');
const Executor = artifacts.require('Executor.sol');
const SuperKarmaPool = artifacts.require('SuperKarmaPool.sol');
const SuperKarmaToken = artifacts.require('SuperKarmaToken.sol');
module.exports = async function(deployer, _network, accounts) {
    const SF_HOST = '0xF0d7d1D47109bA426B9D8A3Cde1941327af1eea3';
    const SF_CFAV1 = '0xECa8056809e7e8db04A8fF6e4E82cD889a46FE2F';
    const AAVE_LENDING_POOL = '0xE0fBa4Fc209b4948668006B2bE61711b7f465bAe';
    const superKarmaPool1 = await SuperKarmaPool.new(
        SF_HOST,
        SF_CFAV1,
        AAVE_LENDING_POOL,
        'SK: Cancer Research Fund: Aave',
        'skCRF1'
    );
    const superKarmaPool2 = await SuperKarmaPool.new(
        SF_HOST,
        SF_CFAV1,
        AAVE_LENDING_POOL,
        'SK: Child Poverty Fund: Aave',
        'skCPF2'
    );
    const superKarmaPool3 = await SuperKarmaPool.new(
        SF_HOST,
        SF_CFAV1,
        AAVE_LENDING_POOL,
        'SK: Climit Change Research Fund: Aave',
        'skCCRF3'
    );

    console.log(superKarmaPool1.address);
    console.log(superKarmaPool2.address);
    console.log(superKarmaPool3.address);

    await deployer.deploy(SuperKarmaToken);
    const superKarmaToken = await SuperKarmaToken.deployed();
    superKarmaToken.mint(accounts[0], web3.utils.toWei('1000', 'ether'));

    await deployer.deploy(GovernanceStrategy, superKarmaToken.address);
    const startegy = await GovernanceStrategy.deployed();

    const votingDelay = '0';
    await deployer.deploy(SuperKarmaGovernanceV2, startegy.address, votingDelay, accounts[0], []);
    const governance = await SuperKarmaGovernanceV2.deployed();

    const ONE_DAY = web3.utils
        .toBN('60')
        .mul(web3.utils.toBN('60'))
        .mul(web3.utils.toBN('24'));

    const short_delay = ONE_DAY.mul(web3.utils.toBN('1')).toString(); // 7 days
    const short_gracePeriod = ONE_DAY.mul(web3.utils.toBN('5')).toString();
    const short_minimumDelay = '0';
    const short_maximumDelay = ONE_DAY.mul(web3.utils.toBN('30')).toString();
    const short_propositionThreshold = '200'; //  2% proposition
    const short_voteDuration = '57600'; // assuming 15 second blocks, 10 days = 15 * 4 * 60 * 24 * 10 = 864000
    const short_voteDifferential = '1500'; // 15%
    const short_minimumQuorum = '2000'; // 20%
    const shortExecutor = await Executor.new(
        governance.address,
        short_delay,
        short_gracePeriod,
        short_minimumDelay,
        short_maximumDelay,
        short_propositionThreshold,
        short_voteDuration,
        short_voteDifferential,
        short_minimumQuorum
    );

    await governance.authorizeExecutors([shortExecutor.address]);
    await superKarmaPool1.transferOwnership(shortExecutor.address);
    await superKarmaPool2.transferOwnership(shortExecutor.address);
    await superKarmaPool3.transferOwnership(shortExecutor.address);
    await governance.transferOwnership(shortExecutor.address);
};
