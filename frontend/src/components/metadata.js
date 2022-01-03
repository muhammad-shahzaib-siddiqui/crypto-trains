
// Follow me on twitter @JamesPistell

// Access the File System via Node's fs module
const fs = require("fs");




// console.log("Moralis", Moralis)
//* ************************************************** //
//* **************** Metadata Attributes ************* //
//* ************************************************** //
// Create metadata for a person (hair, eye, height, etc)


const Common = [
  ["55", 1375],
  ["20", 500],
  ["15", 375],
  ["9", 225],
  ["1", 25]
]

const Rare = [
  ["55", 825],
  ["20", 300],
  ["15", 225],
  ["9", 135],
  ["1", 15],

]

const Epic = [
  ["55", 275],
  ["20", 100],
  ["15", 75],
  ["9", 45],
  ["1", 5],

]

const Legend = [
  ["55", 88],
  ["20", 32],
  ["15", 24],
  ["9", 14],
  ["1", 2],

]

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
    // console.log("total", total);
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
      // console.log("index", arr[index][0]);
      return arr[index][0];
    }
  }
  return arr[arr.length - 1][0];
}

//* ************************************************** //
//* ********** Create the JSON metadata file ********* //
//* ************************************************** //

export function generate(_type){

for (let index = 0; index < 1; index++) {
  let nftData;

  
    if(_type == 0){
      const commonType = randomWeight(Common);
      if(commonType==="55"){
        return "Qmbpomdpbmr31xijTnnamKjYyd1ZnBckfTbPcFfBnyY44W"
      }
      else if(commonType === "20"){
       return "QmWspYZguTWHnZfiyZZ4zB1uUp7UfqvrSk93PGgwkh7zB5"
      }
      else if(commonType === "15"){
        return "QmUmbEmV5eiN2T7thAB8XcSX82Yh5g6eYpcArJam5aLX2g"
      }
      else if(commonType === "9"){
       return "QmWjVWC6nQ8dkK9AA8BM8YndpAbB5CgjLo7uA9PyLJP32x"
      }
      else{
       return "QmZiCk4oTm9NEEuqd45DcVNu6GvYSwgv12SyS82jKa7c5x"
    }}

    else if(_type == 1) {

      const rareType = randomWeight(Rare);
      if(rareType==="55"){
      return "QmWmk4vA9n7LehiyW9Rs3VTeNF4Kv7e1hrzjuj8PyGYU5y"
      }
      else if(rareType === "20"){
      return "QmNNoUaVTMKur2vJwRmjGGZuHc22Mod2DUs2n47mjGwGFS"
      }
      else if(rareType === "15"){
       return "QmXQUenhizpsxRqdmNBYWqEkRuagaH2iHMK53tNHaxArns"
      }
      else if(rareType === "9"){
       return "QmSaDNChv1GyEmfeNvkMr5tPVzjgNSEDC5q5TJKazKtec6"
      }
      else{
        return "Qmf5rirnZAiC51aJQQi77VEZGccaz8qxeuP3z4bWqQwvXY"
      }


    }

    else if(_type == 2) {
        const epicType = randomWeight(Rare);
      if(epicType==="55"){
        return "QmSC47BqVeVT1qy9cugAqoNytWY2N1XCr4vCdp5HGBJ4BQ"
      }
      else if(epicType === "20"){
       return "QmZC3SErS9ghydnbze8YZY3ubvHCLQ35vQ37AuHkNCTRT8"
      }
      else if(epicType === "15"){
        return "Qmd3R7PZiGPpLuHpS7sVHiZiEyp6vv9DPVu1s8W48egEtC"
      }
      else if(epicType === "9"){
        return "QmdSwp1aXjaoWZm1DPpiwUmNpzG1gu52K5pbdvoqYg8ewW"
      }
      else {
        return "QmWWQWaXQaqKaW5CnES6F8QLTjw1LfaFmNJhyUrh6jo19Y"
      }


}


    else if(_type == 3) {



      const legendType = randomWeight(Legend);
      if(legendType==="55"){
       return "QmW9smtXX3sCm25668b7dBQJTdqVVQ2Q2Z7y888C8ihGvM"
      }
      else if(legendType === "20"){
        return "QmNzebMiwwtxMRD1p3Z5WL1yWjyh4L3gjr7eYYJg2CBGun"
      }
      else if(legendType === "15"){
       return "QmZ3T3btJkaMij4qskS5RsRdkRQZGrSNdo9vJ9UUp589vP"
      }
      else if(legendType === "9"){
        return "QmYxoFw16mjx8XAAJ3tSRGtS9YVWyXEczkeoDNoDTQRfnE"
      }
      else{
       return "QmT7A6rTz7kfiPWoDFawRtKsXtJAm8YP1pPGYhzNhyuWQj"
      }


    }

   else if(_type == 4) {
    return "QmYYVvHDZXQEiLJqD57dssbxeSCuZcVf3YuqUHarqfxdBT"
  }

  else if(_type == 5) {
    return "QmQbhCCrqMs9NQuyCt9AisdaHHsxeMMuKBw2paQrvqdw9s"
  }
  else if(_type == 6) {
    return "QmZcYwn9bGAtmuTXkaFNJyXfTkzMtf9F6ZHJmvPU1zcATq"
  } 
  
  

  }

}
generate(6)
