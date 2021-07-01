import { startServer } from "../src/nodes/server";
import { delay, initNode, updateNode } from "../src/nodes/peer_node";
import { loadConfig } from "../src/config";

const nodeConfig = loadConfig("nodeconfig.json");
const PING_INTERVAL = 1000 * 6;
let interv: NodeJS.Timeout = undefined;

startServer(nodeConfig.ngrok_port);

initNode(nodeConfig);

delay(10000)
  .then(() => {
    interv = setInterval(() => {
      updateNode(nodeConfig);
    }, PING_INTERVAL);
  })
  .catch((err) => {
    console.log(err);
  });
