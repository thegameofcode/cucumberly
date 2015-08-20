const should = require('chai').should();
const $ = require(process.cwd()+'/features/subjects.json');


module.exports = () => {
    this.Given(/^\$CUKE_GENERATOR already has a concrete scenario defined$/, callback => {
        should.exist($.CUKE_GENERATOR.scenario_default);
        callback();
    });
};
