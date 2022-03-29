import React from "react";
import {useState, useEffect} from "react";
import "./index.css";
import DrumBody from "./drum-body"

const DrumMachine = () => {

  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);  
    }
  });

  /* NOTE: events sent via listeners don't have the ''
      written in so it mas be queried manually 
  */

  const handleKeyPress = (e) => {
    if (document.querySelector(`.drum-pad[keycode='${e.keyCode}']`) != null) {
      var sound = document.querySelector(`.drum-pad[keycode='${e.keyCode}'] audio`);
      var div = (document.querySelector(`.drum-pad[keycode='${e.keyCode}']`))
      sound.currentTime = 0;
      sound.play();
      setDisplayText(div.id);
    }
  }  

  /* NOTE: in hooks the onclick event sends input to event object 
     while in elements it goes loaded as function parameter
  */

  /* Differences between event.target and event.currentTarget:
     target points to the individual div the click as 
     registered on. Any div nested inside the onClick
     element may fire the event and have said element regitered
     currentTarget points to the specific div the onClick
     event is parsed on.
     assigning the event (e) parameter to the function
     lets the event be loaded as a parameter, else the element 
     must be queried to be found
  */
      
  const soundKey = (e) => {

    //var sound = document.getElementById(e.currentTarget.id);
    var sound = e.currentTarget;
    sound.children[0].currentTime = 0;
    sound.children[0].play()  
    setDisplayText(e.currentTarget.id);

  }

  return (
    <div id="ancla" >
      <DrumBody 
                soundKey={soundKey} 
                handleKeyPress={handleKeyPress}
      />
      <div id='display'>
        <p id='text' >{displayText}</p>
      </div>
    </div>
  )
}

export default DrumMachine

/*

Hooks rework!

*/