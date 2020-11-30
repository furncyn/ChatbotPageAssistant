module.exports.RESPONSES = {
  GET_STARTED: {
    "text": `Welcome! Should we get started?`,
    "quick_replies": [
      {
        "content_type": "text",
        "title": "YeS",
        "payload": "YeS",
      }, {
        "content_type": "text",
        "title": "No",
        "payload": "No",
      }
    ]
  },
  ADD_PROFILE_PHOTO: {
    "text": "Great, let's get started. \n Add a profile photo that represents your business well. \n Many people choose to use their business logo as their profile photo.",
  },
  PREVIEW_PROFILE_PHOTO: {
    "text": "Looks good! Remember, your profile photo will be cropped to a circular shape in ads and posts.\n Are you happy with how it works?",
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
  },
  SET_OPENING_HOURS: {
  },
  SET_CONTACT_INFO: {
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
  3: "Page category",
  4: "Page location",
  5: "Opening hours",
  /**
   * Webview
   * A: 4 selections (No hours, Always open, Permanently closed, Selected hours)
   * B: specify Selected hours
   */
  6: "Contact info", // to be finalized

  /** Module 2 */
  7: "Module 2 Welcome Message",
  8: "Add Page Button",
  // only show if user wants to set up Appointment booking
  9: "Add Auto Reply",
  /**
   * A: select days and times for appointment
   * B: appointment approval (bool)
   * C: double-booking (bool)
   * D: sync to google calendar (bool)
   */
  10: "Service flow",
  /**
   * A: service name
   * B: price
   * C: description (optional)
   * D: duration
   * E: include an image
  */
}
