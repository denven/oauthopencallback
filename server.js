const port = 8080; // http port
const securePort = 443; // https port
const http = require("http");
const https = require("https");

const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/");
app.use(express.static(path.join(__dirname, "./public")));
const favicon = require("serve-favicon");
app.use(favicon(path.join(__dirname, "./public", "favicon.ico")));

// global statistics data variables
let gVisitStat = 0;
let gEpocHours = parseInt(Date.now() / 3600);

const writeVisitStat = () => {
	gVisitStat.lastUpadted = Date.now();
	fs.writeFile("./stat.json", JSON.stringify(gVisitStat, null, 4), () => {});
};

try {
	gVisitStat = JSON.parse(fs.readFileSync(`./stat.json`));
} catch (error) {
	gVisitStat = { count: 0, since: new Date().toISOString().slice(0, 10), lastUpadted: Date.now() };
	fs.writeFile("./stat.json", JSON.stringify(gVisitStat, null, 4), () => {});
}

// routes
app.get("/callback", (req, res) => {
	gVisitStat.count++;
	const curHours = parseInt(Date.now() / 3600);
	if (curHours > gEpocHours) {
		gEpocHours = curHours;
		writeVisitStat();
	}
	res.render("index", gVisitStat);
});

app.get("/", (req, res) => {
	res.render("index", gVisitStat);
});

// creat http and https servers
const httpServer = http.createServer(app);
httpServer.listen(port, () => {
	console.log(`Callback app started to listen at http://localhost:${port}`);
	console.log(`Your callback URL is http://localhost:${port}/callback`);
});

try {
	// SSL certificate files are required for HTTPS connections
	const cert = {
		key: fs.readFileSync(__dirname + "/cert/key.pem"),
		cert: fs.readFileSync(__dirname + "/cert/cert.pem"),
	};
	const httpsServer = https.createServer(cert, app);
	httpsServer.listen(securePort, () => {
		console.log(`Callback app started to listen at https://localhost:${securePort}`);
		console.log(`Your callback URL is https://localhost:${securePort}/callback`);
	});
} catch (error) {
	console.log("Cannot create the HTTPS server because the SSL certificates were not found");
}