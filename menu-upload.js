const common = require('./common');
const { RESPONSES, STATES } = require('./constants');

function handleMenuUpload(sender_psid, stateLevel1, stateLevel2, db) {
    if (stateLevel2 === 'A') {
        const response = RESPONSES.ADD_MENU;
        db.setUserState(sender_psid, 3, 'B');
        common.sendResponse(sender_psid, response);
        return;
    } else if (stateLevel2 === 'B') {
        const response = RESPONSES.SEND_MENU_PHOTO;
        db.setUserState(sender_psid, 3, 'C');
        common.sendResponse(sender_psid, response);
        return;
    } else if (stateLevel2 === 'C') {
        const response = RESPONSES.ADD_MENU_DESCRIPTION;
        db.setUserState(sender_psid, 3, 'D');
        common.sendResponse(sender_psid, response);
        return;
    } else {
        const response = RESPONSES.ADD_MORE_MENU;
        db.setUserState(sender_psid, 4);
        common.sendResponse(sender_psid, response);
        return;
    }
}

module.exports.handleMenuUpload = handleMenuUpload;
