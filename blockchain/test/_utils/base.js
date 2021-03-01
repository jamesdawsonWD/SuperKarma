export const makeShipArrayList = (ids, length) => {
    const empty = new Array(length).fill(false);
    for (let i = 0; i < ids.length; i++) {
        for (let j = 0; j < empty.length; j++) {
            empty[j] = empty[j] ? true : j == ids[i];
        }
    }
    return empty;
};

export const hasEqualValues = (a, b) => {
    if (a.length != b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] != b[i]) return false;
    }
    return true;
};

export const rawEventsExist = (signatures, tx) => {
    const results = {
        passed: true,
        events: []
    };
    for (let signature of signatures) {
        const hash = web3.utils.keccak256(signature);
        const event = tx.receipt.rawLogs.find(log => log.topics[0] == hash);

        if (typeof event === 'object' && event !== null) {
            const argTypes = signature.replace(/(^.*\(|\).*$)/g, '').split(',');
            results.events.push({
                signature,
                args: event.topics.slice(1).map((topic, index) => {
                    return web3.eth.abi.decodeParameter(argTypes[index], topic);
                })
            });
        } else if (results.passed) {
            results.passed = false;
        }
    }
    return results;
};
