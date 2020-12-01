const request = require('request');
const PAGE_ACCESS_TOKEN = process.env.PAGE_TOKEN;

function sendResponse(sender_psid, response) {
  if (Array.isArray(response)) {
    for (r of response) {
      callSendAPI(sender_psid, r);
    }
  } else {
    callSendAPI(sender_psid, response)
  }
}

function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  });
}

module.exports.sendResponse = sendResponse;
