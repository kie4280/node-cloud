"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ngrok_1 = __importDefault(require("ngrok"));
const config_1 = require("../config");
const firebase_1 = require("./firebase");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const nodeConfig = config_1.loadConfig();
let fireb = undefined;
async function startNetwork() {
    const url = await ngrok_1.default.connect({
        region: nodeConfig.ngrok_region,
        addr: "http://localhost:" + nodeConfig.ngrok_port,
        authtoken: nodeConfig.ngrok_authkey ? nodeConfig.ngrok_authkey : "",
    });
    console.log("Network started on " + url);
    const n = {
        is_master: nodeConfig.is_master_node,
        lastSeen: new Date().toUTCString(),
        status: "online",
        node_name: nodeConfig.node_name,
        url: url,
    };
    fireb = new firebase_1.Firebase(nodeConfig.node_name, nodeConfig.firebase_config.database_url);
    await fireb.setNode(n);
}
const app = express_1.default();
app.listen(nodeConfig.ngrok_port, () => {
    console.log("http listening on " + nodeConfig.ngrok_port);
});
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(express_session_1.default({
    saveUninitialized: false,
    secret: "df4t3g8rybuib",
    resave: false,
}));
// end middleware
app.get("/", (req, res) => {
    console.log(req.body);
    res.status(200).send("hello");
});
app.use(express_1.default.static("static"));
startNetwork().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=peer_node.js.map