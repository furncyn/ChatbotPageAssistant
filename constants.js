const YES_NO_QUICK_REPLIES = [
  {
    "content_type": "text",
    "title": "No",
    "payload": "No",
  }, {
    "content_type": "text",
    "title": "Yes",
    "payload": "Yes",
  }
]

const user_name = "Nguyen Hoang Yen";
const biz_name = "Authentic Phoever";
const PROFILE_PREVIEW_IMAGE_URL = "https://www.linkpicture.com/q/Profile-Photo-Cropped.jpg";
const PREVIEW_PROFILE_PHOTO_ATTACHMENT_ID = "3265801710196360";
const COVER_PHOTO_CUE_ATTACHMENT_ID = "296509938360959";
const PAGE_BUTTON_CUE_ATTACHMENT_ID = "201521731558049";
const START_MODULE_1_IMAGE_ATTACHMENT_ID = "437893500560161";
const FINISH_MODULE_1_IMAGE_ATTACHMENT_ID = "3529675837108345";
const FINISH_MODULE_2_IMAGE_ATTACHMENT_ID = "1287712881602047";

const get_image_response = (attachment_id) => {
  return {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "media",
        "elements": [{
        "media_type": "image",
        "attachment_id": attachment_id,
        }]
      }
    },
  }
}

