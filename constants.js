module.exports.RESPONSES = {
  GET_STARTED: {
    "text": `Welcome! Should we get started?`,
    "quick_replies": [
      {
        "content_type": "text",
        "title": "Yes",
        "payload": "Yes",
      }, {
        "content_type": "text",
        "title": "No",
        "payload": "No",
      }
    ]
  },
  ADD_PROFILE_PHOTO: {
    "text": "Great, let's get started. \nAdd a profile photo that represents your business well. \nMany people choose to use their business logo as their profile photo.",
  },
  ADD_COVER_PHOTO: {
    "text": "Great! Now, add a cover photo for your Page. This photo is public. You can use it to promote your business.",
  },
  CHOOSE_BUSINESS_CATEGORY: {
    "text": "Your cover photo has been added! Now, choose your business category.",
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
  },
  SET_LOCATION: {
    "text": "Great. You've chosen your business category. Now tell us your business location.",
  },
  SET_OPENING_HOURS: {
  },
  SET_CONTACT_INFO: {
    "text": "Add more information to your Page so people can contact you.",
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
  START_MODULE_2: {
    "text": `Do you want to connect to more people?`,
    "quick_replies": [
      {
        "content_type": "text",
        "title": "Yes",
        "payload": "Yes",
      }, {
        "content_type": "text",
        "title": "No",
        "payload": "No",
      }
    ]
  },
  SET_PAGE_BUTTON: {
  },
  SET_AUTO_REPLAY: {
    "text": "Please input the auto reply!",
  },
  SET_SERVICE_FLOW: {
  },
  FINISH_MODULE_2: {
    "text": "Congrats!",
  },
}

module.exports.PREVIEW_PROFILE_PHOTO = (attachment_url) => {
  return {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [{
          "title": "Your profile photo is not clear. For best quality, it should be at least 320 pixels wide and 320 pixels tall.",
          "subtitle": "Would you like to resend another photo?",
          "image_url": attachment_url,
        }]
      }
    }
  };
};

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
  11: "Service flow",
  /**
   * A: service name
   * B: price
   * C: description (optional)
   * D: duration
   * E: include an image
  */
  12: "Finish Message",
}
