const fs = require('fs')
const { defineConfig } = require('cypress')
module.exports = defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://qa.postclickmarketing.com/',
    env: JSON.parse(fs.readFileSync('./cypress.qa.env.json')),
    chromeWebSecurity: false,
    numTestsKeptInMemory: 50,
    defaultCommandTimeout: 50000
  },
})
