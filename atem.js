// INIT VARIABLES FOR ATEM CONTROL
const { Atem } = require('atem-connection')
const myAtem = new Atem()//{ externalLog: console.log })
var logupdates = false
var tallyUpdateInfo
var { ClientIP } = require('./settings');


// INIT VARIABLES FOR WS & HTML
var app = require('express')()
var http = require('http').createServer(app)
var io = require('socket.io')(http);
var args

try {args = process.argv.slice(2)}
catch{args = ["-z"]}


if (args[0] == "-r") {
	console.log("remote mode started")
}

// START OF WS & HTML PROGRAM

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/remote', function(req, res){
	if (args[0] == "-r") {
		res.sendFile(__dirname + '/remote.html');
	}
});
  
http.listen(80, function(){
	console.log('HTML server active');
});

io.on('connection', function(socket){
	console.log('client connected');
	if (logupdates == true){
		io.emit('update', [tallyUpdateInfo.programInput, tallyUpdateInfo.previewInput]);
	};
	socket.on('Program', function(msg){
		myAtem.changeProgramInput(msg)
	});
	socket.on('Preview', function(msg){
		myAtem.changePreviewInput(msg)
	});
	socket.on('dsk', function(){
		myAtem.setDownstreamKeyFillSource(3)
		myAtem.setDownstreamKeyCutSource(4)
		myAtem.setDownstreamKeyGeneralProperties(preMultiply = true)
		myAtem.autoDownstreamKey()
		console.log("dsk");
	});
	socket.on('cut', function(){
		myAtem.cut();
	});
	socket.on('fade', function(){
		myAtem.autoTransition()
	});
	socket.on('disconnect', function(){
	  console.log('client disconnected');
	});
});


// START OF ATEM PROGRAM

myAtem.connect(ClientIP)

myAtem.on('connected', () => {
	//myAtem.changeProgramInput(2).then((res) => {
		//console.log(res)
		// ProgramInputCommand {
		// 	flag: 0,
		// 	rawName: 'PrgI',
		// 	mixEffect: 0,
		// 	properties: { source: 3 },
		// 	resolve: [Function],
		// 	reject: [Function] }
	//})
	//console.log(myAtem.state)
	setTimeout(allowLogging,2000);
	myAtem.setUpstreamKeyerOnAir(false, 0, 0)            /////////////// I THINK THIS SHOULD KILL THE IRRITATING KEY 1 THAT KEEPS COMING ON LIKE A DICKHEAD ON BOOT
	myAtem.setTransitionStyle(transitionProperties = { style: 0, selection: 1, nextStyle: 0, nextSelection: 1 })		/////////////// THIS ONE TOO
})

function allowLogging(){
	logupdates = true
	console.log("Logging started")
	console.log("STATE UPDATE")
	tallyUpdateInfo = Object.values(myAtem.state.video.ME)[0]
	console.log("Preview")
	console.log(tallyUpdateInfo.previewInput)
	console.log("Program")
	console.log(tallyUpdateInfo.programInput)
	io.emit('update', [tallyUpdateInfo.programInput, tallyUpdateInfo.previewInput]);
}

myAtem.on('stateChanged', function(err, state) { //UPDATE PROGRAM & PREVIEW
	if (logupdates == true) {
		console.log("STATE UPDATE")
		tallyUpdateInfo = Object.values(myAtem.state.video.ME)[0]
		console.log("Preview")
		console.log(tallyUpdateInfo.previewInput)
		console.log("Program")
		console.log(tallyUpdateInfo.programInput)
		io.emit('update', [tallyUpdateInfo.programInput, tallyUpdateInfo.previewInput]);
	}
})