import { takeSnapshot, revertSnapshot, advanceTime } from './_utils/evm';
import { setup } from './_utils/deploy';
import truffleAssert from 'truffle-assertions';

contract('ClayBonds', async accounts => {
    // Accounts
    const [Owner, UserA, UserB, UserC, UserD] = accounts;
    const YEAR = 31622400;
    const BN = web3.utils.toBN;
    let Contracts = {};
    // State snapshotting
    let snapshotId;
    beforeEach(async () => {
        snapshotId = await takeSnapshot(web3);
        await Contracts.clay.approve(Contracts.bonds.address, web3.utils.toWei('200000', 'ether'));
        await Contracts.clay.approve(Contracts.bonds.address, web3.utils.toWei('200000', 'ether'), {
            from: UserA
        });
    });
    afterEach(async () => {
        await revertSnapshot(web3, snapshotId);
    });

    // Setup
    before(async () => {
        Contracts = await setup(Owner, UserA, UserB);
        await Contracts.clay.transfer(UserA, web3.utils.toWei('100', 'ether'));
    });
    describe('One year bond', async () => {
        //50538
        it('mint()', async () => {
            const tx = await Contracts.bonds.mint(web3.utils.toWei('10', 'ether'));
            const id = tx.receipt.logs[3].args;
            console.log(id.reward.toString());
            console.log(id.apy.toString());
            console.log(id.amount.toString());
            console.log(id.poy.toString());
            const balance = await Contracts.bonds.balanceOf(Owner);
            console.log(balance.toString());

            // assert.ok(balance.toString() == web3.utils.toWei('20', 'ether'));
        });
        it('mint()', async () => {
            await advanceTime(YEAR - 100000);
            const tx = await Contracts.bonds.mint(web3.utils.toWei('1', 'ether'), { from: UserA });
            const id = tx.receipt.logs[3].args;
            console.log(id.reward.toString());
            console.log(id.apy.toString());
            console.log(id.amount.toString());
            console.log(id.poy.toString());

            const balance = await Contracts.bonds.balanceOf(UserA);
            console.log(balance.toString());

            // assert.ok(balance.toString() == web3.utils.toWei('20000', 'ether'));
        });
        it('claim()', async () => {
            const amount = web3.utils.toWei('10', 'ether');
            const balance = await Contracts.clay.balanceOf(UserA);
            console.log(balance.toString());
            const tx = await Contracts.bonds.mint(amount, { from: UserA });
            await advanceTime(YEAR * 3);
            const tx2 = await Contracts.bonds.claim({ from: UserA });
            const clayBalance = await Contracts.clay.balanceOf(UserA);
            const bondBalance = await Contracts.bonds.balanceOf(UserA);

            assert.equal(bondBalance.toString(), '0');
            console.log(clayBalance.toString());
            // assert.equal(
            //     clayBalance.toString(),
            //     BN(amount)
            //         .add(
            //             BN(amount)
            //                 .div(BN(100))
            //                 .mul(BN(30))
            //         )
            //         .toString()
            // );
        });
        // describe('Reverts', async () => {
        //     it('amount 0', async () => {
        //         await truffleAssert.fails(
        //             Contracts.bonds.mint(0, 0),
        //             truffleAssert.ErrorType.revert,
        //             'Amount must be greater than zero'
        //         );
        //     });
        //     it('maturation not reached', async () => {
        //         const amount = web3.utils.toWei('20000', 'ether');
        //         const tx = await Contracts.bonds.mint(0, amount);
        //         const id = tx.receipt.logs[0].args.id.toString();
        //         await truffleAssert.fails(
        //             Contracts.bonds.claim(id, amount),
        //             truffleAssert.ErrorType.revert,
        //             'Bond has not complete'
        //         );
        //     });
        // });
    });
    // it('fill() - should fill an order', async () => {
    //     await Contracts.weth.approve(
    //         Contracts.zygoProtocol.address,
    //         web3.utils.toWei('200000000000', 'ether')
    //     );
    //     await Contracts.zygo.approve(
    //         Contracts.zygoProtocol.address,
    //         web3.utils.toWei('200000000000', 'ether')
    //     );

    //     const fromAmount = web3.utils.toWei('5', 'ether');
    //     const toAmount = web3.utils.toWei('20', 'ether');

    //     const tx = await Contracts.zygoProtocol.create(
    //         Contracts.weth.address,
    //         fromAmount,
    //         Contracts.tka.address,
    //         toAmount
    //     );

    //     const orderId = tx.receipt.logs[0].args.orderId;
    //     const order = await Contracts.zygoProtocol.orders.call(orderId);
    //     const tkaBalanceBefore = await Contracts.tka.balanceOf(UserA);
    //     const zygoBefore = await Contracts.zygo.balanceOf(UserA);
    //     await Contracts.tka.approve(
    //         Contracts.zygoProtocol.address,
    //         web3.utils.toWei('200000000000', 'ether'),
    //         { from: UserA }
    //     );

    //     await Contracts.zygoProtocol.fill(orderId.toString(), { from: UserA });

    //     const tkaBalanceAfter = await Contracts.tka.balanceOf(UserA);
    //     const zygoAfter = await Contracts.zygo.balanceOf(UserA);

    //     assert.ok(
    //         web3.utils
    //             .toBN(zygoAfter)
    //             .sub(web3.utils.toBN(zygoBefore))
    //             .eq(web3.utils.toBN(fromAmount))
    //     );
    //     assert.ok(
    //         web3.utils
    //             .toBN(tkaBalanceBefore)
    //             .sub(web3.utils.toBN(tkaBalanceAfter))
    //             .eq(web3.utils.toBN(toAmount))
    //     );
    // });
});
