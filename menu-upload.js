const common = require('./common');
const { RESPONSES, STATES } = require('./constants');

function handleMenuUpload(sender_psid, stateLevel1, stateLevel2, db) {
    if (stateLevel2 === 'A') {
        const response = RESPONSES.ADD_MENU;
        db.setUserState(sender_psid, 3, 'B');
        common.callSendAPI(sender_psid, response);
        return;
    }
    if (stateLevel2 === 'B') {
        const response = RESPONSES.ADD_MENU_DESCRIPTION;
        db.setUserState(sender_psid, 4);
        common.callSendAPI(sender_psid, response);
        return;
    }
}

module.exports.handleMenuUpload = handleMenuUpload;
