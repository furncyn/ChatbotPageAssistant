const rp = require('request-promise');
const sequential = require('promise-sequential');
const PAGE_ACCESS_TOKEN = process.env.PAGE_TOKEN;

async function sendResponse(sender_psid, response) {
  if (Array.isArray(response)) {
    const async_actions = response.map(r => callSendAPI(sender_psid, r));
    const res = await sequential(async_actions);
    console.log("all done");
    console.log(res);
  } else {
    const res = await callSendAPI(sender_psid, response)
    console.log("all done");
    console.log(res);
  }
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
  }

  // Send the HTTP request to the Messenger Platform
  return rp(options);
}

module.exports.sendResponse = sendResponse;
module.exports.callSendAPI = callSendAPI;
