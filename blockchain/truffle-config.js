/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * truffleframework.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like truffle-hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */
require('dotenv').config();
// Importing babel to be able to use ES6 imports
require('babel-register')({
    presets: [
        [
            'env',
            {
                targets: {
                    node: '8.0'
                }
            }
        ]
    ],
    retainLines: true
});
require('babel-polyfill');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const MNEMONIC = process.env.MNEMONIC;
const INFURA_KEY = process.env.INFURA_KEY;

console.log(MNEMONIC, INFURA_KEY);
const needsInfura =
    process.env.npm_config_argv &&
    (process.env.npm_config_argv.includes('rinkeby') || process.env.npm_config_argv.includes('live'));

if ((!MNEMONIC || !INFURA_KEY) && needsInfura) {
    console.error('Please set a mnemonic and infura key.');
    process.exit(0);
}

module.exports = {
    /**
     * Networks define how you connect to your ethereum client and let you set the
     * defaults web3 uses to send transactions. If you don't specify one truffle
     * will spin up a development blockchain for you on port 9545 when you
     * run `develop` or `test`. You can ask a truffle command to use a specific
     * network from the command line, e.g
     *
     * $ truffle test --network <network-name>
     */
    networks: {
        // Useful for testing. The `development` name is special - truffle uses it by default
        // if it's defined here and no other network is specified at the command line.
        // You should run a client (like ganache-cli, geth or parity) in a separate terminal
        // tab if you use this network and you must also set the `host`, `port` and `network_id`
        // options below to some value.
        development: {
            host: '127.0.0.1',
            port: 8545,
            gas: 4600000,
            network_id: '*', // Match any network id,
            skipDryRun: true
        },
        matic: {
            provider: function() {
                return new HDWalletProvider(MNEMONIC, 'https://rpc-mumbai.matic.today');
            },
            network_id: '80001'
        },
        rinkeby: {
            provider: function() {
                return new HDWalletProvider(MNEMONIC, 'https://rinkeby.infura.io/v3/' + INFURA_KEY);
            },
            network_id: '*',
            gas: 4600000
        },
        kovan: {
            provider: function() {
                return new HDWalletProvider(MNEMONIC, 'https://kovan.infura.io/v3/' + INFURA_KEY);
            },
            network_id: '*',
            gasPrice: 70000000000
        },

        live: {
            network_id: 1,
            provider: function() {
                return new HDWalletProvider(MNEMONIC, 'https://mainnet.infura.io/v3/' + INFURA_KEY);
            },
            gas: 4000000,
            gasPrice: 20000000000
        }
    },

    // Set default mocha options here, use special reporters etc.
    mocha: {
        reporter: 'eth-gas-reporter',
        reporterOptions: {
            currency: 'USD',
            gasPrice: 3
        }
    },

    // Configure your compilers
    compilers: {
        solc: {
            version: '0.7.0',
            // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
            settings: {
                // See the solidity docs for advice about optimization and evmVersion
                optimizer: {
                    enabled: true,
                    runs: 200
                }
            }
        }
    }
};
