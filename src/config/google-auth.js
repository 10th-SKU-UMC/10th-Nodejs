const fs = require('fs');
const path = require('path');

const AUTH_FILE_PATH = path.resolve(__dirname, '../../authentication.json');
const DEFAULT_CALLBACK_URL = 'http://localhost:3000/api/v1/auth/google/callback';

function readGoogleAuthFile() {
  if (!fs.existsSync(AUTH_FILE_PATH)) {
    return null;
  }

  const authFile = JSON.parse(fs.readFileSync(AUTH_FILE_PATH, 'utf8'));
  return authFile.web || authFile.installed || null;
}

function getGoogleAuthConfig() {
  const fileConfig = readGoogleAuthFile();

  return {
    clientID: process.env.GOOGLE_CLIENT_ID || fileConfig?.client_id,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || fileConfig?.client_secret,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || DEFAULT_CALLBACK_URL,
  };
}

module.exports = {
  getGoogleAuthConfig,
};
