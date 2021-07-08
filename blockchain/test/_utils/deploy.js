import { MockERC20C, WETHC, WorldTwoSpaceC } from './artifacts';
import { advanceTime } from './evm';

export const setup = async (owner, userA, userB) => {
    const weth = await WETHC.new();
    await weth.deposit({ value: web3.utils.toWei('2000000', 'ether'), from: owner });

    const tokenA = await MockERC20C.new('Token A', 'TKA', web3.utils.toWei('100000', 'ether'));
    const tokenB = await MockERC20C.new('Token B', 'TKB', web3.utils.toWei('100000', 'ether'));

    const worldTwoSpace = await WorldTwoSpaceC.new();

    return { worldTwoSpace };
};
