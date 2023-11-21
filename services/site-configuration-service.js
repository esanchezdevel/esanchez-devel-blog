const dbConnection = require('./db-connection');

async function getSiteConfiguration() {
  console.log('Getting site configuration...');

  var client;
  try {
    console.log(`connecting to DB`);
    client = await dbConnection.connect();
    console.log('connection stablished');

    const database = client.db('test');
    const siteConfigurations = database.collection('siteConfigurations');

    // get site title and description from siteConfigurations collection in database.
    const cursor = siteConfigurations.find({ $or: [{ title: { $exists: true } }, { description: { $exists: true } }] });
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
