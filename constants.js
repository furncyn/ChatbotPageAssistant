const STATES = {
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

module.exports.states = STATES;
