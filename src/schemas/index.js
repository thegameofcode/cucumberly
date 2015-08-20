'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScenarioSchema = new Schema({
    episode: String,
    subject: String,
    description: String,
    title: String,
    given: [String],
    when: [String],
    then: [String]
});

const Scenario = mongoose.model('scenarios', ScenarioSchema);
module.exports = {
    Scenario: Scenario
};
