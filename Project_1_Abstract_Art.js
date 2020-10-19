//this is a project I made that basically takes a sound file and plays it while also having the background and lines indicate the volume of the music
//I used it to visualize a part of Tchaikovsky's 6th Sympohony 4th movement that I think illustrates building up and falling back into silence better than any other musical moment ever
//of course it could be used for anything if you change the file path in the preload function


//import soundtrack (mp3 file I created of a youtube recording of the best moment of Tchaikovsky's 6th symphony movement 4)
let piece;
function preload () {
    //CHANGE THIS FILE PATH IN ORDER TO ADD NEW PIECES!!!!!
    piece = loadSound("Projects/Tchaikovsky_Symphony_6_Pathétique_best_moment.mp3")
}
//initialize control variables 
//loudness of the music
let amplitude;
let intensity;
//the height of the line (based on the loudness/intensity of the music at that moment)
let height;
//points of the lines
let point_x;
let point_y;
//heights of the lines
let height_list = new Array();
//different loudness of the music
let intensity_list = new Array();
//basically frameCount but I already used that so I'm using it again
let num_iterations;
//size of canvas, pretty self explanitory
let canvas_size;
//controls the frame rates of both the line and the backround (vis for visual, line for line) works by taking the averages over a few iterations of draw
//larger smoothness = lesser frame rate which can be good becasue the background is super flashy when Vis_smoothness = 1
let Vis_smoothness;
let line_smoothness;
//what gets used to determine the average background color and helps weed out the sudden flashes 
let average_intensity;
function setup() {
    //variable that can be altered to change the size of the canvas
    canvas_size = 700
    createCanvas(canvas_size,canvas_size)
    height = 0
    point_x = 0
    point_y = 0
    num_iterations = 0
    //I found the optimal values of smoothness to be 5, but feel free to experiment with them
    Vis_smoothness = 10
    line_smoothness = 5
    average_intensity = 0
    //play the piece
    piece.play();
    //creates a new record of how loud the piece is (the amplitude)
    amplitude = new p5.Amplitude()
    //ensures that the amplitude will be a value between 0 and 1 (useful later)
    amplitude.toggleNormalize(true)
    intensity = 0
}
//variables I use in for loops
let i;
let j;
//where the magic happens
function draw() {
    //returns a value between 0 and 270 which can be used to for the colors (I did 270 instead of 255 because brighter is better for drama)
    intensity = amplitude.getLevel()*270
    intensity_list.push(intensity)
    //uses the above color/intensity values to make an average value of Vis_smoothness iterations
    //this helps prevent sudden epileptic flashes which is really nice
    if (num_iterations > Vis_smoothness-1) {
        average_intensity = 0
        for (j = 0; j < Vis_smoothness;j++) {
            average_intensity += (intensity_list[num_iterations-j])
        }
        average_intensity = average_intensity/Vis_smoothness
        //this sets the background color based on the average volume level of the music over some time
        //you could do other background colors for different pieces, I did red because it plus black suits this piece exceptionally well
        background(average_intensity, 0, 0)
    }
    //this sets the y values of each line to be proportional to the music amplitude and the canvas size
    height = amplitude.getLevel()*canvas_size
    stroke(255)
    //point_x is used to reset the frameCount and height_list variables when the lines go off the side of the canvas
    //that means they resume from the left side of the cavas
    point_x = frameCount
    point_y = canvas_size-height
    height_list.push(point_y)
    if (point_x > canvas_size) {
        frameCount = 0
        height_list = new Array()
    }
    //this draws the white lines based on the line_smoothness, canvas_size, and heights in the height_list (aka how loud the music is at different points)
    if (frameCount > line_smoothness-1) {
            for (i = 0; i < (canvas_size-1);) {
                line(i,height_list[i],i+line_smoothness,height_list[i+line_smoothness]);
                i += line_smoothness
            }
        }
    num_iterations += 1
}


//This was all stuff that I WAS gonna use to make a legit modern art piece that would be pretty simple
//As you could probably tell I went a little overboard. Just a tad. 
//If you didn't know we were just supposed to make ellipses and stuff. 
//Like the most complex thing was gonna be using MouseX and MouseY
//Oops??? Whatever. 

//for (along_x=0;along_x != 400;) {
//    line(0,0,along_x,y)
//    line(400,0,along_x,y)
//    line(0,400,along_x,y)
//    line(400,400,along_x,y)
//    along_x += 100
//}   
//for (along_y=0;along_y != 400;) {
//    line(0,0,x,along_y)
//    line(400,0,x,along_y)
//    line(0,400,x,along_y)
//    line(400,400,x,along_y)
//    along_y += 100
//}
//let mySound;
//function preload () {
//    soundFormats('mp3')
//    mySound = loadSound('Projects/Tchaikovsky_Symphony_6_Pathétique_best_moment.mp3')
//}

//strokeWeight(1)
//    if (mouseX%10 == 0 && mouseY%10 == 0) {
//        if (mouseIsPressed) {
//            line(0,0,mouseX,mouseY)
//            line(400,0,mouseX,mouseY)
//            line(0,400,mouseX,mouseY)
//            line(400,400,mouseX,mouseY)
//        }
//    }
//
//    fill(255,0,0)
//    stroke(255,0,0)
//    strokeWeight(0.1)
//    for (;x != 400;) {
//        line(x,0,x,400)
//        line(0,y,400,y)
//        for (along_x=0;along_x != 400;) {
//            line(0,0,along_x,y)
//            line(400,0,along_x,y)
//            line(0,400,along_x,y)
//            line(400,400,along_x,y)
//           along_x += 10
//        }
//        x += 10
//        y += 10
//    }