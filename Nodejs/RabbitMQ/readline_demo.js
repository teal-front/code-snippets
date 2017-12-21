var readline = require('readline')

var read = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

function waitCommand (ask) {

	return new Promise(function (resolve) {
		read.question(ask, function (number) {
			resolve(number)
		})
	})
}

function loopCommand (ask, cb) {
	waitCommand(ask).then(function (msg) {
		cb(msg)
		loopCommand (ask)
	})
}

exports.loopCommand = loopCommand
exports.waitCommand = waitCommand
