const express = require("express");
const fs = require("fs");
const path = require("path");
const port = 8000;

const app = express();
app.set("view engine", "ejs");
app.set("views", __dirname + "/");
app.use(express.static(path.join(__dirname, "./public")));
const favicon = require("serve-favicon");
app.use(favicon(path.join(__dirname, "./public", "favicon.ico")));

// global state variables
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

app.listen(port, () => console.log(`Callback app listening at http://localhost:${port}`));