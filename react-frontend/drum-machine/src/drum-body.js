import React from "react";
import sounds from "./sounds";

const DrumBody = ({soundKey}) => {

    return (
        <div id='anchor'> 
        <button type='button' onClick={soundKey} class='drum-pad' id='a1' keycode='81'>
            <audio class='clip' id='Q' src={sounds[0].default} />
            Q
        </button>
        <button type='button' onClick={soundKey} class='drum-pad' id='a2' keycode='87'>
            <audio class='clip' id='W' src={sounds[1].default} />
            W
        </button>
        <button type='button' onClick={soundKey} class='drum-pad' id='a3' keycode='69'>
            <audio class='clip' id='E' src={sounds[2].default} />
            E
        </button>
        <button type='button' onClick={soundKey} class='drum-pad' id='b1' keycode='65'>
            <audio class='clip' id='A' src={sounds[3].default} />
            A
        </button>
        <button type='button' onClick={soundKey} class='drum-pad' id='b2' keycode='83'>
            <audio class='clip' id='S' src={sounds[4].default} />
            S
        </button>
        <button type='button' onClick={soundKey} class='drum-pad' id='b3' keycode='68'>
            <audio class='clip' id='D' src={sounds[5].default} />
            D
        </button>
        <button type='button' onClick={soundKey} class='drum-pad' id='c1' keycode='90'>
            <audio class='clip' id='Z' src={sounds[6].default} />
            Z
        </button>
        <button type='button' onClick={soundKey} class='drum-pad' id='c2' keycode='88'>
            <audio class='clip' id='X' src={sounds[7].default} />
            X
        </button>
        <button type='button' onClick={soundKey} class='drum-pad' id='c3' keycode='67'>
            <audio class='clip' id='C' src={sounds[8].default} />
            C
        </button>
        </div>
    )
  }

export default DrumBody;
