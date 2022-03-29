import React, {useState, useEffect, useRef} from "react";
import {marked} from "marked"
import "./index.css";

marked.setOptions({
  breaks: true
});

const text = `sup dudes
====
and dudettes
---

**sample text**

_dimple xetx_

\`sample code\`

\`\`\`
// sample codes

const test = Math.floor(Math.random() * 5)
\`\`\`

[sample link](https://codepen.io/)

> sample 
>
> block

test | test | regtest 

- testreg
  - testtest
  - regreg
  
1. legs
1. arms
1. head


  
![sample image](https://cpwebassets.codepen.io/assets/social/facebook-default-05cf522ae1d4c215ae0f09d866d97413a2204b6c9339c6e7a1b96ab1d4a7340f.png)
  `

const Previewer = () => {

  const [previewText, setPreviewText] = useState(text); // Hook - initial state loaded with text var content and setState function.
  const previewRef = useRef(); // declares a reference object

  useEffect(() => { // Hook - on conmponent update, do the following:

    document.addEventListener('keydown', handleChange); // listens to key presses so they call a funtion
    previewRef.current.innerHTML = marked(previewText) // parses the previewText state through marked and updates the reference object
    // state and ref are updated at the same time

    return () => {
      document.removeEventListener('keydown', handleChange); // clean up event listener
    }

  });

  const handleChange = (e) => {

    setPreviewText(e.target.value) // Hook - setState

  }

  return (
    <div id="main-body">
        <label id="tittletext" for='#editor'>TEXTMARKDOWN</label>
        <br/>
        <textarea 
          id='editor' 
          onChange={handleChange}
          value={previewText} // loads state into input
        ></textarea>
        <div 
          id='preview' 
          ref={previewRef} // loads ref into html (plain text as parsed by marked)
        ></div>
    </div>
  );

}

export default Previewer;