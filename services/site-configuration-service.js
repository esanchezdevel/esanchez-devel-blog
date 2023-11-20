const mongoose = require('mongoose');
const SiteConfiguration = require('../model/SiteConfiguration');
const config = require('../config');

async function getSiteConfiguration() {
  try {
    // configure mongodb connections
    const connection = await mongoose.connect(config.mongoURI, {
        useNewUrlParser: true
    });
    console.log(`MongoDB connected: {connection.connection.host}`);

    // Evento emitido cuando la conexión es exitosa
    mongoose.connection.on('connected', () => {
      console.log('Conexión a MongoDB establecida correctamente');
    });

    // Evento emitido cuando hay un error en la conexión
    mongoose.connection.on('error', (err) => {
      console.error('Error en la conexión a MongoDB:', err);
    });

    // Evento emitido cuando la conexión se cierra
    mongoose.connection.on('disconnected', () => {
      console.log('Conexión a MongoDB cerrada');
    });

    // get title and description configuration from database
    const data = await SiteConfiguration.find({ name: {$in: ['title', 'description']} });

    // add each config to the result array
    const result = {};
    data.forEach(config => {
      result[config.name] = config.value;
    });

    //await mongoose.connection.close();

    return result;
  } catch (error) {
    console.error('Error obtaining data from database:', error);
    throw error;
  }
}

module.exports = { getSiteConfiguration };
