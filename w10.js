//Defining Variables
let song;
let img;
let fft; //Fast Fourier Transform object for audio visualisation
let button; //Play and pause buttons
let sizeSlider, colorSlider;   

// Preloading music and image assets
function preload() {
    song = loadSound('sample-visualisation.mp3');
    img = loadImage('16 Reasons To Love (And Respect) The Ocean.jpeg');
}


function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    colorMode(HSL); //Setting HSL color mode
    song.play();
    fft = new p5.FFT(0.8, 256); //Initializing the FFT object for audio analysis

    //Creating and positioning the PLAY/PAUSE button
    button = createButton('PLAY / PAUSE');
    button.id('playButton');
    let buttonY = (height/2) + 270;
    button.position(width/2 - button.width/2, buttonY);

    // Create sliders for user control size and color 
    let sliderYOffset = 100; // Set the vertical offset for the first slider
    sizeSlider = createSlider(1, 50, 8, 1); //Set the size slider range from 1 to 50 and default value of 8
    sizeSlider.position(width/2 - sizeSlider.width/2, buttonY + sliderYOffset); //Place it below the button
    
    sliderYOffset += 70;
    colorSlider = createSlider(50, 100, 75, 1); //Set the color slider range from 50%-100% and defult value of  75%
    colorSlider.position(width/2-colorSlider.width/2, buttonY + sliderYOffset); // Place it below the size slider

    //The togglePlay function is called when the button is clicked.
    button.mousePressed(togglePlay);    
}

//Toggle between playing and pausing the song
function togglePlay() {
    if (song.isPlaying()) {
        song.stop();
    } else {
        song.play();
    }
}

function draw() {
    image(img, 0, 0, width, height); // Display the background image to cover the canvas
    
    // Display the lables for size and color control
    textSize(23);
    fill(255);
    text("Change Size", sizeSlider.x + sizeSlider.width + 12, sizeSlider.y + 16);
    text("Change Color", colorSlider.x + colorSlider.width + 12, colorSlider.y + 16);

    //Analyzing the song's audio frequencies
    let spectrum = fft.analyze();
    noStroke();
    translate(width / 2, height / 2); //Move the drawing origin to the centre of the screen
    
    //Capture user input for visualization controls
    let size = sizeSlider.value();
    let hueValue = colorSlider.value();

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
            let luminanceValue = colorSlider.value();
            fill(180, 100, luminanceValue, amp);  // Hue is set to 180, Saturation is set to 100% and Luminance is determined by the slider
            ellipse(x, y, size);
            pop(); //Restore the previous state of the canvas
        }   
    }
}

