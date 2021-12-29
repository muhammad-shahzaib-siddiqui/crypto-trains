
// Follow me on twitter @JamesPistell

// Access the File System via Node's fs module
const fs = require("fs");

//* ************************************************** //
//* **************** Metadata Attributes ************* //
//* ************************************************** //
// Create metadata for a person (hair, eye, height, etc)

const nftType = [
  ["TRAINS", 4660],
  ["STATIONS", 600],
];

const Train = [
  ["Common", 2500],
  ["Rare", 1500],
  ["Epic", 500],
  ["Legendary", 160],
];

const Stations = [
  ["Common", 300],
  ["Mitic", 200],
  ["Legendary", 100],
];


//* ************************************************** //
//* **************** Weighted Randomizer ************* //
//* ************************************************** //
// Randomize the array and chose a value based on weights
// https://blobfolio.com/2019/randomizing-weighted-choices-in-javascript/
function randomWeight(arr) {
  // Pre-sum the weights
  // First, we loop the main dataset to count up the total weight.
  // We're starting the counter at one because the upper boundary
  // of Math.random() is exclusive.
  let total = 0;
  for (let index = 0; index < arr.length; ++index) {
    total += arr[index][1];
    console.log("total", total);
  }
  // Total in hand, we can now pick a random value akin to our
  // random index from before.
  const threshold = Math.random() * total;

  

  // Now we just need to loop through the main arr one more time
  // until we discover which value would live within this
  // particular threshold. We need to keep a running count of
  // weights as we go, so let's just reuse the "total" variable
  // since it was already declared.
  total = 0;
  for (let index = 0; index < arr.length; ++index) {
    // Add the weight to our running total.
    total += arr[index][1];
    // If this value falls within the threshold, we're done!
    if (total >= threshold) {
      console.log("index", arr[index][0]);
      return arr[index][0];
    }
  }
  return arr[arr.length - 1][0];
}

//* ************************************************** //
//* ********** Create the JSON metadata file ********* //
//* ************************************************** //

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (let index = 0; index < 20; index++) {
  let nftData;

  const type = randomWeight(nftType);

  if (type === "TRAINS") {
    const trainType = randomWeight(Train);
    const Hardness = Math.floor(Math.random() * 99);
    nftData = {
      nftType: type,
      trainType: trainType,
      Hardness: randomInteger(20, 99),
      Power: randomInteger(20, 99),
      Speed: randomInteger(20, 99),
    };
  } else {
    const stationType = randomWeight(Stations);
    nftData = {
      nftType: type,
      stationType: stationType,
    };
  }
  console.log("type", type);

  // lets output this data to JSON!!!!!!!
  fs.writeFileSync(
    `./metadata/${index}.json`,
    JSON.stringify(nftData, null, 2)
  );
}

//* ************************************************** //
//* ********** Validate your rarity DATA ************* //
//* ************************************************** //
const emptyArr = [];
const counts = {};

for (let index = 1; index < 8888; index++) {
  // Pick a random attribute array to find how how many are going to be generated
  // In this example I am analyzing eyeColor
  emptyArr.push(randomWeight(nftType));
}

// view the total number of each attribute generated
emptyArr.forEach((x) => {
  let totalNum = (counts[x] || 0) + 1;
  counts[x] = totalNum;
});

console.log("================= TOTAL COUNT =================");
console.log(counts);

// view the total percentage of each attribute generated
Object.entries(counts).forEach((e) => {
  counts[e[0]] = `${((e[1] / 8888) * 100).toFixed(2)}%`;
});

console.log("================= TOTAL PERCENTAGE =================");
console.log(counts);
