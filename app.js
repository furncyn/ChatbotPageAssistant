/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Messenger Platform Quick Start Tutorial
 *
 * This is the completed code for the Messenger Platform quick start tutorial
 *
 * https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start/
 *
 * To run this code, you must do the following:
 *
 * 1. Deploy this code to a server running Node.js
 * 2. Run `npm install`
 * 3. Update the VERIFY_TOKEN
 * 4. Add your PAGE_ACCESS_TOKEN to your environment vars
 *
 */

'use strict';
const PAGE_ACCESS_TOKEN = process.env.PAGE_TOKEN;
const PREFIX = 'fb_hackathon';

// Imports dependencies and set up http server
const
  child_process = require('child_process'),
  fs = require('fs'),
  request = require('request'),
  express = require('express'),
  body_parser = require('body-parser'),
  app = express().use(body_parser.json()); // creates express http server

const STATE = {
  /** Module 1 */
  1: "Profile photo",
  /**
   * A: user uploads profile photo
   * B: suggestion about profile photo
   */
  2: "Cover photo",
  /**
   * A: user uploads cover photo
   * B: suggestion about cover photo
   */
  3: "Page category",
  4: "Page location",

  5: "Opening hours",
  /**
   * A: 4 selections (No hours, Always open, Permanently closed, Selected hours)
   * B: specify Selected hours
   */
  6: "Contact info", // to be finalized

  /** Module 2 */
  7: "Appointment booking",
  // only show if user wants to set up Appointment booking
  8: "Appointment flow",
  /**
   * A: select days and times for appointment
   * B: appointment approval (bool)
   * C: double-booking (bool)
   * D: sync to google calendar (bool)
   */
  9: "Service flow",
  /**
   * A: service name
   * B: price
   * C: description (optional)
   * D: duration
   * E: include an image
  */
  10: "Link WA",
  /**
   * A: ask for phone number
   * B: ask for verification code
   * C: add contact button on page
   */
  11: "Automated reply",
}

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

  // Checks if the message contains text
  if (received_message.text) {
    let received_message_text = received_message.text
    if (received_message_text === "version") {
      // Get & return the version
      response = {
        "text": `Current git revision: ${getGitVersion()}`
      }
    } else if (received_message_text.startsWith("log")) {
      // 2nd param should be n_lines. Ignore rest.
      const n_lines = received_message_text.split(' ')[1];
      response = {
        "text": `Here is your log:\n ${getLog(n_lines)}`
      }
    } else if (received_message_text === "page category") {
      response = {
        "text": "How would you describe the category of your page?",
        "quick_replies": [
          {
            "content_type": "text",
            "title": "Beauty service",
            "payload": "beauty",
          }, {
            "content_type": "text",
            "title": "Dining",
            "payload": "dining",
          }, {
            "content_type": "text",
            "title": "E-commerce",
            "payload": "ecommerce",
          }, {
            "content_type": "text",
            "title": "Financial service",
            "payload": "finance",
          }
        ]
      }
    } else {
      // Create the payload for a basic text message, which
      // will be added to the body of our request to the Send API
      response = {
        "text": `You sent the message: "${received_message_text}". Now send me an attachment!`
      }
    }
  } else if (received_message.attachments) {
    // Get the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
    response = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "It would be better to upload a profile photo with less text",
            "subtitle": "Would you like to resend another photo?",
            "image_url": attachment_url,
            "buttons": [
              {
                "type": "postback",
                "title": "Yes",
                "payload": "yes",
              },
              {
                "type": "postback",
                "title": "Skip",
                "payload": "no",
              }
            ],
          }]
        }
      }
    }
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

  // Send the response message
  callSendAPI(sender_psid, response);
}

function getGitVersion() {
  const rev = fs.readFileSync('.git/HEAD').toString();
  if (rev.indexOf(':') === -1) {
    return rev;
  } else {
    return fs.readFileSync('.git/' + rev.substring(5).trim()).toString().trim();
  }
}

const LOG_FILE = 'log';
function getLog(n_lines = 10) {
  if (!Number.isInteger(n_lines)) {
    console.log('n_lines is not an integer. Ignore.');
    n_lines = 10;
  }
  const cmd = `tail -n ${n_lines} ${LOG_FILE}`;
  return child_process.execSync(cmd).toString();
}

function handlePostback(sender_psid, received_postback) {
  console.log('ok')
  let response;
  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === 'yes') {
    response = { "text": "Thanks!" }
  } else if (payload === 'no') {
    response = { "text": "Looking forward to continue next time." }
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
