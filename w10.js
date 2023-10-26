let song;
let img;
let fft;
let button;

function preload() {
    song = loadSound('sample-visualisation.mp3');
    img = loadImage('16 Reasons To Love (And Respect) The Ocean.jpeg');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    song.play();
    fft = new p5.FFT(0.8, 256);

    button = createButton('PLAY / PAUSE');
    button.id('playButton');
    let buttonY = (height/2) + 300;
    button.position(width/2 - button.width/2, buttonY);
    button.mousePressed(togglePlay);
}

function togglePlay() {
    if (song.isPlaying()) {
        song.stop();
    } else {
        song.play();
    }
}

function draw() {
    image(img, 0, 0, width, height);
    
    let spectrum = fft.analyze();
    noStroke();
    translate(width / 2, height / 2);
    
    for (let i = 0; i < spectrum.length; i ++) {
        let angle = map(i, 0, spectrum.length, 0, 360);
        let amp = spectrum[i];
        let r = map(amp, 0, 256, 20, 200);
        let x = r * cos(angle);
        let y = r * sin(angle);
        
        // 对每个点进行多次旋转以创建万花筒效果
        for (let j = 0; j < 360; j += 37) {  // 8个重复部分
            push();
            rotate(j);
            fill(255, 255, 255, amp);  // 使用HSL颜色
            ellipse(x, y, 8);
            pop();
        }   
    }
}

