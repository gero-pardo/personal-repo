import React, {useState, useEffect, useRef} from 'react';
import beep from './sounds/mixkit-appliance-ready-beep-1076.wav'

function App() {

    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);
    const [testResult, setTestResult] = useState("");
    const [totalTime, setTotalTime] = useState(0);
    const [sessionTimeLeft, setSessionTimeLeft] = useState(25*60);

    const timerMode = useRef("session");
    const timerSwitch = useRef("off");
    const timer = useRef(0);
    const timerKill = useRef(null);
    const audio = useRef(null);

    useEffect(() => {
        timerMode.current = "session";
        audio.current = document.getElementById("beep");
        audio.current.load();
    },[])

    const resetter = () => {
        setBreakLength(5);
        setSessionLength(25);
        setTotalTime(0);
        setSessionTimeLeft(25*60);
        timerMode.current = "session";
        if (timerSwitch.current === "on") {
            timerKill.current();
            timerKill.current = null;
        }
        timerSwitch.current = "off";
        audio.current.pause();
        audio.current.currentTime = 0;
    }

    const valueChanges = (breakOrSession, e) => {

        if (timerSwitch.current === "on") return;
        if (sessionLength*60 !== sessionTimeLeft) return;

        if (breakOrSession && ((e === -1 && breakLength > 1) || (e === 1 && breakLength < 60 ))) {
            setBreakLength(breakLength+e);
        } else if (!breakOrSession && ((e === -1 && sessionLength > 1) || (e === 1 && sessionLength < 60 ))) {
            setSessionLength(sessionLength+e);
            setSessionTimeLeft((sessionLength+e)*60);
        }
    }

    const numberToClock = (e) => {
        let minutes, seconds;
        minutes = Math.floor(e / 60);
        seconds = e - minutes * 60;
        if (seconds < 10) { seconds = "0" + seconds; }
        if (minutes < 10) { minutes = "0" + minutes; }
        return minutes + ':' + seconds;
    }

    // corrects setInterval deviation by comparing Date between endpoints against interval
    // ideally this is a global function or renderless component
    const intervalCalibrator = (callback, interval = 1000) => { 

        let timeoutId, startEndpoint, nextEndpoint, deviatedEndpoint;

        timeoutId = null;
        startEndpoint = Date.now();
        nextEndpoint = startEndpoint + interval;

        const wrapper = () => {            

            // not true recursion - effectively a setInterval
            deviatedEndpoint = Date.now();
            timeoutId = setTimeout( wrapper, interval - (deviatedEndpoint - nextEndpoint) );
            nextEndpoint += interval;

            //console.log("setting timeout...")
            //console.log(timeoutId)
            //console.log('deviation', deviatedEndpoint - nextEndpoint);            

            callback();

        }

        timeoutId = setTimeout(wrapper, interval);        

        // necessary to opt out of function - could be made as an object
        return () => {
            clearTimeout(timeoutId);
        }
    }

    const callbackFn = () => {
        
        if (timer.current > 0) { // timer counter

            timer.current--;
            setSessionTimeLeft(timer.current);
            setTotalTime(prevState => prevState + 1);

        } else { // timer stop on finish

            if (timer.current === 0) audio.current.play();

            if (timerMode.current === "session") {                
                setTestResult(`SESSION TIME FINISHED - TAKE A BREAK!`);
                timerMode.current = "break";
                timer.current = (breakLength*60);
                setSessionTimeLeft(breakLength*60);
            } else {
                setTestResult(`BREAK OVER - TIME TO WORK!`);
                timerMode.current = "session";
                timer.current = (sessionLength*60);
                setSessionTimeLeft(sessionLength*60);
            }

            timerKill.current();
            
            startTimer();

        }
    }
    

    const startTimer = () => {

        timerKill.current = intervalCalibrator(callbackFn, 1000);

    }

    const startStop = () => {
   
        if (timerSwitch.current === "off") {
            //console.log("starting...")
            timerSwitch.current = "on";
            timer.current = sessionTimeLeft;
            startTimer();
        } else {
            //console.log("pausing...")
            timerSwitch.current = "off";
            timerKill.current();
        }
    }

    return (
        <div>
            <div id="main-body">
                <div className="body-grid" id="main-body-grid">
                    <div className="body-cell" id="grid1">
                        <div id="break-label">BREAK TIME</div>
                        <div className="flex" id="flex1">
                            <button id="break-decrement" onClick={() => valueChanges(true, -1)}>-</button>
                            <div className="data-pad" id="break-length">{breakLength}</div>
                            <button id="break-increment" onClick={() => valueChanges(true, 1)}>+</button>
                        </div>
                    </div>
                    <div className="body-cell" id="grid2">
                        <div id="session-label">SESSION TIME</div>
                        <div className="flex" id="flex1">
                            <button id="session-decrement" onClick={() => valueChanges(false, -1)}>-</button>
                            <div className="data-pad" id="session-length">{sessionLength}</div>
                            <button id="session-increment" onClick={() => valueChanges(false, 1)}>+</button>
                        </div>
                    </div>
                </div>
                <div className="timers" id="timers">
                    <div id="time-left">{numberToClock(sessionTimeLeft)}</div>
                    <div id="total-time" >{numberToClock(totalTime)}</div>
                    <div id="timer-label">{timerMode.current}</div>
                </div>
                <button id="start_stop" onClick={() => startStop()}>Start</button>
                <button id="reset" onClick={() => resetter()}>Reset</button>
            </div>
            <div className="result-text">
                <div id="flavour"><p>{testResult}</p></div>
                <audio id="beep" preload="auto">
                     <source src={beep} type="audio/wav"></source>
                </audio>
            </div>
            <br />
            <br />
            <div>Sound licensed by <a href="https://mixkit.co/">mixkit.co</a></div>
           
        </div>
    )
}

export default App;

