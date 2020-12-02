const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ userStates: {}, userPageInfoCompletions: {}})
  .write()

function setUserState(userId, stateLevel1, stateLevel2) {
    console.log(`setUserState: stateLevel1 = ${stateLevel1}, stateLevel2 = ${stateLevel2}`);
    db.set(`userStates.${userId}`, { stateLevel1: stateLevel1, stateLevel2: stateLevel2} ).write();
}

function getUserState(userId) {
    return db.get(`userStates.${userId}`).value();
}

function setUserPageInfoCompletion(userId, pageInfo, isCompleted) {
    const existing = db.get(`userPageInfoCompletions.${userId}`).value() || {};
    existing[pageInfo] = isCompleted;
    db.set(`userPageInfoCompletions.${userId}`,existing ).write();
}

function getUserPageInfoCompletion(userId) {
    return db.get(`userPageInfoCompletions.${userId}`).value();
}

function getDb() {
    return db.getState();
}

module.exports.setUserState = setUserState;
module.exports.getUserState = getUserState;

module.exports.setUserPageInfoCompletion = setUserPageInfoCompletion;
module.exports.getUserPageInfoCompletion = getUserPageInfoCompletion;

module.exports.getDb = getDb;
