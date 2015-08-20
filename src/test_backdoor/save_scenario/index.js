'use strict';

const saveScenario = require('./save_scenario.js');

module.exports = server => {
    server.post('/backdoor/save-scenario', saveScenario)
};
