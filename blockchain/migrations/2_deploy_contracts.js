const WETH = artifacts.require('WETH.sol');
const MockERC20 = artifacts.require('MockERC20.sol');

module.exports = async function(deployer, _network, accounts) {
    await deployer.deploy(WETH);
    const weth = await WETH.deployed();
    await weth.deposit({ value: web3.utils.toWei('2000000', 'ether'), from: accounts[0] });

    const tka = await MockERC20.new('Token A', 'TKA', web3.utils.toWei('100000', 'ether'));
    const tkb = await MockERC20.new('Token B', 'TKB', web3.utils.toWei('100000', 'ether'));

    console.log(tka, tkb);
};
