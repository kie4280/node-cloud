import ngrok from "ngrok";
import { loadConfig } from "../config";
import { Firebase, NODE } from "./firebase";
import express from "express";
import express_session from "express-session";

const nodeConfig = loadConfig();
let fireb: Firebase = undefined;

async function startNetwork() {
  const url = await ngrok.connect({
    region: nodeConfig.ngrok_region,
    addr: "http://localhost:" + nodeConfig.ngrok_port,
    authtoken: nodeConfig.ngrok_authkey ? nodeConfig.ngrok_authkey : "",
  });
  console.log("Network started on " + url);
  const n: NODE = {
    is_master: nodeConfig.is_master_node,
    lastSeen: new Date().toUTCString(),
    status: "online",
    node_name: nodeConfig.node_name,
    url: url,
  };
  fireb = new Firebase(
    nodeConfig.node_name,
    nodeConfig.firebase_config.database_url
  );
  await fireb.setNode(n);
}

const app: express.Application = express();

app.listen(nodeConfig.ngrok_port, () => {
  console.log("http listening on " + nodeConfig.ngrok_port);
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

startNetwork().catch((err) => {
  console.log(err);
});
