"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../src/nodes/server");
const peer_node_1 = require("../src/nodes/peer_node");
const config_1 = require("../src/config");
const nodeConfig = config_1.loadConfig("nodeconfig2.json");
const PING_INTERVAL = 1000 * 6;
let interv = undefined;
server_1.startServer(nodeConfig.ngrok_port);
peer_node_1.initNode(nodeConfig);
peer_node_1.delay(10000)
    .then(() => {
    interv = setInterval(() => {
        peer_node_1.updateNode(nodeConfig);
    }, PING_INTERVAL);
})
    .catch((err) => {
    console.log(err);
});
//# sourceMappingURL=test_node2.js.map