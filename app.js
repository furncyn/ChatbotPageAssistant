/**
 * To run this code, you must do the following:
 *
 * 1. Deploy this code to a server running Node.js
 * 2. Run `npm install`
 * 3. Update the VERIFY_TOKEN
 * 4. Add your PAGE_ACCESS_TOKEN to your environment vars
 */

'use strict';
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
  common = require('./common'),
  menuUpload = require('./menu-upload'),
  express = require('express'),
  body_parser = require('body-parser'),
  app = express().use(body_parser.json()); // creates express http server

const
  { CONFIRM_LOCATION, PREVIEW_PROFILE_PHOTO_SUCCESS, RESPONSES, STATES } = require('./constants'),
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
          userState = { 'stateLevel1': n_state, 'stateLevel2': 'A' };
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
            } else if (stateLevel2 === 'B') {
              response = RESPONSES.PREVIEW_PROFILE_PHOTO_FAIL;
              db.setUserState(sender_psid, 1, 'C');
            } else if (stateLevel2 === 'C') {
              response = RESPONSES.ADD_PROFILE_PHOTO_AGAIN;
              db.setUserState(sender_psid, 1, 'D');
            } else {
              const attachment_url = received_message.attachments[0].payload.url;
              response = PREVIEW_PROFILE_PHOTO_SUCCESS(attachment_url);
              db.setUserState(sender_psid, 2);
            }
            break;
          case 2:
            response = RESPONSES.ADD_COVER_PHOTO;
            db.setUserState(sender_psid, 3, 'A');
            break;
          case 3:
            menuUpload.handleMenuUpload(sender_psid, stateLevel1, stateLevel2, db);
            return;
          case 4:
            response = RESPONSES.SET_OPENING_HOURS;;
            db.setUserState(sender_psid, 5, 'A');
            break;
          case 5:
            if (stateLevel2 === 'A') {
              response = RESPONSES.SET_LOCATION;
              db.setUserState(sender_psid, 5, 'B');
            } else if (stateLevel2 === 'B') {
              if (received_message.text === "Add location") {
                response = RESPONSES.SET_LOCATION_B;
                db.setUserState(sender_psid, 5, 'C');
              } else {
                db.setUserState(sender_psid, 6);
              }
            } else {
              response = CONFIRM_LOCATION(received_message.text);
              db.setUserState(sender_psid, 6);
            }
            break;
          case 6:
            response = RESPONSES.SET_CONTACT_INFO;
            db.setUserState(sender_psid, 7);
            break;
          case 7:
            response = RESPONSES.FINISH_MODULE_1;
            db.setUserState(sender_psid, 8, 'A');
            break;
          case 8:
            if (stateLevel2 === 'A') {
              response = RESPONSES.START_MODULE_2_A;
              db.setUserState(sender_psid, 8, 'B');
            } else {
              response = RESPONSES.START_MODULE_2_B;
              db.setUserState(sender_psid, 9);
            }
            break;
          case 9:
            response = RESPONSES.SET_PAGE_BUTTON;
            db.setUserState(sender_psid, 10, 'A');
            break;
          case 10:
            if (stateLevel2 === 'A') {
              response = RESPONSES.SET_AUTO_REPLAY_A;
              db.setUserState(sender_psid, 10, 'B');
            } else {
              response = RESPONSES.SET_AUTO_REPLAY_B;
              db.setUserState(sender_psid, 11);
            }
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
  } catch (err) {
    response = { "text": err };
  }
  // Send the response message
  common.sendResponse(sender_psid, response);
}

function handlePostback(sender_psid, received_postback) {
  console.log('ok')
  let response;
  // Get the payload for the postback
  let payload = received_postback.payload;

  if (payload && payload.toLowerCase().includes('get started')) {
    response = RESPONSES.ADD_PROFILE_PHOTO;
    db.setUserState(sender_psid, 1, 'B');
  }

  // Set the response based on the postback payload
  if (payload === 'Add Photo') {
    response = { "text": "Please send me a profile photo." }
  }
  // Send the message to acknowledge the postback
  common.sendResponse(sender_psid, response);
}
