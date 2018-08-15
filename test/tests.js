// Use "require" only if run from command line
if (typeof(require) !== 'undefined') {
    calculateSum = require('../index.js').calculateSum;
}

QUnit.module("QUnit is working");

QUnit.test("true is true", function (assert) {
    assert.ok(true === true, "Passed!");
});

QUnit.module("calculateSum function");
QUnit.test("0 + 0 = 0", function (assert) {
    assert.equal(calculateSum(0, 0), 0, "Passed!");
});

QUnit.test("1 + 0 = 1", function (assert) {
    assert.equal(calculateSum(1, 0), 1, "Passed!");
});