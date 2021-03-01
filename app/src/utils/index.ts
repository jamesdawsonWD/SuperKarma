import { TxResult } from './../store/types';
import * as BN from 'bignumber.js';
export const addressZero = '0x' + '0'.repeat(40);
export const SECONDS_IN_DAY = 86400;
export const advanceTime = time => {
    return new Promise((resolve, reject) => {
        window.web3.currentProvider.send(
            {
                jsonrpc: '2.0',
                method: 'evm_increaseTime',
                params: [time],
                id: new Date().getTime()
            },
            (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            }
        );
    });
};

export const SAT_IDS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

export const getTxEventParams = (tx: TxResult, events: string[], params: string[][]) => {
    if (!events.length) return new Error('No Events where giver');
    const returnEvents: { [key: string]: any } = {};
    for (const event of events) {
        const returnValues: { [key: string]: string } = {};
        if (!tx.events || !tx.events[event]) return new Error('Event does not exist on tx receipt.');
        if (!params.length) return new Error('No Parameters where giver');
        for (const param of params) {
            for (const value of param) {
                returnValues[value] = tx.events[event].returnValues[value];
            }
        }

        returnEvents[event] = returnValues;
    }

    return returnEvents;
};
export const SYSTEM_TYPES = {
    Undiscovered: 0,
    AncientFleetAggressive: 1,
    SuperComputerEvent: 2,
    AdvancedAlienFleetAggressive: 3,
    AiFleetAggressive: 4,
    AlienFleetAggressive: 5,
    PiratesEvent: 6,
    SolarWinds: 7,
    Asteroids: 8,
    Empty: 9,
    GovermentOwned: 10,
    LowYieldSystem: 11,
    RandomEvent: 12,
    MediumYieldSystem: 13,
    ShipWreck: 14,
    HighYieldSystem: 15,
    AncientMiningSystem: 16,
    AncientWeaponSystem: 17,
    AncientShipWreck: 18,
    InsaneYieldSystem: 19,
    AncientRacePassive: 20
};

export const SYSTEM_TYPES_IDS: { [key: number]: string } = {
    0: 'Undiscovered',
    1: 'AncientFleetAggressive',
    2: 'SuperComputerEvent',
    3: 'AdvancedAlienFleetAggressiv',
    4: 'AiFleetAggressiv',
    5: 'AlienFleetAggressiv',
    6: 'PiratesEven',
    7: 'SolarWind',
    8: 'Asteroid',
    9: 'Empty',
    10: 'GovermentOwned',
    11: 'LowYieldSystem',
    12: 'RandomEvent',
    13: 'MediumYieldSystem',
    14: 'ShipWreck',
    15: 'HighYieldSystem',
    16: 'AncientMiningSystem',
    17: 'AncientWeaponSystem',
    18: 'AncientShipWreck',
    19: 'InsaneYieldSystem',
    20: 'AncientRacePassive'
};

export const SHIP_INFO = {
    0: {
        viewName: 'Federation Master Vessel',
        name: 'FEDERATION_MASTER_VESSEL',
        offense: 9,
        defense: 9
    },
    1: {
        viewName: 'Federation Cruiser',
        name: 'FEDERATION_CRUISER',
        offense: 10,
        defense: 10
    },
    2: {
        viewName: 'Federation Destroyer',
        name: 'FEDERATION_DESTROYER',
        offense: 15,
        defense: 15
    },
    3: {
        viewName: 'Federation Fighter Plane',
        name: 'FEDERATION_FIGHTER_PLANE',
        offense: 2,
        defense: 2
    },
    4: {
        viewName: 'Alien Master Vessel',
        name: 'ALIEN_MASTER_VESSEL',
        offense: 12,
        defense: 12
    },
    5: {
        viewName: 'Alien Cruiser',
        name: 'ALIEN_CRUISER',
        offense: 13,
        defense: 13
    },
    6: {
        viewName: 'Alien Destroyer',
        name: 'ALIEN_DESTROYER',
        offense: 17,
        defense: 17
    },
    7: {
        viewName: 'Alien Fighter Plane',
        name: 'ALIEN_FIGHTER_PLANE',
        offense: 3,
        defense: 3
    },
    8: {
        viewName: 'Advanced Race Master Vessel',
        name: 'ADVANCED_RACE_MASTER_VESSEL',
        offense: 15,
        defense: 15
    },
    9: {
        viewName: 'Advanced Race Cruiser',
        name: 'ADVANCED_RACE_CRUISER',
        offense: 18,
        defense: 18
    },
    10: {
        viewName: 'Advanced Race Destroyer',
        name: 'ADVANCED_RACE_DESTROYER',
        offense: 20,
        defense: 20
    },
    11: {
        viewName: 'Advanced Race Fighter Plane',
        name: 'ADVANCED_RACE_FIGHTER_PLANE',
        offense: 5,
        defense: 5
    },
    12: {
        viewName: 'Ancient War Vessel',
        name: 'ANCIENT_MASTER_VESSEL',
        offense: 20,
        defense: 20
    },
    13: {
        viewName: 'Ancient Star Cruiser',
        name: 'ANCIENT_CRUISER',
        offense: 21,
        defense: 21
    },
    14: {
        viewName: 'Ancient World Destroyer',
        name: 'ANCIENT_DESTROYER',
        offense: 30,
        defense: 30
    },
    15: {
        viewName: 'Ancient War Pod',
        name: 'ANCIENT_FIGHTER_PLANE',
        offense: 10,
        defense: 10
    },
    16: {
        viewName: 'Pirate Gun Boat',
        name: 'PIRATE_SHIP',
        offense: 11,
        defense: 11
    },
    17: {
        viewName: 'Pirate Weapon System',
        name: 'PIRATE_WEAPON',
        offense: 22,
        defense: 22
    }
};
