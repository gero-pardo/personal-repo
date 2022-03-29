# FCC 25 + 5 Clock Challenge

For my portfolio.
Soundclip taken from mixkit.co under their license.

## notes

Finishing notes: Well. This was fun. Short, less than a week of work.
Dealing with the Bundle.js+webpack - react+hooks - chromium combo was a
an excersice in detail and frustration. What didn't confuse one framework
confuses one applet or has chrome specifically target against my ideas.

The whole app was rooted on a rather headstrong plug-in of the acurrate
interval solution presented by the developer of the example app in the 
FCC challenge, whose base concept is explained in the mozilla page
https://developer.mozilla.org/en-US/docs/Web/API/setInterval
--- Essentially adding date comparisons to a recursive timeout loop.
that ensures there's browser clog will interfere with the world be interval
Essentially "calibrating" the time to avoid going wildly off mark.

Since I felt that adding a constant, non component function to a React
script was going against the essence of component concept, I decided
to integrate the function as a method.

That was the beginning of the problem. The commonly read solutions
for a simple clock simply did not apply to what was essentially two
callbacks inside a wrapper.

Rather, React hooks had problems handling what react class components
wouldn't have much trouble with. I essentially had to devise my own
way to do it through references as a component-scope variable
(which shouldn't, since you have state for that)

This also showed me how clever FCC was in the design of this challenge.
Javascript timers are an inherent problem for react subce they exist as
a separate (instance? thread?) from the code being run. By design,
the react lifecycle is unable to handle timers with some degree
of complexity - like say, my wrapped-recursion-callback combo
and effectively choked.

This forced me to relay on refs for anything that needed to be inside 
the timer method chain, else it simply would be out of time with the
asynchronous nature of state.

I ended up reinterpreting the structure with some clever and very
much not clever use of Refs and State. Say
State: For any value that must appear inside an element
Ref: For any internal use value inside the component
Effect: To set refs as a State via their hefty arg arrays
(and other uses)

Then came the audio problem. Turns out in recent years (read: late 2020)
chromium updated it's framwork to disable auto play() functions for media
files, forcing to wrestle the internet to figure out how to handle a promise...
except putting a promise handler inside the stupidly complex method.

Luckily I came upon what I guess is an oversight of chromium team (or me)
that lets you force the open promise without failure conditions via the
source tag.

And debugging was a nightmare. Impossible to do it by bungle.js checking each
step one at a time, and even VScode node.js server had trouble with the intervals.
The best solution was splitting the concept of the clock into it's fundamental parts
-- the mechanism that decreases the timer, the start-stop function, each button, etc
then starting from the ground up - I can't check anything  if I can't make the timer go
from time A to time 0. Took me a while to figure out, but I got it working.

In the end I managed to sort it all out and catch some last-second corrections.
The interval calibrator has been succesfully integrated into the component
pretty much unchanges and without ouside declarations

There's no denying I came out of this one with a very clear understanding 
of the State - Effect - Ref trifeca and have cerntainly advance since my
first react hook in the drum machine rebuild.

I'm still not sure if this approach was a good idea, but I don't quite agree
with the idea of just loading a random function outside the react structure
entirely and solving the challenge in such a boneheaded manner left me with
a much clearer understanding of the framework and work enviroment.

----

## starting notes 

The fcc test methods don't really work for me here, so i'll have to take things
on a slower approach, testing a function per time.

order of things to be tested:
    * 
    * structure that allows for setting intervals, starting a countdown, stopping it. $$$ DONE
    * structure element calls timer function that intializes the countdown intervals $$$ DONE --> essential (startTimer)
    * method that returns the acurrate interval  $$$ DONE --> essential (intervalCalibrator)
    * method parses the countdown interval through a 1 second timer which sents it to the and sent to the state on update &&& DONE --> essential (callback)
    * structure element can call a function that stops the timer at the current update and remembers the values $$$ DONE
    * structure elements can call functions that changes the variables that set the countdown interval $$$ DONE
    * structure element can call a function that resets all values to default state $$$ DONE

Those marked essential are the core of the applet itself and no other evualuation would work without it.
-- First I must design a timer, then anchor it to the DOM... --
essential breakdown:
data input -> parsed into the interval function -> intervals to use -> timer function does a countdown -> each count it gets the state updated



        // compensates browser inacurracies with setTimeout
        function intervalCalibrator(callback, interval = 500) {

            let timeoutId, startEndpoint, nextEndpoint, deviatedEndpoint;

            let timeoutId = null; // cleans up
            startEndpoint = Date.now(); // first endpoint at current time
            nextEndpoint = startEndpoint + interval; 

            function wrapper() {

                deviatedEndpoint = Date.now();
                
                timeoutId = setTimeout(wrapper, interval - (deviatedEndpoint - nextEndpoint));

                console.log('deviation', deviatedEndpoint - nextEndpoint);

                nextEndpoint += interval;

                callback();

            }

            // sets asynchronous function at end of state loop, for as long as needed
            timeoutId = setTimeout(wrapper, interval);

            // anonymous function lets you call it by assigning to a variable
            return () => {
                clearTimeout(timeoutId);
            };

        }
