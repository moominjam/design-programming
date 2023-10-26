//Defining Variables
let song;
let img;
let fft; //Fast Fourier Transform objects for audio visualisation
let button; //Play and pause buttons

// Add in music and images before you start
function preload() {
    song = loadSound('sample-visualisation.mp3');
    img = loadImage('16 Reasons To Love (And Respect) The Ocean.jpeg');
}


function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    song.play();
    fft = new p5.FFT(0.8, 256); //Initializing the FFT object for audio analysis

    //Creating and positioning the PLAY/PAUSE button
    button = createButton('PLAY / PAUSE');
    button.id('playButton');
    let buttonY = (height/2) + 300;
    button.position(width/2 - button.width/2, buttonY);

    //The togglePlay function is called when the button is clicked.
    button.mousePressed(togglePlay);
}

//Toggle the play and pause state of the song
function togglePlay() {
    if (song.isPlaying()) {
        song.stop();
    } else {
        song.play();
    }
}

function draw() {
    image(img, 0, 0, width, height); //Drawing background images
    
    //Analyzing the song's audio frequencies
    let spectrum = fft.analyze();
    noStroke();
    translate(width / 2, height / 2); //Move the drawing origin to the centre of the screen
    
    //Looping through the spectrum to generate the visual patterns
    for (let i = 0; i < spectrum.length; i ++) {
        let angle = map(i, 0, spectrum.length, 0, 360);//Mapping Spectrum Data to Angles
        let amp = spectrum[i];
        let r = map(amp, 0, 256, 20, 200); //Mapping spectrum data to radius
        // Calculate x and y coordinates
        let x = r * cos(angle);
        let y = r * sin(angle);
        
        // Rotate each point multiple times to create a kaleidoscope effect
        for (let j = 0; j < 360; j += 37) {  
            push();
            rotate(j);
            fill(255, 255, 255, amp);  // Setting the kaleidoscope colour with HSL color
            ellipse(x, y, 8);
            pop(); //Restore the previous state of the canvas
        }   
    }
}

