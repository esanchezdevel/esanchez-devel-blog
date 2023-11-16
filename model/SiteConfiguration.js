const mongoose = require('mongoose');

const siteConfigurationSchema = new mongoose.Schema({
    name: String,
    value: String,
});

const SiteConfiguration = mongoose.model('SiteConfiguration', siteConfigurationSchema);

module.exports = SiteConfiguration;
