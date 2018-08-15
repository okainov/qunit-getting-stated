class Summator {
    static calculateSum(a, b) {
        return a + b;
    }
}

function calculateSum(a, b) {
    return a + b;
}

// Export only if run in command-line mode
if (typeof module !== 'undefined' && module.exports) {
    exports.calculateSum = calculateSum;
    exports.Summator = Summator;
}