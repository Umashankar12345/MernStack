let hours = 0;
let minute = 0;
 let seconds = 0;
let milliseconds = 0;
 let timer = null;
 let isRunning = false;

 const display = document.getElementById("display");
 const startbutton = document.getElementById("startbutton");
 const  endbutton = document.getElementById("endbutton");
//  const lapsContainer = document.getElementById("laps");


 function start(){
    if(!isRunning){
        isRunning = true;
        startbutton.disabled = true;
        endbutton.disabled = false;

        timer = setInterval(function() {
                    milliseconds += 10;
                    
                    if (milliseconds >= 1000) {
                        seconds++;
                        milliseconds = 0;
                    }
                    
                    if (seconds >= 60) {
                        minute++;
                        seconds = 0;
                    }
                    
                    if (minute >= 60) {
                        hours++;
                        minute = 0;
                    }
                    
                    updateDisplay();
                }, 10);
            }
        }

          
        function end() {
            if (isRunning) {
                isRunning = false;
                startbutton.disabled = false;
                endbutton.disabled = true;
                clearInterval(timer);
            }
        }
        
        function reset() {
            end();
            hours = 0;
            minute = 0;
            seconds = 0;
            milliseconds = 0;
            updateDisplay();
            lapsContainer.innerHTML = '';
        }
       
  
        function updateDisplay() {
            // Format numbers to always show 2 digits
            const formattedHours = hours.toString().padStart(2, '0');
            const formattedMinute = minute.toString().padStart(2, '0');
            const formattedSeconds = seconds.toString().padStart(2, '0');
            const formattedMilliseconds = Math.floor(milliseconds / 10).toString().padStart(2, '0');
            
            display.textContent = `${formattedHours}:${formattedMinute}:${formattedSeconds}.${formattedMilliseconds}`;
        }