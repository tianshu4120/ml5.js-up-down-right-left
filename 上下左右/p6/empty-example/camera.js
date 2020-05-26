let feature1,feature2;
let video;
let value1;
let value2 ;
let trainButton;
let slider1;
let slider2;
let flag1,flag2;

function GetResult1(error, results) {
	if (error) {
		console.error(error);
	} else {
		console.log(results);
		value1 = results;
		fill([255, 0, 0]);
		textSize(30);
	}
}
function GetResult2(error, results) {
	if (error) {
		console.error(error);
	} else {
		console.log(results);
		value2 = results;
		fill([255, 0, 0]);
		textSize(30);
	}
}
function videoReady() {
	console.log('video is ready!');
}

function ModelReady() {
	console.log('Model is ready!');
}

function training1(loss){
	console.log("classifier Loss is:" + loss);
	if (loss == null) {
		flag1 = true;
		predictor1.predict(GetResult1)
	}
}
function training2(loss){
	console.log("classifier Loss is:" + loss);
	if (loss == null) {
		flag2 = true;
		predictor2.predict(GetResult2)
	}
}
function setup() {
	createCanvas(640, 480);
	video = createCapture(VIDEO); //camera capture function
	video.hide();
	background(0);
	feature1 = ml5.featureExtractor('MobileNet', ModelReady);
	feature2 = ml5.featureExtractor('MobileNet', ModelReady);
	predictor1 = feature1.regression(video, videoReady);
	predictor2 = feature2.regression(video, videoReady);


	slider1 = createSlider(0, 1, 0.5, 0.01);
	slider2 = createSlider(0, 1, 0.5, 0.01);
	addButton = createButton('Add');
	addButton.mousePressed(function () {
		predictor1.addImage(slider1.value());
		predictor2.addImage(slider2.value());
	});

	/*slider2 = createSlider(0, 1, 0.5, 0.01);
	slider2.input(function(){
		console.log(slider2.value());
	});
	addButton = createButton('添加垂直');
	addButton.mousePressed(function () {
		predictor.addImage(slider2.value());
	});*/

	trainButton = createButton('train');
	//create button
	trainButton.mousePressed(function(){
		predictor1.train(training1);
		predictor2.train(training2);
		});
}

function draw() {
	background(0);
	image(video,0,0,640,480);
	textSize(30);
	fill(255,0,255);
	if(flag1&&flag2){
		predictor1.predict(GetResult1);
		predictor2.predict(GetResult2);
		rectMode(CENTER);
		fill(255);
		textSize(16);
		text(value1,10,height - 10);
		rect(value1 * width, height * value2, 50, 50);
	}

}
