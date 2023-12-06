const dbConnection = require('./db-connection');
const { DB_NAME, DB_COLLECTION_SITE_CONFIGURATIONS } = require('../utils/constants');

async function getSiteConfiguration() {
  console.log('Getting site configuration...');

  var client;
  try {
    console.log(`connecting to DB`);
    client = await dbConnection.connect();
    console.log('connection stablished');

    const database = client.db(DB_NAME);
    const siteConfigurations = database.collection(DB_COLLECTION_SITE_CONFIGURATIONS);

    // get site title and description from siteConfigurations collection in database.
    const cursor = siteConfigurations.find({ $or: [{ title: { $exists: true } }, { description: { $exists: true } }, { footer: { $exists: true} }] });
    const data = await cursor.toArray();

    // add each config to the result array
    const result = {};
    data.forEach(config => {
      if (config.title) {
        result.title = config.title;
      }
      if (config.description) {
        result.description = config.description;
      }
      if (config.footer) {
        result.footer = config.footer;
      }
    });
    return result;
  } catch (error) {
    console.error('ERROR obtaining data from database:', error);
    throw error;
  } finally {
    console.log('closing connection');
    client.close();
  }
}

module.exports = { getSiteConfiguration };
