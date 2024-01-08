var pulso_esquerdoY=0
var pulso_esquerdoX=0
var pulso_direitoY=0
var pulso_direitoX=0
var music=""
function preload(){
    music=loadSound("Naruto_e_Kurama.mp3")
}
function setup(){
    canvas=createCanvas(600,500)
    canvas.center()
    video=createCapture(VIDEO)
    video.hide()
    poseNet=ml5.poseNet(video,modelload)
    poseNet.on("pose",gotPose)
}
function draw(){
    image(video,0,0,600,500)
    fill("#FF0000")
    stroke("#FF0000")
    circle(pulso_esquerdoX,pulso_esquerdoY,30)
    volume=Number(floor(pulso_esquerdoY)/500)
    document.getElementById("volume").innerHTML="volume= "+volume
    music.setVolume(volume)
    circle(pulso_direitoX,pulso_direitoY,30)
    if(pulso_direitoY>0 && pulso_direitoY<=100){
        document.getElementById("speed").innerHTML="0.5x"
        music.rate(0.5)
    }
    else if(pulso_direitoY>100 && pulso_direitoY<=200){
        document.getElementById("speed").innerHTML="1x"
        music.rate(1)
    }else if(pulso_direitoY>200 && pulso_direitoY<=300){
        document.getElementById("speed").innerHTML="1.5x"
        music.rate(1.5)
    }else if(pulso_direitoY>300 && pulso_direitoY<=400){
        document.getElementById("speed").innerHTML="2x"
        music.rate(2)
    }
    else if(pulso_direitoY>400 && pulso_direitoY<=500){
        document.getElementById("speed").innerHTML="2.5x"
        music.rate(2.5)
    }
}
function play(){
    music.play()
    music.setVolume(1)
    music.rate(1)
}
function modelload(){
    console.log("modelo carregado")
}
function gotPose(results){
    if(results.length>0){
        console.log(results)
        pulso_direitoX=results[0].pose.rightWrist.x
        pulso_direitoY=results[0].pose.rightWrist.y
        pulso_esquerdoX=results[0].pose.leftWrist.x
        pulso_esquerdoY=results[0].pose.leftWrist.y
    }
}