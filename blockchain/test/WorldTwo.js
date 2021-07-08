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
    });
    afterEach(async () => {
        await revertSnapshot(web3, snapshotId);
    });

    // Setup
    before(async () => {
        Contracts = await setup(Owner, UserA, UserB);
    });
    describe('One year bond', async () => {
        //50538
        it('mint()', async () => {
            const tx = await Contracts.worldTwoSpace.claim([web3.utils.fromAscii('bob.john.boy')]);
            const tx1 = await Contracts.worldTwoSpace.locations(web3.utils.fromAscii('bob.john.boy'));
            console.log(tx1);
        });
    });
});
