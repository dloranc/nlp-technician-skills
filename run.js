const natural = require('natural');
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

natural.LogisticRegressionClassifier.load('logistic-regression.json', natural.LancasterStemmer, async (err, classifier) => {
  while (true) {
    const answer = await new Promise((resolve) => rl.question("Describe your issue, please: ", resolve));
    const result = classifier.classify(answer);
    console.log("Matching skills: ", result);
    console.log();
  }
});
