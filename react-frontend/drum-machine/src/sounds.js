/* sound compiler */

function importAll(r) {
    return r.keys().map(r);
}

/* require.context as parameter creates an object (webpackContext) 
   with nested objects derived from all valid files and parses them
   through webpack into usable format
   map() parses the orders them into an array
   keys() extracts all the keys (objects in this case) into an array
   end result: array of objects for each file in alphabetic order
   .default is the key that has the path for each file
   
   note:
   require.context by itself parses a whole webpack and the data must be 
   searched.

   .keys() by itself return an array of filepaths that are not useful
   since the are not imported 

   console.log(r.keys())
   >(3) ['./mixkit-drum-and-percussion-545.wav', './mixkit-soft-horror-hit-drum-564.wav', './mixkit-toy-drums-and-bell-ding-560.wav']
   
   */

const sounds = importAll(require.context('./sounds', false, /\.(wav)$/));
export default sounds;