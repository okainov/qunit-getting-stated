# Unofficial QUnit Getting Started [![Build Status](https://travis-ci.org/okainov/qunit-getting-stated.svg?branch=master)](https://travis-ci.org/okainov/qunit-getting-stated)

[QUnit](https://qunitjs.com/) is a powerful, easy-to-use JavaScript unit testing framework.

The purpose of this repo is to provide some set of useful examples working with QUnit. 

**What is covered in this tutorial**:
- Writing first test in QUnit, test results in HTML;
- Configuring QUnit command-line runner, "exporting" functions from your file;
- Having several test files;
- Setting up Travis CI for simple JS project.

**What is _not_ covered**
- Any other JS unit-testing libraries and comparison, "why QUnit?";
- Why should you use unit testing at all?

If you are not interested in the very basics, feel free to skip first sections and proceed directly to [Command-line runner](#command-line-runner)  section

## Hello, QUnit!

How to start from scratch?

Simple file tree structure may look like:

```sh
    project
    │   index.js <--- Your script with logic
    │   package.json <--- most probably you'll have npm file since qunit executable is installed via npm
    └───test
            tests.html <--- QUnit tests included in standard HTML page for "running" locally
            tests.js <--- QUnit test code
```

Let's start from your main functional script `index.js`. For now just create it empty. All your functional code will go there.
Then create tests files. The simplest `tests.js` may look like:
```js
QUnit.test("true is true", function (assert) {
    assert.ok(true === true, "Passed!");
});
```

Following the quickstart from the official page, create HTML file `tests.html` where QUnit will put test report

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <!-- Uncomment next line if you want automatic page reload -->
  <!-- <meta http-equiv="refresh" content="7"> -->
  <title>Hi command-line testing in QUnit!</title>
  <link rel="stylesheet" href="https://code.jquery.com/qunit/qunit-2.6.1.css">
</head>
<body>
  <div id="qunit"></div>
  <div id="qunit-fixture"></div>
  <!-- Don't forget to include both your script and test scripts here -->
  <script type="text/javascript" src="../index.js"></script>
  <script src="https://code.jquery.com/qunit/qunit-2.6.1.js"></script>
  <script src="tests.js"></script>
</body>
</html>
```

That's it. Now you can open `tests.html` in your favorite browser and see the magic happening.

![Tests are green!](https://i.imgur.com/WBzRQAB.png)


## First function
But that's not very interesting, huh? Let's write something more functional. I recommend you to try TDD approach 
(for further reading see [DWYL](https://github.com/dwyl/learn-tdd) TDD tutorial), so  let's try to write red test first.
We may want to write something like `calculateSum` function which wil basically  add two numbers and return the result. 
But we don't need to function itself to start working with it - so we start with test. Probably, sum of 0 and 0 should be 0,
here is the corresponding test, just add it to `tests.js` in addition to existing test checking true :)

```js
QUnit.test("0 + 0 = 0", function (assert) {
    assert.equal(calculateSum(0,0), 0, "Passed!");
});
```

If you check the test result page now you'll obviously see a red test. 

>  Died on test #1 calculateSum is not defined
> Source:	ReferenceError: calculateSum is not defined

But this is not the red test you need according to TDD, because it's an *error*, but not a *failure*. To make it proper red, 
we need to add calculateSum function to our `index.js`.
```js
function calculateSum() {
}
```

This makes the error disappear and now we have a proper red test

> Expected: 0
 > Result: undefined

![Red tests are normal](https://i.imgur.com/tgmp1h8.png)

And now we're ready to make it green again by adding `return 0;` statement. There is nothing to refactor, so we can continue further.

At this point we already covered main functionality and it's possible to develop and test some JS functions you need. 
But of course for more complicated projects you may need something else...

## Command-line runner

It's nice to have pretty HTML page which can display test results, but what if you prefer "hardcore" shell way or you want to run it on remote machine?
Luckily for us, QUnit has its own command-line runner. Probably the simplest option will be to install it using node: `npm install -g qunit`. 
After that you can type `qunit` and hope that it will work... but in reality it's a bit more difficult. 
The error you'll see in the terminal is again about undefined function:

>  Died on test #1 calculateSum is not defined
> Source:	ReferenceError: calculateSum is not defined

 But this time we know that it's now due to our code, but we need to tweak the system a bit. The issue here is that test 
 code doesn't know about functional code (`index.js`). In case of HTML page we included both scripts and they magically matched each other. 
 However now there is not HTML page combining scripts together and, more unfortunate, there is no build-in Javascript functionality to "import" scripts. 
 Luckily, there is some in node.js already and since QUnit runner was installed from node, it already has all the dependencies. 
 
 We will import our script into test code using `require` function which comes from node. Add following on top of `tests.js`
 
 ```js
// Use "require" only if run from command line
if (typeof(require) !== 'undefined') {
    calculateSum = require('../index.js').calculateSum;
}
```

If you wonder about condition, it's required to keep HTML page working, because browser doesn't know anything about `require`.
In addition to importing file, it's necessary to export desired functions *from* `index.js`. This can be easily done by adding
following lines to the very bottom of the file:

```js
// Export only if run in command-line mode
if (typeof module !== 'undefined' && module.exports) {
    exports.calculateSum = calculateSum;
}
```

If everything is set up correctly, now you should be able to see green tests both in browser AND in terminal using `qunit` command.

![CLI runner](https://i.imgur.com/aBst7EV.png)

## CI

It's always nice to have machine checking your code, because it will not forget and you won't be able to say "it's working on my machine" any more. 
One of the most popular and simpe option is [Travis CI](https://travis-ci.org/). To enable our project we will need to add two additional files to the repository

First is `package.json` file to tell Travis (and other people visiting your repo!) about project's dependencies. In our case there is only one - QUnit itself.
And this is devDependency because it's not required to use your script, but only for development and testing. ALso we specify command which should be executed when 
`npm test` is called, which is standard way to run tests for node projects. 
```json
{
  "dependencies": {},
  "devDependencies": {
    "qunit": "^2.6.1"
  },
  "scripts": {
    "test": "qunit"
  }
}
``` 

Finally, we need to tell Travis about our set up. For this purposes we create `.travis.yml` and specify our project type (node) and node version 
(`node` stands for "latest stable")
 ```yaml
language: node_js
node_js:
  - "node"
```


Inspired by [QUnit](https://qunitjs.com/) and [DWYL tutorials](https://github.com/dwyl/learn-qunit).