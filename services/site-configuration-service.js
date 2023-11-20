const mongoose = require('mongoose');
const dbConnection = require('./dbConnection');
const SiteConfiguration = require('../model/SiteConfiguration');
const config = require('../config');

async function getSiteConfiguration() {
  try {

    dbConnection.connect();

    // Evento emitido cuando la conexión se cierra
    mongoose.connection.on('disconnected', () => {
      console.log('Conexión a MongoDB cerrada');
    });

    // get title and description configuration from database
    
    const data = await SiteConfiguration.find({ $or: [{ title: { $exists: true } }, { description: { $exists: true } }] });

    // add each config to the result array
    const result = {};
    data.forEach(config => {
      console.log(`reading config: ${JSON.stringify(config)}`);
      if (config.toObject().title) {
        result.title = config.toObject().title;
      }
      if (config.toObject().description) {
        result.description = config.toObject().description;
      }
    });

    console.log(`result title: ${result.title}`);
    console.log(`result description: ${result.description}`);
    //await mongoose.connection.close();
    
    return result;
  } catch (error) {
    console.error('Error obtaining data from database:', error);
    throw error;
  }
}

module.exports = { getSiteConfiguration };
