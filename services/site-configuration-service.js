const mongoose = require('mongoose');
const SiteConfiguration = require('../model/SiteConfiguration');
const config = require('../config');

async function getSiteConfiguration() {
  try {
    // configure mongodb connections
    await mongoose.connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });


    // get title and description configuration from database
    const data = await SiteConfiguration.find({ name: {$in: ['title', 'description']} });

    // add each config to the result array
    const result = {};
    data.forEach(config => {
      result[config.name] = config.value;
    });

    mongoose.connection.close();

    return result;
  } catch (error) {
    console.error('Error obtaining data from database:', error);
    throw error;
  }
}

module.exports = { getSiteConfiguration };
