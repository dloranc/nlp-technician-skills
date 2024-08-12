const natural = require('natural');
let data = require('./data').default;

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

shuffleArray(data);

const TEST_SET_SIZE = 0.10;

const length = data.length;
const train = data.slice(0, length - length * TEST_SET_SIZE);
const test = data.splice(length - length * TEST_SET_SIZE);
console.log("length: ", length);
console.log("train length: ", train.length);
console.log("test length: ", test.length);

const stemmer = natural.LancasterStemmer;
const classifier = new natural.LogisticRegressionClassifier(stemmer);

train.forEach(({ description, skills }) => {
  classifier.addDocument(description, skills);
});

classifier.train();

const checkData = (dataset, type) => {
  let predictedCount = 0;

  dataset.forEach(({ description, skills }) => {
    const predictedSkills = classifier.classify(description);

    if (skills.sort().toString() === predictedSkills.sort().toString()) {
      predictedCount++;
    } else {
      console.log(description, skills.sort(), predictedSkills.sort());
    }
  });


  const accuracy = predictedCount / dataset.length * 100;
  console.log(`${type} accuracy: ${accuracy}%`);
}

checkData(train, 'train');
console.log('----------------------------------------------------------');
checkData(test, 'test');
console.log('----------------------------------------------------------');
checkData(data, 'data');

classifier.save('logistic-regression.json', (err, classifier) => {
  if (err) {
    console.log(err);
  } else {
    console.log("the classifier is saved to the classifier.json file!");
  }
})
