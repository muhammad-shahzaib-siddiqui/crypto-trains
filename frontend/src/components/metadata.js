

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
        return "QmaNpwdJpxzkJ7BVtqTTW3HsahHfq9Z37yWzSGszdu41c6"
      }
      else if(commonType === "20"){
       return "QmUUtJGDsBMQSBMLTUDUGsQWUJ5iLmcyEGv766LQFCMaK3"
      }
      else if(commonType === "15"){
        return "Qmax1fg2TuksK3N5qzxnGGsTqE8dfAa9kdLf8tkwN7DHM1"
      }
      else if(commonType === "9"){
       return "Qme55qdQu2HABgvoCzonEHFEWQkzpHUC2btmigYL8xPBkh"
      }
      else{
       return "QmRSaj6rt4oXoBWwAm8RiH3f1o3k6B73NNFsa4S1xU8nKc"
    }}

    else if(_type == 1) {

      const rareType = randomWeight(Rare);
      if(rareType==="55"){
      return "QmPPgfHXq4ET8omXNCP8B6LjJpkP89C2Y7QcEQkZKUQpzN"
      }
      else if(rareType === "20"){
      return "QmZd3m1A6quAVhfJBzm3mFwN8kUnZe29enHABsnXEn3icy "
      }
      else if(rareType === "15"){
       return "QmSjbSbPvdTXv4JWKkajNE93c5cQRUWRw9VwR6nPbQjDp2"
      }
      else if(rareType === "9"){
       return "QmQ9L77iorMPq2hHbT4bQeB5SGVaFCW8xebEqN1p6QG9Hd"
      }
      else{
        return "QmZwM4Rvd5hftBxzhk4tjhtrqLdkcReUCa8KLyHVcpHYk3"
      }


    }

    else if(_type == 2) {
        const epicType = randomWeight(Rare);
      if(epicType==="55"){
        return "QmXVgTKi9FHLPRQ2E2bzHjbfHgfm5xAv7qHKhcnZNVvnuZ"
      }
      else if(epicType === "20"){
       return "QmZC3SErS9ghydnbze8YZY3ubvHCLQ35vQ37AuHkNCTRT8"
      }
      else if(epicType === "15"){
        return "QmRRiNL5nDLdkpwnQHWsPJzdy3k9tVsq8x7HXewCHejsLE"
      }
      else if(epicType === "9"){
        return "QmTcaqxVhYuDbmHTzpyEwNcjW4mA2dUFmBevDQjKLHRvSR"
      }
      else {
        return "QmdXr2FrtHqRXPbRG8TYCPHHaFCEKYSXqTfycq3geXdiXA"
      }


}


    else if(_type == 3) {



      const legendType = randomWeight(Legend);
      if(legendType==="55"){
       return "QmNuJf1feEokrXrcbo5e2BYM7fVuRsw4CCeBRhNjtKec9C"
      }
      else if(legendType === "20"){
        return "QmeSTaGnsDTvk11YVpjYUzvsSgJhMtkMFukFRoJt7iyuHm"
      }
      else if(legendType === "15"){
       return "QmQPxHhRVXHKGGvSEfPcdzqHMnQc8Yzq593ffG6iEbig4e"
      }
      else if(legendType === "9"){
        return "QmdeE53tnHnSYR4aXXZVJYJFzoswRGbM62GGLdCu2QqjhW"
      }
      else{
       return "QmPErzKSkbX9u8qvdBQr2gxhzrpEcZ9tqhGFJyJnr1nMXg"
      }


    }

   else if(_type == 4) {
    return "QmdZsQBoiEMWMg5Pw4PYChDtSNknKrtiVHfdfuVRd6dStD"
  }

  else if(_type == 5) {
    return "QmQtps4qWfop8Qyt62pErg6uZe7MMoSyrnmQA31YuNL8P6"
  }
  else if(_type == 6) {
    return "QmTC1s4wuJQsS4FJSrCfrwLrDYmnGRhMi2WqD7NY7thsLM"
  } 
  
  

  }

}

