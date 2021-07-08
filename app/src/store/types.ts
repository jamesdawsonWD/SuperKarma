import TransactionReceipt from 'web3/types';
export interface RootState {
    version: string;
}

export interface Network {
    coinbase: string;
    networkData: NetworkData;
    coinbaseReady: boolean;
    web3Ready: boolean;
    web3: any;
    sf: any;
    contracts: {
        superKarmaPool: any;
    };
    ethReady: boolean;
    userAddress: string;
    sentTransactions: {};
}

export interface NetworkData {
    currentBlock: number;
    network: string;
    networkId: number;
}

export interface SuperFluid {
    flows: Object;
    user: Object;
    userDetails: Object;
}

export interface SuperFluidPool {
    pools: {
        [key: string]: Pool
    };
    balance: string;
    allowance: string;
}
export interface Pool {
    [key: string]: string
}
