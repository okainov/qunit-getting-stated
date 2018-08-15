// Use "require" only if run from command line
if (typeof(require) !== 'undefined') {
    Summator = require('../index.js').Summator;
}

QUnit.module("Summator class");
QUnit.test("0 + 0 = 0", function (assert) {
    assert.equal(Summator.calculateSum(0, 0), 0, "Passed!");
});

QUnit.test("1 + 0 = 1", function (assert) {
    assert.equal(Summator.calculateSum(1, 0), 1, "Passed!");
});