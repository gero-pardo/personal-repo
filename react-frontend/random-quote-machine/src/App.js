import React, {useState} from "react";
//import './App.css';

const quotes = [["a1", "a2"], ["b1", "b2"], ["c1", "c2"]] /* [quote,author] Twitter API would fetch this */

const RandomQuote = () => {


  var quoteIntializer = Math.floor(Math.random() * quotes.length);;

  const [quoteText, setQuoteText] = useState(quotes[quoteIntializer][0]);
  const [quoteAuthor, setQuoteAuthor] = useState(quotes[quoteIntializer][1]);

  const quoteSelector = () => {
    var quoteIndex = Math.floor(Math.random() * quotes.length);;
    setQuoteText(quotes[quoteIndex][0]);
    setQuoteAuthor(quotes[quoteIndex][1]);
  };

  var tweety = 'twitter.com/intent/tweet?text='.concat(encodeURIComponent(quoteText + " - " + quoteAuthor));

  return (
    <div id='wrapper'>
      <div id='quote-box'>
        <div id='text-box'>
          <div id='text'>
            {quoteText}
          </div>
        </div>
        <div id="author">
          {quoteAuthor}
        </div>
        <button id="new-quote" onClick={quoteSelector}>Generate!</button>
        <a href={tweety} id="tweet-quote">tweet</a>
      </div>
    </div>
  );

};

/*

next: actually fetch from twitter API

*/

export default RandomQuote;