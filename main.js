objects = [];
objectStatus = "";
itemFound = false;

function preload() {

}

function setup() {

    canvas = createCanvas(480, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function draw() {

    image(video, 0, 0, 480, 380);

    if (objectStatus != "") {
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {

            confidence = floor(objects[i].confidence) * 100;
            fill("#FF0000");
            text(objects[i].label + " " + confidence + "%", objects[i].x, objects[i].y);
            noFill()
            stroke("#FF0000");
            rect(objects[i].width, objects[i].height, objects[i].width, objects[i].height);
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            if (document.getElementById("objectName").value == objects[i].label) {
                document.getElementById("itemFound").innerHTML = "Item found";
                if (itemFound == false) {
                    video.stop();
                    synth = window.speechSynthesis;
                    itemFound = true;
                    utterThis = new SpeechSynthesisUtterance(objects[i].label + " found");
                    synth.speak(utterThis);
                }
            } else {
                document.getElementById("itemFound").innerHTML = "Item not found";
            }
        }
    }
}
function start() {

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);

    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {

    console.log("model loaded!");
    objectStatus = true;
}

function gotResults(error, results) {

    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}