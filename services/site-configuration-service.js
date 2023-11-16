const SiteConfiguration = require('./model/SiteConfiguration');

async function getSiteConfiguration() {
  try {
    // get title and description configuration from database
    const data = await SiteConfiguration.find({ name: {$in: ['title', 'description']} });

    // add each config to the result array
    const result = {};
    data.forEach(config => {
      result[config.name] = config.value;
    });

    return result;
  } catch (error) {
    console.error('Error obtaining data from database:', error);
    throw error;
  }
}

module.exports = { getSiteConfiguration };
