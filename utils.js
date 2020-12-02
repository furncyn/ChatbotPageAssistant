const LOG_FILE = 'log';
const
  child_process = require('child_process'),
  fs = require('fs'),
  db = require('./db'),
  { RESPONSES} = require('./constants');

function getLog(n_lines = 10) {
  if (!Number.isInteger(n_lines)) {
    console.log('n_lines is not an integer. Ignore.');
    n_lines = 10;
  }
  const cmd = `tail -n ${n_lines} ${LOG_FILE}`;
  return child_process.execSync(cmd).toString();
}

function getGitVersion() {
  const rev = fs.readFileSync('.git/HEAD').toString();
  if (rev.indexOf(':') === -1) {
    return rev;
  } else {
    return fs.readFileSync('.git/' + rev.substring(5).trim()).toString().trim();
  }
}

function getGitLog() {
  const cmd = 'git log --pretty=oneline --abbrev-commit | head';
  return child_process.execSync(cmd).toString();
}

module.exports.getDebugReponse = (received_message) => {
  received_message_text = received_message.text;
  if (received_message_text) {
    if (received_message_text === "db.json") {
      return {
        "text": `Current DB: ${JSON.stringify(db.getDb())}`
      }
    } else if (received_message_text === "version") {
      // Get & return the version
      return {
        "text": `Current git revision: ${getGitVersion()}`
      }
    } else if (received_message_text === "git log") {
      return {
        "text": `Your git log:\n${getGitLog()}`
      }
    } else if (received_message_text.startsWith("log")) {
      // 2nd param should be n_lines. Ignore rest.
      const n_lines = received_message_text.trim().split(' ')[1];
      return {
        "text": `Here is your log:\n ${getLog(parseInt(n_lines))}`
      }
    } else if (received_message_text.startsWith("init")) {
      // 2nd param should be n_lines. Ignore rest.
      const psid = received_message_text.trim().split(' ')[1];
      db.setUserState(psid, 1, 'A');
      return RESPONSES.GET_STARTED;
    }
  }
}
