import express from "express";
import express_session from "express-session";
import ngrok from "ngrok";
import * as https from "https";
import * as http from "http";
import fs from "fs";
import { loadConfig } from "../config";

const nodeConfig = loadConfig();

const privkey = fs.readFileSync(
  "/etc/letsencrypt/live/node-cloud.ddnsfree.com/privkey.pem",
  "utf8"
);
const certificate = fs.readFileSync(
  "/etc/letsencrypt/live/node-cloud.ddnsfree.com/cert.pem",
  "utf8"
);
const ca = fs.readFileSync(
  "/etc/letsencrypt/live/node-cloud.ddnsfree.com/chain.pem",
  "utf8"
);



const credentials = {
  key: privkey,
  cert: certificate,
  ca: ca,
};

const app: express.Application = express();
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(3000, () => {
  console.log("http listening on 3000");
});

httpsServer.listen(3003, () => {
  console.log("https listening on 3003");
});



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  express_session({
    saveUninitialized: false,
    secret: "df4t3g8rybuib",
    resave: false,
  })
);

// end middleware

app.get("/", (req, res) => {
  console.log(req.body);
  res.status(200).send("hello");
});

app.use(express.static("static"));

