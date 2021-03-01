import Vue from 'vue';
import BN from 'bignumber.js';
import web3 from 'web3'
Vue.filter('decimalsPrecision', function (value: BN | number | string, precision: number) {
    if (!value) {
        return '';
    }
    return new BN(value).div(10 ** precision);
});

Vue.filter('toFixed', function (value: BN | number | string, fixed: number) {
    if (!value) {
        return '';
    }
    return new BN(value).toFixed(fixed);
});
Vue.filter('fromWeiToReadable', function (value: string) {
    if (!value) {
        return '';
    }
    const readable = web3.utils.fromWei(value, "ether")
    return readable;
});


Vue.filter('increment', function (value: number, amount: number) {
    if (!value) {
        return '';
    }
    return value + amount;
});

Vue.filter('removeHyphens', function (value: string) {
    if (!value) {
        return '';
    }
    return value.replace(/-/g, ' ');
});

Vue.filter('secondsToDays', function (seconds: number) {
    if (!seconds) {
        return '';
    }
    return seconds / (24 * 3600);
});
Vue.filter('shortAddress', function (address: string) {
    if (!address) {
        return '';
    }
    return address.substring(0, 6) + '...' + address.substring(address.length - 4, address.length + 1);
});
