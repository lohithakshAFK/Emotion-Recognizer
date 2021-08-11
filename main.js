Webcam.set({
    height:300,
    width:350,
    image_format:"png",
    png_quality:90
}
);
camera = document.getElementById("camera");
Webcam.attach("camera");

prediction_1 = "";
prediction_2 = "";

function snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="img_captured" src="'+data_uri+'">';
    });
}

console.log("ml5 version", ml5.version);
classify = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/SjPAzb6r7/model.json", modelLoaded);
function modelLoaded(){
    console.log("model Loaded");
}

function speak(){
    var synthesis = window.speechSynthesis;
    speak_data_1 = "the first prediction is" + prediction_1;
    speak_data_2 = "the second prediction is" + prediction_2;
    Utterthis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synthesis.speak(Utterthis);
}

function check(){
    image = document.getElementById("img_captured");
    classify.classify(image, gotResult);
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
    document.getElementById("result_emotion_name").innerHTML = results[0].label;
    document.getElementById("result_emotion_name2").innerHTML = results[1].label;
    prediction_1 = results[0].label;
    prediction_2 = results[1].label;
    speak();
    if(results[0].label == "Happy"){
        document.getElementById("result_emoji_pic").innerHTML = "&#128512;";
    }
    if(results[0].label == "Sad"){
        document.getElementById("result_emoji_pic").innerHTML = "&#128546;";
    }
    if(results[0].label == "Angry"){
        document.getElementById("result_emoji_pic").innerHTML = "&#128545;";
    }
    if(results[1].label == "Happy"){
        document.getElementById("result_emoji_pic2").innerHTML = "&#128512;";
    }
    if(results[1].label == "Sad"){
        document.getElementById("result_emoji_pic2").innerHTML = "&#128546;";
    }
    if(results[1].label == "Angry"){
        document.getElementById("result_emoji_pic2").innerHTML = "&#128545";
    }
    }
}