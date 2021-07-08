// pragma solidity 0.7.0;

// import {Initializable} from '@openzeppelin/upgrades/contracts/Initializable.sol';
// import {Types} from './lib/Types.sol';
// import {GameStorage} from './GameStorage.sol';
// import {SafeMath} from '@openzeppelin/contracts/math/SafeMath.sol';

// contract Attack is Initializable {
//     using SafeMath for uint256;
//     IGameStorage GS;

//     function initialize(address _gameStorage) public {
//         GS = IGameStorage(_gameStorage);
//     }

//     function attack(address defender) public {
//         require(defender != msg.sender, 'You cannot attack yourself');
//         require(defender != address(0) && msg.sender != address(0), 'Addresses must exist must exist');

//         AttackInfo memory info;
//         info.attackerPos = GS.getMasterFleetPosition(msg.sender);
//         info.defenderPos = GS.getMasterFleetPosition(defender);

//         require(
//             Types.positionIsEqual(info.attackerPos, info.defenderPos),
//             'You can only attack people at your current star location'
//         );

//         (info.a_offense, info.a_defense, info.a_balances, info.a_ids) = calculateStats(msg.sender);
//         (info.d_offense, info.d_defense, info.d_balances, info.d_ids) = calculateStats(defender);

//         emit BattleStarted(
//             msg.sender,
//             info.a_offense,
//             info.a_defense,
//             defender,
//             info.d_offense,
//             info.d_defense
//         );
//         bool result = battle(info.a_offense, info.a_defense, info.d_offense, info.d_defense, true, turns);

//         if (result) {
//             for (uint256 i = 0; i < info.a_balances.length; i++) {
//                 info.a_balances[i] = info.a_balances[i] > 0 ? info.a_balances[i].mul(20).div(100) : 0; // 20% of attackers fleet is lost in a successful attack
//             }
//             TS.recieveSats(msg.sender, info.a_ids, info.a_balances);

//             info.d_retreated = new uint256[](info.d_balances.length);
//             for (uint256 i = 0; i < info.d_balances.length; i++) {
//                 // 70% of defenders fleet is lost in a successful attack
//                 uint256 losses = info.d_balances[i].mul(70).div(100);
//                 info.d_balances[i] = info.d_balances[i] > 0 ? losses : 0;
//                 info.d_retreated[i] = info.d_balances[i] > losses ? info.d_balances[i].sub(losses) : 0;
//             }

//             uint256 _tokenId = GS.getProxyAddressToTokenId(defender);
//             if (_tokenId > 0) {
//                 // the remaining fleet managed to escape back to command
//                 // while destroying the mining equipment
//                 address owner = fhr.ownerOf(_tokenId);
//                 TS.sendSats(owner, info.d_ids, info.d_retreated);
//                 TS.transferFhr(owner, msg.sender, _tokenId);
//             }
//             TS.recieveSats(defender, info.d_ids, info.d_balances);
//         } else {
//             for (uint256 i = 0; i < info.a_balances.length; i++) {
//                 info.a_balances[i] = info.a_balances[i] > 0 ? info.a_balances[i].mul(90).div(100) : 0; // 20% of attackers fleet is lost in a successful attack
//             }
//             TS.recieveSats(msg.sender, info.a_ids, info.a_balances);

//             info.d_retreated = new uint256[](info.d_balances.length);
//             for (uint256 i = 0; i < info.d_balances.length; i++) {
//                 // 70% of defenders fleet is lost in a successful attack
//                 uint256 losses = info.d_balances[i].mul(10).div(100);
//                 info.d_balances[i] = info.d_balances[i] > 0 ? losses : 0;
//                 info.d_retreated[i] = info.d_balances[i] > losses ? info.d_balances[i].sub(losses) : 0;
//             }

//             TS.recieveSats(defender, info.d_ids, info.d_balances);
//         }
//     }

//     function battle(
//         uint256 a_offense,
//         uint256 a_health,
//         uint256 d_offense,
//         uint256 d_health,
//         bool defenderGoesFirst,
//         uint8 turns
//     ) internal returns (bool result) {
//         uint256 turnThreshold = 10;
//         uint256 attackerAttack = uint256(
//             a_offense.div(turnThreshold) != 0 ? a_offense.div(turnThreshold) : 1
//         );
//         uint256 defenderAttack = uint256(
//             d_offense.div(turnThreshold) != 0 ? d_offense.div(turnThreshold) : 1
//         );

//         uint256 nonce = attackerAttack * defenderAttack;
//         uint256 damageD;
//         uint256 damageA;
//         for (uint8 i = 0; i < turns; i++) {
//             if (defenderGoesFirst) {
//                 damageD = randomrange(1, defenderAttack);
//                 damageA = randomrange(1, attackerAttack);
//                 emit LogRound(damageA, damageD, a_health, d_health);
//                 a_health = a_health > damageD ? a_health.sub(damageD) : 0;
//                 d_health = d_health > damageA ? d_health.sub(damageA) : 0;
//             } else {
//                 damageD = randomrange(1, defenderAttack);
//                 damageA = randomrange(1, attackerAttack);
//                 d_health = d_health > damageA ? d_health.sub(damageA) : 0;
//                 a_health = a_health > damageD ? a_health.sub(damageD) : 0;
//             }
//             if (a_health == 0 || d_health == 0) break;
//         }

//         // the result is true if the attacker wins and false if the defender wins
//         result = a_health > d_health;

//         emit LogBattle(result, a_health, d_health);
//     }

//     function calculateStats(address fleet)
//         internal
//         returns (
//             uint256 offense,
//             uint256 defense,
//             uint256[] memory balances,
//             uint256[] memory ids
//         )
//     {
//         ids = new uint256[](GS.getTotalSats());
//         address[] memory accounts = new address[](ids.length);
//         for (uint256 i = 0; i < ids.length; i++) {
//             ids[i] = i;
//             accounts[i] = fleet;
//         }
//         balances = sats.balanceOfBatch(accounts, ids);
//         (uint256[] memory offenses, uint256[] memory defenses) = GS.batchGetSatInfo(ids);
//         for (uint256 i = 0; i < balances.length; i++) {
//             (uint256 o, uint256 d) = (offenses[i], defenses[i]);
//             offense += o.mul(balances[i]);
//             defense += d.mul(balances[i]);
//         }
//     }
// }
