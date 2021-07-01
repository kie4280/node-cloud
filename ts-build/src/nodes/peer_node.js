"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = exports.initNode = exports.updateNode = void 0;
const ngrok_1 = __importDefault(require("ngrok"));
const firebase_1 = require("./firebase");
const axios_1 = __importDefault(require("axios"));
let fireb = undefined;
async function startNetwork(nodeConfig) {
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
    return nodeConfig;
}
async function discoverNodes(nodeConfig) {
    const others = new Array(...fireb.getNodes());
    others.forEach((n, i, obj) => {
        if (n.node_name == nodeConfig.node_name) {
            others.splice(i, 1);
        }
    });
    return others;
}
async function pingNodes(nodes) {
    nodes.forEach(async (n, i, obj) => {
        try {
            const res = await axios_1.default.get(n.url + "/status");
            const status = res.data;
            if (status == 404) {
                const a = n;
                a.status = "offline";
                fireb.setNode(a);
            }
        }
        catch (err) {
            console.log("error at ping peers");
            console.log(err);
        }
    });
}
function updateNode(nodeConfig) {
    discoverNodes(nodeConfig)
        .then((r) => {
        pingNodes(r);
    })
        .then(() => {
        console.log("ping");
    })
        .catch((err) => {
        console.log(err);
    });
}
exports.updateNode = updateNode;
function initNode(nodeConfig) {
    startNetwork(nodeConfig)
        .then(discoverNodes)
        .then((r) => {
        console.log(r);
        return r;
    })
        .then(() => { })
        .catch((err) => {
        console.log(err);
    });
}
exports.initNode = initNode;
function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
exports.delay = delay;
// startServer();
// initNode();
// delay(10000)
//   .then(() => {
//     interv = setInterval(() => {
//       updateNode();
//     }, PING_INTERVAL);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
//# sourceMappingURL=peer_node.js.map