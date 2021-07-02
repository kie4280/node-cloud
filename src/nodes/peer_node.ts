import ngrok from "ngrok";
import { loadConfig, NODE_CONFIG } from "../config";
import { Firebase, NODE } from "./firebase";
import axios from "axios";

let fireb: Firebase = undefined;

async function startNetwork(nodeConfig: NODE_CONFIG) {
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
  return nodeConfig;
}

async function discoverNodes(nodeConfig: NODE_CONFIG): Promise<Array<NODE>> {
  const others = new Array(...fireb.getNodes());
  others.forEach((n, i, obj) => {
    if (n.node_name == nodeConfig.node_name) {
      others.splice(i, 1);
    }
  });

  return others;
}

async function pingNodes(nodes: Array<NODE>) {
  nodes.forEach(async (n, i, obj) => {
    try {
      const res = await axios.get(n.url + "/status");
      const status = res.data;
      if (status == 404) {
        const a = n;
        a.status = "offline";
        fireb.setNode(a);
      }
    } catch (err) {
      console.log("error at ping peers");
      console.log(err);
    }
  });
}

function updateNode(nodeConfig: NODE_CONFIG) {
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

function initNode(nodeConfig: NODE_CONFIG) {
  startNetwork(nodeConfig)
    .then(discoverNodes)
    .then((r) => {
      console.log(r);
      return r;
    })
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
}

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

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

export { delay, initNode, updateNode };
