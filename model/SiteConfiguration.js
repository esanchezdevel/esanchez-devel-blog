const mongoose = require('mongoose');

const siteConfigurationSchema = new mongoose.Schema({
    name: String,
    value: String,
});

const collectionName = 'siteConfigurations';
const SiteConfiguration = mongoose.model('SiteConfiguration', siteConfigurationSchema, collectionName);

module.exports = SiteConfiguration;
