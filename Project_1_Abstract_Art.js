//this is a project I made that basically takes a sound file and plays it while also having the background and lines indicate the volume of the music
//I used it to visualize a part of Tchaikovsky's 6th Sympohony 4th movement that I think illustrates building up and falling back into silence better than any other musical moment ever
//of course it could be used for anything if you change the file path in the preload function
//Also keep in mind that p5 needs that file path in the index.html file in order to work so be sure to fix that


//import soundtrack (mp3 file I created of a youtube recording of the best moment of Tchaikovsky's 6th symphony movement 4)
let piece;
function preload () {
    //CHANGE THIS FILE PATH IN ORDER TO ADD NEW PIECES!!!!!
    piece = loadSound("Tchaikovsky_Symphony_6_Pathétique_best_moment.mp3")
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
let canvas_x;
let canvas_y;
//controls the frame rates of both the line and the backround (vis for visual, line for line) works by taking the averages over a few iterations of draw
//larger smoothness = lesser frame rate which can be good becasue the background is super flashy when Vis_smoothness = 1
let Vis_smoothness;
let line_smoothness;
//what gets used to determine the average background color and helps weed out the sudden flashes 
let average_intensity;
//needed to do this for random stuff
let random_RedYellow;
function setup() {
    //needed a random thing so that'll be the color (ps. red is definitely the best one for this piece)
    random_RedYellow = Math.floor(random(0,2))
    //variable that can be altered to change the size of the canvas
    //I have it as these because it just barely filles up the chrome window I'm using
    canvas_x = 750
    canvas_y = 750
    createCanvas(canvas_x,canvas_y)
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
        console.log(average_intensity, random_RedYellow)
        //this sets the background color based on the average volume level of the music over some time
        //you could do other background colors for different pieces, I did red because it plus black suits this piece exceptionally well 
        //(now I'm making it random so it can be yellow when loud)
        if (average_intensity > 200) {
            if (random_RedYellow == 0) {
                background(average_intensity,0,0)
            } else if (random_RedYellow == 1) {
                background(average_intensity, average_intensity, 0)
            }
        } else {
            background(average_intensity,0,0)
        }
    }
    //this sets the y values of each line to be proportional to the music amplitude and the canvas y value and then makes a list of those y values
    height = amplitude.getLevel()*canvas_y
    point_y = canvas_y-height
    height_list.push(point_y)
    stroke(255)
    //point_x is used to reset the frameCount and height_list variables when the lines go off the side of the canvas
    //that means they resume from the left side of the cavas
    point_x = frameCount
    if (point_x > canvas_x) {
        frameCount = 0
        height_list = new Array()
    }
    //this draws the white lines based on the line_smoothness, canvas_size, and heights in the height_list (aka how loud the music is at different points)
    if (frameCount > line_smoothness-1) {
            for (i = 0; i < (canvas_x-1);) {
                line(i,height_list[i],i+line_smoothness,height_list[i+line_smoothness])
                i += line_smoothness
            }
        }
    num_iterations += 1
}


//This was all stuff that I WAS gonna use to make a legit modern art piece that would be pretty simple
//As you could probably tell I went a little overboard. Just a tad. 
//If you didn't know we were just supposed to make ellipses and stuff. 
//Like the most complex thing was gonna be using MouseX and MouseY
//Oops???