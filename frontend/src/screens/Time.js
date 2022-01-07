
// import React, { useEffect, useState } from "react";



// function Timer() {




    
//     const calculateTimeLeft = () => {

//         let year = new Date().getFullYear();
//         // console.log("year", year)
//         let difference = +new Date(200 * 1000) - new Date();
//         // console.log("difference", difference)

//         // let difference = 600 * 100 -  2

//         console.log("difference", difference)
      
//         let timeLeft = {};
      
//         if (difference > 0) {
//           timeLeft = {
//             days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//             hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//             minutes: Math.floor((difference / 1000 / 60) % 60),
//             seconds: Math.floor((difference / 1000) % 60)
//           };
//         }
      
//         return timeLeft;

        
//       }

//       const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
      

//       useEffect(() => {
//         const timer = setTimeout(() => {
//           setTimeLeft(calculateTimeLeft());
//         }, 1000);
      
//         return () => clearTimeout(timer);
//       });

//       const timerComponents = [];

// Object.keys(timeLeft).forEach((interval) => {
//   if (!timeLeft[interval]) {
//     return;
//   }

//   timerComponents.push(
//     <span>
//       {timeLeft[interval]} {interval}{" "}
//     </span>
//   );
// });


    

//   return (
//     <div>
//     {timerComponents.length ? timerComponents : <span>Time's up!</span>}
//   </div>
//   )
// }

// export default Timer;

import React, { useEffect } from "react"
function Timer() {
    
    const [countDown, setCountDown] = React.useState(0);
    const [runTimer, setRunTimer] = React.useState(false);
  
    React.useEffect(() => {
      let timerId;
  
      if (runTimer) {
        setCountDown(60 * 5);
        timerId = setInterval(() => {
          setCountDown((countDown) => countDown - 1);
        }, 1000);
      } else {
        clearInterval(timerId);
      }
  
      return () => clearInterval(timerId);
    }, [runTimer]);
  
    React.useEffect(() => {
      if (countDown < 0 && runTimer) {
        console.log("expired");
        setRunTimer(false);
        setCountDown(0);
      }
    }, [countDown, runTimer]);
  
    const togglerTimer = () => setRunTimer((t) => !t);
  
    const seconds = String(countDown % 60).padStart(2, 0);
    const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);

    useEffect(() => {
        togglerTimer()
    }, [])
  
    return (
      <div className="App">
        <div>
          Time: {minutes}:{seconds}
        </div>
  
        {/* <button type="button" onClick={togglerTimer}>
          {runTimer ? "Stop" : "Start"}
        </button> */}
      </div>
    );
  }
  export default Timer;