module.exports.RESPONSES = {
  GET_STARTED: [
    get_image_response(START_MODULE_1_IMAGE_ATTACHMENT_ID),
    { "text":  `Hi, ${user_name}!` },
    { "text": `I'm here to help you complete your Page ${biz_name} and find potential customers.` },
    {
      "text": "Would you like to get started?",
      "quick_replies": YES_NO_QUICK_REPLIES
    }
  ],
  ADD_PROFILE_PHOTO: [
    { "text": "Great!" },
    { "text": "Let's start by adding a profile photo that represents your business." },
    {
      "text": "Many people use their business logo as their profile photo.",
      "quick_replies": [
        {
          "content_type": "text",
          "title": "Add Photo",
          "payload": "yes",
        }, {
          "content_type": "text",
          "title": "Tell Me More",
          "payload": "more",
        }, {
          "content_type": "text",
          "title": "Not Now",
          "payload": "no",
        }
      ],
    }
  ],
  SEND_PROFILE_PHOTO: [
    { "text": "Send a photo and we'll use it for your profile picture." },
  ],
  PREVIEW_PROFILE_PHOTO_FAIL: [
    { "text": "Your photo is not clear." },
    { "text": "For best quality, it should be at least 320 pixels wide and 320 pixels tall." },
    {
      "text": "Would you like to change your photo?",
      "quick_replies": YES_NO_QUICK_REPLIES,
    }
  ],
  PREVIEW_PROFILE_PHOTO_SUCCESS: [
    get_image_response(PREVIEW_PROFILE_PHOTO_ATTACHMENT_ID),
    {
      "text": "Are you happy with how it looks?",
      "quick_replies": YES_NO_QUICK_REPLIES,
    },
  ],
  ADD_COVER_PHOTO_A: [
    { "text": "Great!" },
    { "text": "Now, add a cover photo for your Page." },
    { "text": "This photo appears at the top of your page." },
    get_image_response(COVER_PHOTO_CUE_ATTACHMENT_ID),
    {
      "text": "You might like to choose a photo of your shop or products.",
      "quick_replies": [
        {
          "content_type": "text",
          "title": "Add Photo",
          "payload": "yes",
        }, {
          "content_type": "text",
          "title": "Skip",
          "payload": "skip",
        }
      ],
    }
  ],
  ADD_COVER_PHOTO_B: [
    { "text": "Send your photo." },
  ],
  ADD_MENU: [
    // { "text": "Your cover photo has been added." },
    { "text": "We noticed you have a food business 🍜" },
    {
      "text": `Add a photo of your menu to let people know what ${biz_name} offers.`,
      // "quick_replies": [
      //   {
      //     "content_type": "text",
      //     "title": "Add Photo",
      //     "payload": "yes",
      //   }, {
      //     "content_type": "text",
      //     "title": "Skip",
      //     "payload": "skip",
      //   }
      // ],
    }
  ],
  SEND_MENU_PHOTO: [
    { "text": "Send your photo." },
  ],
  ADD_MENU_DESCRIPTION: [
    { "text": "Give your menu a name." },
    {
      "text": "Here are some suggestions.",
      "quick_replies": [{
        "content_type": "text",
        "title": "Soup",
        "payload": "soup",
      }, {
        "content_type": "text",
        "title": "Beef Pho",
        "payload": "beef pho",
      }, {
        "content_type": "text",
        "title": "Enter Menu Name",
        "payload": "enter",
      }]
     }
  ],
  ADD_MORE_MENU: [
    {
      "text": "Do you want to add another photo for your menu?",
      "quick_replies": YES_NO_QUICK_REPLIES,
    }
  ],
  SET_OPENING_HOURS: [
    { "text": "Got it!" },
    { "text": "Now, add more details so potential customers can learn about your business." },
    {
      "text": "Select your business hours 🕒",
      "quick_replies": [
        {
          "content_type": "text",
          "title": "Standard Hours",
          "payload": "standard",
        }, {
          "content_type": "text",
          "title": "Always Open",
          "payload": "open",
        }, {
          "content_type": "text",
          "title": "Skip",
          "payload": "skip",
        }
      ]
    }
  ],
  SET_LOCATION: [
    // { "text": "Great. Your business is always open." },
    { "text": "Got it!" },
    { "text": "Do you also want to add location information?",
      // "quick_replies": [
      //   {
      //     "content_type": "text",
      //     "title": "Add location",
      //     "payload": "location",
      //   }, {
      //     "content_type": "text",
      //     "title": "Skip",
      //     "payload": "skip",
      //   }
      // ]
    },
    { "text": "Simply send me your business address." },
  ],
  SET_LOCATION_B: [
    { "text": "OK." },
    { "text": "Simply send me your business address." },
  ],
  SET_CONTACT_INFO: [
    { "text": "Your location has been added." },
    {
      "text": "Now, add contact information to your Page.",
      "quick_replies": [
        {
          "content_type": "text",
          "title": "Website",
          "payload": "Website",
        }, {
          "content_type": "text",
          "title": "Phone number",
          "payload": "Phone",
        }, {
          "content_type": "text",
          "title": "Email",
          "payload": "Email",
        }, {
          "content_type": "text",
          "title": "Skip",
          "payload": "skip",
        }
      ]
    }
  ],
  FINISH_MODULE_1: [
    get_image_response(FINISH_MODULE_1_IMAGE_ATTACHMENT_ID),
    { "text": "Great job! 🥳 You have added some basic information to your Page." },
    {
      "attachment":
      {
        "type":"template",
        "payload":{
          "template_type":"button",
          "text": "Go to your page to see the changes you have made.",
          "buttons":[
            {
              "type":"web_url",
              "url":"https://www.facebook.com/Authentic-Phoever-104912418137048/",
              "title":"Go to Page",
              "webview_height_ratio": "full"
            }
          ]
        }
      }
    }
  ],
  START_MODULE_2: [
    get_image_response(START_MODULE_1_IMAGE_ATTACHMENT_ID),
    { "text": "Hi, your page is looking great! 👍" },
    {
      "text": "Want to learn more about connecting with customers?",
      "quick_replies": YES_NO_QUICK_REPLIES,
    }
  ],
  SET_PAGE_BUTTON: [
    { "text": "Let's get started" },
    { "text": "Choose the action you want people to take when they visit your Page." },
    get_image_response(PAGE_BUTTON_CUE_ATTACHMENT_ID),
    {
      "text": "This button will be shown at the top of your Page.",
      "quick_replies": [
        {
          "content_type": "text",
          "title": "Order Food",
          "payload": "order_food",
        },
        {
          "content_type": "text",
          "title": "Send Message",
          "payload": "messenger",
        }, {
          "content_type": "text",
          "title": "WhatsApp",
          "payload": "whatsapp",
        }, {
          "content_type": "text",
          "title": "More Options",
          "payload": "others",
        }
      ]
    }
  ],
  SET_AUTO_REPLAY_A: [
    { "text": "OK, we've added a button so people can message your business." },
    { "text": "Would you like to set up instant replies?" },
    { "text": "This is an automatic reply people receive when they send a message." },
    {
      "text": "💡You can thank people for their message and tell them when they can expect a response",
      "quick_replies": YES_NO_QUICK_REPLIES,
    }
  ],
  SET_AUTO_REPLAY_B: [
    { "text": "Great!" },
    { "text": "Here's a suggestion." },
    { "text": `"Hi, thanks for contacting ${biz_name}. We've received your message and will respond shortly."` },
    {
      "text": "Do you want to use this message?",
      "quick_replies": YES_NO_QUICK_REPLIES,
    },
  ],
  FINISH_MODULE_2: [
    get_image_response(FINISH_MODULE_2_IMAGE_ATTACHMENT_ID),
    { "text": "Nice work! 🥳" },
    { "text": "You've made it easier for potential customers to connect and communicate with you." },
    {
      "attachment":
      {
        "type":"template",
        "payload":{
          "template_type":"button",
          "text": "Learn how to add even more value to your Page with our free online courses.",
          "buttons":[
            {
              "type":"web_url",
              "url":"https://www.facebook.com/help/282489752085908/?helpref=hc_fnav",
              "title":"Learn More",
              "webview_height_ratio": "full"
            }
          ]
        }
      }
    }
  ]
}

module.exports.CONFIRM_LOCATION = (address) => {
  address_arr = address.split(", ");
  return [{
    "text": `Your business address is
      Street Address: ${address_arr[0]}
      City: ${address_arr[1]}
      Zip code: ${address_arr[2]}\nIs this correct?`,
    "quick_replies": YES_NO_QUICK_REPLIES,
  }];
}

module.exports.STATES = {
  /** Module 1 */
  0: "Module 1 Welcome Message",
  1: "Profile photo",
  2: "Cover photo",
  3: "Upload menu",
  4: "Opening hours",
  5: "Page location",
  6: "Contact info",
  7: "See changes from module 1",

  /** Module 2 */
  8: "Module 2 Welcome Message",
  9: "Add Page Button",
  // only show if user wants to set up Appointment booking
  10: "Add Auto Reply",
  11: "Finish Message",
}
