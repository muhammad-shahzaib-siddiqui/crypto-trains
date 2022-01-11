
// Follow me on twitter @JamesPistell

// Access the File System via Node's fs module
const fs = require("fs");




// console.log("Moralis", Moralis)
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

function generate(_type){

for (let index = 0; index < 100; index++) {
  let nftData;

  const type = randomWeight(nftType);

 
    if(_type == 0){
     let Hardness;
     let Power;
     let Speed;

      const commonType = randomWeight(Common);
      if(commonType==="55"){
        Speed = 125
        Power = 75
        Hardness =1 
        let attr = [{
          trait_type: 'Speed',
          value: Speed 
        },
        {
          trait_type: 'Power',
          value: Power 
        },
        {
          trait_type: 'Hardness',
          value: Hardness 
        },
        ]
        nftData = {
          name: 'GOODS TRAINS',
					image: 'https://ipfs.io/ipfs/QmUwTQneLsH7LzztzKN5umZY6rP1D7Wisuf6wsKNkbtth4',
					description:'At least it has wheels.',
          attributes: attr,
          rarity: "COMMON TRAIN"
        };
      }
      else if(commonType === "20"){
        Speed = 130
        Power = 80
        Hardness = 3
        let attr = [{
          trait_type: 'Speed',
          value: Speed 
        },
        {
          trait_type: 'Power',
          value: Power 
        },
        {
          trait_type: 'Hardness',
          value: Hardness 
        },
        ]
        nftData = {
          name: 'GOODS TRAINS',
          image: 'https://ipfs.io/ipfs/QmUwTQneLsH7LzztzKN5umZY6rP1D7Wisuf6wsKNkbtth4',
					description:'At least it has wheels.',
          attributes: attr,
          rarity: "COMMON TRAIN"
        };
      }
      else if(commonType === "15"){
        
        Speed = 135
        Power = 85
        Hardness =5 
        let attr = [{
          trait_type: 'Speed',
          value: Speed 
        },
        {
          trait_type: 'Power',
          value: Power 
        },
        {
          trait_type: 'Hardness',
          value: Hardness 
        },
        ]
        nftData = {
          name: 'GOODS TRAINS',
          image: 'https://ipfs.io/ipfs/QmUwTQneLsH7LzztzKN5umZY6rP1D7Wisuf6wsKNkbtth4',
					description:'At least it has wheels.',
          attributes: attr,
          rarity: "COMMON TRAIN"
        };
      }
      else if(commonType === "9"){
        Speed = 140
        Power = 90
        Hardness =7 
        let attr = [{
          trait_type: 'Speed',
          value: Speed 
        },
        {
          trait_type: 'Power',
          value: Power 
        },
        {
          trait_type: 'Hardness',
          value: Hardness 
        },
        ]
        nftData = {
          name: 'GOODS TRAINS',
          image: 'https://ipfs.io/ipfs/QmUwTQneLsH7LzztzKN5umZY6rP1D7Wisuf6wsKNkbtth4',
					description:'At least it has wheels.',
          attributes: attr,
          rarity: "COMMON TRAIN"
        };
      }
      else{
        Speed = 145
        Power = 95
        Hardness =9
        let attr = [{
          trait_type: 'Speed',
          value: Speed 
        },
        {
          trait_type: 'Power',
          value: Power 
        },
        {
          trait_type: 'Hardness',
          value: Hardness 
        },
        ]
        nftData = {
          name: 'GOODS TRAINS',
					image: 'https://ipfs.io/ipfs/QmUwTQneLsH7LzztzKN5umZY6rP1D7Wisuf6wsKNkbtth4',
					description:'At least it has wheels.',
          attributes: attr,
          rarity: "COMMON TRAIN"
        };
      }

    }

    else if(_type == 1) {


      let Hardness;
      let Power;
      let Speed;

      const rareType = randomWeight(Rare);
      if(rareType==="55"){
        Speed = 150
        Power = 100
        Hardness = 11 
        let attr = [{
          trait_type: 'Speed',
          value: Speed 
        },
        {
          trait_type: 'Power',
          value: Power 
        },
        {
          trait_type: 'Hardness',
          value: Hardness 
        },
        ]
        nftData = {
          name: 'VILLAGE TRAINS',
					image: 'https://ipfs.io/ipfs/QmbJEzUBU2egisPqXon3NrfR4FRZTYLPXmHb8zJHhnsAKJ',
					description:"It's amazing that something so heavy can move so fast.",
          attributes: attr,
          rarity: "RARE TRAIN"
        };
      }
      else if(rareType === "20"){
        Speed = 155
        Power = 105
        Hardness = 13
        let attr = [{
          trait_type: 'Speed',
          value: Speed 
        },
        {
          trait_type: 'Power',
          value: Power 
        },
        {
          trait_type: 'Hardness',
          value: Hardness 
        },
        ]
        nftData = {
          name: 'VILLAGE TRAINS',
					image: 'https://ipfs.io/ipfs/QmbJEzUBU2egisPqXon3NrfR4FRZTYLPXmHb8zJHhnsAKJ',
					description:"It's amazing that something so heavy can move so fast.",
          attributes: attr,
          rarity: "RARE TRAIN"
        };
      }
      else if(rareType === "15"){
        Speed = 160
        Power = 110
        Hardness = 15 
        let attr = [{
          trait_type: 'Speed',
          value: Speed 
        },
        {
          trait_type: 'Power',
          value: Power 
        },
        {
          trait_type: 'Hardness',
          value: Hardness 
        },
        ]
        nftData = {
          name: 'VILLAGE TRAINS',
					image: 'https://ipfs.io/ipfs/QmbJEzUBU2egisPqXon3NrfR4FRZTYLPXmHb8zJHhnsAKJ',
					description:"It's amazing that something so heavy can move so fast.",
          attributes: attr,
          rarity: "RARE TRAIN"
        };
      }
      else if(rareType === "9"){
        Speed = 165
        Power = 110
        Hardness =15 
        let attr = [{
          trait_type: 'Speed',
          value: Speed 
        },
        {
          trait_type: 'Power',
          value: Power 
        },
        {
          trait_type: 'Hardness',
          value: Hardness 
        },
        ]
        nftData = {
          name: 'VILLAGE TRAINS',
					image: 'https://ipfs.io/ipfs/QmbJEzUBU2egisPqXon3NrfR4FRZTYLPXmHb8zJHhnsAKJ',
					description:"It's amazing that something so heavy can move so fast.",
          attributes: attr,
          rarity: "RARE TRAIN"
        };
      }
      else{
        Speed = 170
        Power = 120
        Hardness =19
        let attr = [{
          trait_type: 'Speed',
          value: Speed 
        },
        {
          trait_type: 'Power',
          value: Power 
        },
        {
          trait_type: 'Hardness',
          value: Hardness 
        },
        ]
        nftData = {
          name: 'VILLAGE TRAINS',
					image: 'https://ipfs.io/ipfs/QmbJEzUBU2egisPqXon3NrfR4FRZTYLPXmHb8zJHhnsAKJ',
					description:"It's amazing that something so heavy can move so fast.",
          attributes: attr,
          rarity: "RARE TRAIN"
        };
      }


    }

    else if(_type == 2) {


      let Hardness;
      let Power;
      let Speed;

      const epicType = randomWeight(Epic);
      if(epicType==="55"){
        Speed = 175
        Power = 125
        Hardness = 21 
        let attr = [{
          trait_type: 'Speed',
          value: Speed 
        },
        {
          trait_type: 'Power',
          value: Power 
        },
        {
          trait_type: 'Hardness',
          value: Hardness 
        },
        ]
        nftData = {
          name: 'CITY TRAINS',
					image: 'https://ipfs.io/ipfs/QmS4CL8BKdtU3NF8veAfUW3txzQhs8WLyvRPYCS1DgJeih',
					description:'Sit down and fasten your seat belt.',
          attributes: attr,
          rarity: "EPIC TRAIN"
        };
      }
      else if(epicType === "20"){
        Speed = 180
        Power = 130
        Hardness = 23
        let attr = [{
          trait_type: 'Speed',
          value: Speed 
        },
        {
          trait_type: 'Power',
          value: Power 
        },
        {
          trait_type: 'Hardness',
          value: Hardness 
        },
        ]
        nftData = {
          name: 'CITY TRAINS',
					image: 'https://ipfs.io/ipfs/QmS4CL8BKdtU3NF8veAfUW3txzQhs8WLyvRPYCS1DgJeih',
					description:'Sit down and fasten your seat belt.',
          attributes: attr,
          rarity: "EPIC TRAIN"
        };
      }
      else if(epicType === "15"){
        Speed = 185
        Power = 135
        Hardness = 25 
        let attr = [{
          trait_type: 'Speed',
          value: Speed 
        },
        {
          trait_type: 'Power',
          value: Power 
        },
        {
          trait_type: 'Hardness',
          value: Hardness 
        },
        ]
        nftData = {
          name: 'CITY TRAINS',
					image: 'https://ipfs.io/ipfs/QmS4CL8BKdtU3NF8veAfUW3txzQhs8WLyvRPYCS1DgJeih',
					description:'Sit down and fasten your seat belt.',
          attributes: attr,
          rarity: "EPIC TRAIN"
        };
      }
      else if(epicType === "9"){
        Speed = 190
        Power = 140
        Hardness = 127
        let attr = [{
          trait_type: 'Speed',
          value: Speed 
        },
        {
          trait_type: 'Power',
          value: Power 
        },
        {
          trait_type: 'Hardness',
          value: Hardness 
        },
        ]
        nftData = {
          name: 'CITY TRAINS',
					image: 'https://ipfs.io/ipfs/QmS4CL8BKdtU3NF8veAfUW3txzQhs8WLyvRPYCS1DgJeih',
					description:'Sit down and fasten your seat belt.',
          attributes: attr,
          rarity: "EPIC TRAIN"
        };
      }
      else {
        Speed = 195
        Power = 140
        Hardness =27
        let attr = [{
          trait_type: 'Speed',
          value: Speed 
        },
        {
          trait_type: 'Power',
          value: Power 
        },
        {
          trait_type: 'Hardness',
          value: Hardness
        },
        ]
        nftData = {
          name: 'CITY TRAINS',
					image: 'https://ipfs.io/ipfs/QmS4CL8BKdtU3NF8veAfUW3txzQhs8WLyvRPYCS1DgJeih',
					description:'Sit down and fasten your seat belt.',
          attributes: attr,
          rarity: "EPIC TRAIN"
        };
      }


    }


    else if(_type == 3) {


      let Hardness;
      let Power;
      let Speed;

      const legendType = randomWeight(Legend);
      if(legendType==="55"){
        Speed = 200
        Power = 150
        Hardness = 31
        let attr = [{
          trait_type: 'Speed',
          value: Speed 
        },
        {
          trait_type: 'Power',
          value: Power 
        },
        {
          trait_type: 'Hardness',
          value: Hardness 
        },
        ]
        nftData = {
          name: 'HIGH-SPEED TRAINS',
					image: 'https://ipfs.io/ipfs/QmQjsBA1cnJ9dJMbwVwsVFf29EaT9GYTEGAt9QcBTy9kBo',
					description:'From 0 to 1000 in ten seconds.',
          attributes: attr,
          rarity: "LEGENDARY TRAIN"
        };
      }
      else if(legendType === "20"){
        Speed = 205
        Power = 155
        Hardness = 33
        let attr = [{
          trait_type: 'Speed',
          value: Speed 
        },
        {
          trait_type: 'Power',
          value: Power 
        },
        {
          trait_type: 'Hardness',
          value: Hardness 
        },
        ]
        nftData = {
          name: 'HIGH-SPEED TRAINS',
					image: 'https://ipfs.io/ipfs/QmQjsBA1cnJ9dJMbwVwsVFf29EaT9GYTEGAt9QcBTy9kBo',
					description:'From 0 to 1000 in ten seconds.',
          attributes: attr,
          rarity: "LEGENDARY TRAIN"
        };
      }
      else if(legendType === "15"){
        Speed = 210
        Power = 160
        Hardness = 35 
        let attr = [{
          trait_type: 'Speed',
          value: Speed 
        },
        {
          trait_type: 'Power',
          value: Power 
        },
        {
          trait_type: 'Hardness',
          value: Hardness 
        },
        ]
        nftData = {
          name: 'HIGH-SPEED TRAINS',
					image: 'https://ipfs.io/ipfs/QmQjsBA1cnJ9dJMbwVwsVFf29EaT9GYTEGAt9QcBTy9kBo',
					description:'From 0 to 1000 in ten seconds.',
          attributes: attr,
          rarity: "LEGENDARY TRAIN"
        };
      }
      else if(legendType === "9"){
        Speed = 215
        Power = 165
        Hardness = 137 
        let attr = [{
          trait_type: 'Speed',
          value: Speed 
        },
        {
          trait_type: 'Power',
          value: Power 
        },
        {
          trait_type: 'Hardness',
          value: Hardness 
        },
        ]
        nftData = {
          name: 'HIGH-SPEED TRAINS',
					image: 'https://ipfs.io/ipfs/QmQjsBA1cnJ9dJMbwVwsVFf29EaT9GYTEGAt9QcBTy9kBo',
					description:'From 0 to 1000 in ten seconds.',
          attributes: attr,
          rarity: "LEGENDARY TRAIN"
        };
      }
      else{
        Speed = 220
        Power = 170
        Hardness = 39
        let attr = [{
          trait_type: 'Speed',
          value: Speed 
        },
        {
          trait_type: 'Power',
          value: Power 
        },
        {
          trait_type: 'Hardness',
          value: Hardness 
        },
        ]
        nftData = {
          name: 'HIGH-SPEED TRAINS',
					image: 'https://ipfs.io/ipfs/QmQjsBA1cnJ9dJMbwVwsVFf29EaT9GYTEGAt9QcBTy9kBo',
					description:'From 0 to 1000 in ten seconds.',
          attributes: attr,
          rarity: "LEGENDARY TRAIN"
        };
      }


    }

    // const Hardness = Math.floor(Math.random() * 99);
    // nftData = {
    //   nftType: type,
    //   trainType: trainType,
    //   Hardness: randomInteger(20, 99),
    //   Power: randomInteger(20, 99),
    //   Speed: randomInteger(20, 99),
    // };

    
   else if(_type == 4) {
    nftData = {
      name: 'GOODS STATION',
      image: 'https://ipfs.io/ipfs/Qmeg4WNTutafGHPHrSMhAtL1V5miPLsqPfAYCuqdyBU9Fo',
      description:"Don't lose the trains that pass by, there aren't many.",
      rarity: "COMMON TRAIN STATION"
    };
  }

  else if(_type == 5) {
    nftData = {
      name: 'CITY STATION',
      image: 'https://ipfs.io/ipfs/QmNoGepeZRukQQHvS4VvxM4cdwzcELHS1Y3REMiwBczbd4',
      description:'Hello cosmopolitan, you have arrived at your destination.',
      rarity: "EPIC TRAIN STATION"
    };
  }
  else if(_type == 6) {
    nftData = {
      name: 'HIGH-SPEED STATION',
      image: 'https://ipfs.io/ipfs/QmaHVMg7qzn9fG6n2mvgYG5kvh8QyDmVQ2fqwTSeNTJ3zs',
      description:'Only the brave arrive here.',
      rarity: "LEGENDARY TRAIN STATION"
    };
  }
  
  // console.log("type", type);

  // lets output this data to JSON!!!!!!!
  fs.writeFileSync(
    `./metadata/${index}.json`,
    JSON.stringify(nftData, null, 2),
    console.log("nftData", nftData)
  );


  }

}
generate(6)
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
// console.log(counts);

// view the total percentage of each attribute generated
Object.entries(counts).forEach((e) => {
  counts[e[0]] = `${((e[1] / 8888) * 100).toFixed(2)}%`;
});

console.log("================= TOTAL PERCENTAGE =================");
// console.log(counts);
