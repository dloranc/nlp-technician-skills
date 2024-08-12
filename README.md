# NLP technician skills

This repo uses a `natural` - a NLP library that is used to classify the text with issue description to get one or more skills.

Example issue:

```
The kitchen sink is leaking and water is pooling on the floor.
```

You should get an array containing relevant skills:

```
["plumbing", "leak repair"]
```

## Installation

```
pnpm install
```

## Training

Training (the `logistic-regression.json` file will be overwritten:

```
node index.js
```

## Running

```
node run.js
```
