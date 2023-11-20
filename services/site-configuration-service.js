const mongoose = require('mongoose');
const dbConnection = require('./db-connection');
const SiteConfiguration = require('../model/SiteConfiguration');
const config = require('../config');

async function getSiteConfiguration() {
  console.log('Getting site configuration...');
  try {
    dbConnection.connect();

    // get title and description configuration from database
    
    
    mongoose.connection.on('connected', async () => {
      console.log('connection stablished');

      const data = await SiteConfiguration.find({ $or: [{ title: { $exists: true } }, { description: { $exists: true } }] });

      // add each config to the result array
      const result = {};
      data.forEach(config => {
        if (config.toObject().title) {
          result.title = config.toObject().title;
        }
        if (config.toObject().description) {
          result.description = config.toObject().description;
        }
      });

      dbConnection.close();
      console.log('TEST--title: ' + result.title);
      return result;
    });
    console.log('TEST--title2: ' + result.title);
    return result;
  } catch (error) {
    console.error('Error obtaining data from database:', error);
    throw error;
  }
}

module.exports = { getSiteConfiguration };
