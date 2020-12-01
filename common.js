const rp = require('request-promise');
// const PAGE_ACCESS_TOKEN = process.env.PAGE_TOKEN;
const PAGE_ACCESS_TOKEN = 'EAAB51ZBkNWZAYBAAQKiktG0mZBdgvVfQxZCQ4GQO1txMZCpxeojb5wXpzNeYaTnNTZCZClaZBNdQPhZCcGLpZBt2pmhXaoNA6hTMV2HBvbfmu6kktMD9bvAdJ4LO3QlmvWGtZAK0n6WZBWrtxrU9QZB735IaixZB8EKDC2v4xiYcUIk3fZCaZC9WjPxedcbmEIlwxlS89pYZD'

function sendResponse(sender_psid, response) {
  let call = null;
  if (Array.isArray(response)) {
    call = response.reduce((prev, r) => prev.then(
      () => callSendAPI(sender_psid, r)
    ), Promise.resolve());
  } else {
    call = callSendAPI(sender_psid, response);
  }

  call.then(() => {
    console.log("Successfully sent all messages");
  }).catch((err) => {
    console.error(`Error: ${err}`);
  });
}

function callSendAPI(sender_psid, response) {
  // Construct the message body
  const request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  };

  const options = {
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  };
  console.log('token:', PAGE_ACCESS_TOKEN);

  // Send the HTTP request to the Messenger Platform
  return rp(options);
}

module.exports.sendResponse = sendResponse;
module.exports.callSendAPI = callSendAPI;
