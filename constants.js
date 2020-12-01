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

module.exports.RESPONSES = {
  GET_STARTED: {
    "text": "Welcome! Should we get started?",
    "quick_replies": YES_NO_QUICK_REPLIES,
  },
  ADD_PROFILE_PHOTO: {
    "text": "Great!\n\nLet's start by adding a profile photo that represents your business well.\n\nMany people use their business logo as their profile photo.",
  },
  PREVIEW_PROFILE_PHOTO_FAIL:{
    "text": "Your profile photo is not clear. For best quality, it should be at least 320 pixels wide and 320 pixels tall.\n\nWould you like to send another photo?",
  },
  ADD_COVER_PHOTO: {
    "text": "Great!\n\nNow, add a cover photo for your Page.\n\nThis photo is public. You can use it to promote your business.",
  },
  SET_LOCATION: {
    "text": "Great. Your business is always open.\nDo you want to add location information?",
    "quick_replies": [
      {
        "content_type": "text",
        "title": "Add location",
        "payload": "location",
      }, {
        "content_type": "text",
        "title": "Skip for now",
        "payload": "skip",
      }
    ]
  },
  SET_LOCATION_B: {
    "text": "OK. Simply enter your business address here.",
  },
  ADD_MENU: {
    "text": "We noticed you have a food business.\n\n Add a photo of your menu to let people know what [Page Name] offers.",
    "quick_replies": [{
      "content_type": "text",
        "title": "Add Menu",
        "payload": "Add Menu",
      }, {
        "content_type": "text",
        "title": "Skip",
        "payload": "Skip",
    }]
  },
  ADD_MENU_DESCRIPTION: {
    "text": "You can give your menu a name.\n\n Here are some suggestions.",
    "quick_replies": [{
        "content_type": "text",
        "title": "Fried Chicken",
        "payload": "Fried Chicken",
    }, {
        "content_type": "text",
        "title": "Nasi Lemak",
        "payload": "Nasi Lemak",
    }]
  },
  SET_OPENING_HOURS: {
    "text": "Got it! Add more Page details so potential customers can learn about yout business. \n Select your business hours",
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
  },
  SET_CONTACT_INFO: {
    "text": "Great. Your business is always open.\nDo you want to add location information?",
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
        "title": "Skip for now",
        "payload": "skip",
      }
    ]
  },
  FINISH_MODULE_1: {
    "text": "Great job! You have added some basic information to your Page. Do you want to see the changes you made?",
    "quick_replies": [
      {
        "content_type": "text",
        "title": "Go to Page",
        "payload": "Yes",
      }, {
        "content_type": "text",
        "title": "No thanks",
        "payload": "No",
      }
    ]
  },
  START_MODULE_2_A: {
    "text": "Hi, your page is looking great! \nHave you found our tips helpful so far?",
    "quick_replies": YES_NO_QUICK_REPLIES,
  },
  START_MODULE_2_B: {
    "text": "Great! Would you like to learn more about how customers can contact you?",
    "quick_replies": YES_NO_QUICK_REPLIES,
  },
  SET_PAGE_BUTTON: {
    "text": "Add a button to your Page to make it easy for customers to shop or contact you. \nThis button appears at the top of your Page",
    "quick_replies": [
      {
        "content_type": "text",
        "title": "Send Messenger",
        "payload": "wessenger",
      }, {
        "content_type": "text",
        "title": "Contact me WhatsApp Number",
        "payload": "whatsapp",
      }, {
        "content_type": "text",
        "title": "Show me other options",
        "payload": "others",
      }, {
        "content_type": "text",
        "title": "Skip",
        "payload": "skip",
      }
    ]
  },
  SET_AUTO_REPLAY_A: {
    "text": "You're ready to get messages for your business. \nWould you like to set up instant replies? \nThis is an automatic reply people will receive when they message you",
    "quick_replies": YES_NO_QUICK_REPLIES,
  },
  SET_AUTO_REPLAY_B: {
    "text": "Great! Here's a suggestion. \n\n'Hi, thanks for contacting us. We've received your message and will respond shortly.' \n\nDo you want to use this message?",
    "quick_replies": YES_NO_QUICK_REPLIES,
  },
  FINISH_MODULE_2: {
    "text": "Nice work! You've made it even easier for potential customers to contact you. Come back any time to keep improving your Page.",
  },
}

module.exports.PREVIEW_PROFILE_PHOTO_SUCCESS = (attachment_url) => {
  return {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [{
          "title": "Preview your photo above.",
          "subtitle": "Are you happy with how it looks?",
              "image_url": attachment_url,
              // "buttons": [
              //   {
              //     "type": "text",
              //     "title": "Yes",
              //     "payload": "yes",
              //   },
              //   {
              //     "type": "text",
              //     "title": "No",
              //     "payload": "no",
              //   }
              // ],
        }]
      }
    },
  };
};

module.exports.CONFIRM_LOCATION = (address) => {
  address_arr = address.split(", ");
  return {
    "text": `Your business address is
      Street Address: ${address_arr[0]}
      City: ${address_arr[1]}
      Zip code: ${address_arr[2]}\nIs this correct?`,
  }
}

module.exports.STATES = {
  /** Module 1 */
  0: "Module 1 Welcome Message",
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
  3: "Upload menu",
  /**
   * A: user upload menu
   * B: user type menu description
   */
  4: "Opening hours",
  5: "Page location",
  /**
   * Webview
   * A: 4 selections (No hours, Always open, Permanently closed, Selected hours)
   * B: specify Selected hours
   */
  6: "Contact info",
  7: "See changes from module 1",

  /** Module 2 */
  8: "Module 2 Welcome Message",
  9: "Add Page Button",
  // only show if user wants to set up Appointment booking
  10: "Add Auto Reply",
  /**
   * A: select days and times for appointment
   * B: appointment approval (bool)
   * C: double-booking (bool)
   * D: sync to google calendar (bool)
   */
  11: "Finish Message",
}
