import React,{ useState, useEffect} from 'react'
const Time = () => {

    
    // initialize timeLeft with the seconds prop
    const [timeLeft, setTimeLeft] = useState(900);
    const [hourss,setHours] = useState()
    const [dayss, setDays] = useState()
    const [minutess, setMinutes] = useState()
    const [secondss, setSeconds] = useState()

    var days = Math.floor(timeLeft / (3600*24))
    var hours = Math.floor(timeLeft % (3600*24) / 3600);
    var minutes = Math.floor(timeLeft % 3600 / 60);
    var seconds = Math.floor(timeLeft % 60);

    
    

    // console.log("days", days);
    // console.log("hours", hours);
    // console.log("minutes", minutes);
    // console.log("seconds", seconds);
    
    useEffect(() => {
      // exit early when we reach 0
      if (!timeLeft) return;
      setDays(days)
      setHours(hours)
    setMinutes(minutes)
    setSeconds(seconds)
      // save intervalId to clear the interval when the
      // component re-renders
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
  
      // clear interval on re-render to avoid memory leaks
      return () => clearInterval(intervalId);
      // add timeLeft as a dependency to re-rerun the effect
      // when we update it
    }, [timeLeft]);
  
    return (
      <div>
        <h1>{timeLeft}</h1>
        <h1>{dayss}:{hourss}:{minutess}:{secondss}</h1>
      </div>
    );
  };
  export default Time