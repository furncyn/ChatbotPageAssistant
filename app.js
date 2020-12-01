/**
 * To run this code, you must do the following:
 *
 * 1. Deploy this code to a server running Node.js
 * 2. Run `npm install`
 * 3. Update the VERIFY_TOKEN
 * 4. Add your PAGE_ACCESS_TOKEN to your environment vars
 */

'use strict';
const PAGE_ACCESS_TOKEN = process.env.PAGE_TOKEN;
const PREFIX = 'fb_hackathon';

// SAMPLE DB APIs
// db.setUserState('12345', 1, 'A');
// db.setUserState('23456', 7, 'B');
// console.log(db.getUserState('12345')); // { stateLevel1: 1, stateLevel2: 'A' }
// console.log(db.getUserState('23456')); // { stateLevel1: 7, stateLevel2: 'B' }

// db.setUserPageInfoCompletion('12345', 'profilePhoto', true);
// db.setUserPageInfoCompletion('12345', 'coverPhoto', true);
// console.log(db.getUserPageInfoCompletion('12345')); // { coverPhoto: true, profilePhoto: true }

// console.log(db.getDb());

// Imports dependencies and set up http server
const
  db = require('./db'),
  request = require('request'),
  express = require('express'),
  body_parser = require('body-parser'),
  app = express().use(body_parser.json()); // creates express http server

const
  { STATES, RESPONSES } = require('./constants'),
  { getDebugReponse } = require('./utils');

// Sets server port and logs message on success
app.listen(1337, () => console.log('webhook is listening on port 1337'));

// Accepts POST requests at /webhook endpoint
app.post('/' + PREFIX + '/webhook', (req, res) => {
  console.log('POST request received');
  // console.log(req);

  // Parse the request body from the POST
  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {

    body.entry.forEach(function (entry) {

      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender ID: ' + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }

    });
    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');

  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});

// Accepts GET requests at the /webhook endpoint
app.get('/' + PREFIX + '/webhook', (req, res) => {
  console.log('GET request received');
  console.log(req);

  /** UPDATE YOUR VERIFY TOKEN **/
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  // Parse params from the webhook verification request
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  // Check if a token and mode were sent
  if (mode && token) {

    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {

      // Respond with 200 OK and challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);

    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

function handleMessage(sender_psid, received_message) {
  let response;
  try {
    const debugReponse = getDebugReponse(received_message);
    if (debugReponse) {
      response = debugReponse;
    } else if (received_message.text && received_message.text.toLowerCase() === "hi") {
      // Initialize conversation
      response = RESPONSES.GET_STARTED;
      db.setUserState(sender_psid, 1, 'A');
    } else {
      let userState = db.getUserState(sender_psid);
      if (received_message.text && received_message.text.startsWith("jump")) {
        // 2nd param should be jump state. Ignore rest.
        const n_state = parseInt(received_message.text.trim().split(' ')[1]);
        if (n_state) {
          userState = {'stateLevel1': n_state, 'stateLevel2': 'A'};
        }
      }
      if (userState != null) {
        const stateLevel1 = userState.stateLevel1;
        const stateLevel2 = userState.stateLevel2;
        switch (stateLevel1) {
          case 1:
            if (stateLevel2 === 'A') {
              response = RESPONSES.ADD_PROFILE_PHOTO;
              db.setUserState(sender_psid, 1, 'B');
            } else {
              const attachment_url = received_message.attachments[0].payload.url;
              response = RESPONSES.PREVIEW_PROFILE_PHOTO;
              db.setUserState(sender_psid, 2, 'A');
            }
            break;
          case 2:
            response = RESPONSES.ADD_COVER_PHOTO;
            db.setUserState(sender_psid, 3);
            break;
          case 3:
            response = RESPONSES.CHOOSE_BUSINESS_CATEGORY;
            db.setUserState(sender_psid, 4);
            break;
          case 4:
            response = RESPONSES.SET_LOCATION;
            db.setUserState(sender_psid, 5);
            break;
          case 5:
            response = {
              "text": `State ${userState.stateLevel1} not implemented yet`
            };
            db.setUserState(sender_psid, 6);
            break;
          case 6:
            if (stateLevel2 === 'A') {
              response = RESPONSES.SET_CONTACT_INFO;
              db.setUserState(sender_psid, 6, 'B');
            } else {
              response = {
                "text": `Input your ${received_message.text}, ${received_message.payload}`
              };
              db.setUserState(sender_psid, 7);
            }
            break;
          case 7:
            response = RESPONSES.START_MODULE_2;
            db.setUserState(sender_psid, 8);
            break;
          case 8:
            response = {
              "text": `State ${userState.stateLevel1} not implemented yet`
            };
            db.setUserState(sender_psid, 9);
            break;
          case 9:
            response = RESPONSES.SET_AUTO_REPLAY;
            db.setUserState(sender_psid, 10);
            break;
          case 10:
            response = {
              "text": `State ${userState.stateLevel1} not implemented yet`
            };
            db.setUserState(sender_psid, 11);
            break;
          case 11:
            response = RESPONSES.FINISH_MODULE_2;
            db.setUserState(sender_psid, 12);
            break;
          default:
            response = {
              "text": `State ${userState.stateLevel1} not implemented yet`
            };
        }
        // // Create the payload for a basic text message, which
        // // will be added to the body of our request to the Send API
        // response = {
        //   "text": `You sent the message: "${received_message_text}". Now send me an attachment!`
        // }
      }

      // Get the URL of the message attachment
      // let attachment_url = received_message.attachments[0].payload.url;
      // response = {
      //   "attachment": {
      //     "type": "template",
      //     "payload": {
      //       "template_type": "generic",
      //       "elements": [{
      //         "title": "It would be better to upload a profile photo with less text",
      //         "subtitle": "Would you like to resend another photo?",
      //         "image_url": attachment_url,
      //         "buttons": [
      //           {
      //             "type": "postback",
      //             "title": "Yes",
      //             "payload": "yes",
      //           },
      //           {
      //             "type": "postback",
      //             "title": "Skip",
      //             "payload": "no",
      //           }
      //         ],
      //       }]
      //     }
      //   }
      // }
      //Please don't delete this part

      // response = {
      //   "attachment": {
      //     "type": "template",
      //     "payload": {
      //       "template_type": "generic",
      //       "elements": [{
      //         "title": "Is this the right picture?",
      //         "subtitle": "Tap a button to answer.",
      //         "image_url": attachment_url,
      //         "buttons": [
      //           {
      //             "type": "postback",
      //             "title": "Yes!",
      //             "payload": "yes",
      //           },
      //           {
      //             "type": "postback",
      //             "title": "No!",
      //             "payload": "no",
      //           }
      //         ],
      //       }]
      //     }
      //   }
      // }
    }
  } catch(err) {
    response = {"text": err};
  }
  // Send the response message
  callSendAPI(sender_psid, response);
}

function handlePostback(sender_psid, received_postback) {
  console.log('ok')
  let response;
  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === 'Add Photo') {
    response = { "text": "Please send me a profile photo." }
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
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
