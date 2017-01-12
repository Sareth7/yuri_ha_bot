const Bot = require("./Bot");
const router = require("./routes");
const jobs = require("./jobs");
//const fork = require("child_process").fork;

/*const jobsProcess = fork("./jobs/subprocess.js");
process.on("exit", (code) => {
	jobsProcess.kill();
	console.log(code);
})*/

const MangaBot = new Bot({
	token: process.env.BOT_TOKEN,
	router,
	jobs
});
MangaBot.start();

//const jobsProcess = fork("./jobs/subprocess.js", [MangaBot]);