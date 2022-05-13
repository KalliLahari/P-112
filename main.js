Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:100
});

camera=document.getElementById("camera");


Webcam.attach(camera);

function take_pic(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="image" src='+ data_uri+'>';
    });
}

console.log("ml5 version:",ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/kI4zeAjJx/model.json",modelLoaded);

function modelLoaded(){
    console.log("modelLoaded");
}

function check1(){
    img=document.getElementById("image");
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }

    else{
        console.log(results);
        document.getElementById("result_name1").innerHTML=results[0].label;

        gesture=results[0].label;

        to_speak="";

        if(results[0].label=="Best"){
            to_speak="All the Best";
            document.getElementById("result_emoji1").innerHTML="&#128077;";
        }
        
        if(results[0].label=="Victory"){
            to_speak="This is a marvelous victory";
            document.getElementById("result_emoji1").innerHTML="&#9996;";
        }
        
        if(results[0].label=="Amazing"){
            to_speak="This is looking amazing";
            document.getElementById("result_emoji1").innerHTML="&#128076;";
        }
        speak();

    }
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data=to_speak;
    var utterThis=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}


