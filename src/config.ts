import fs from "fs";

type NODE_CONFIG = {
  is_master_node: boolean;
  ngrok_authkey?: string;
  ngrok_region: any | string;
  ngrok_port: number;
  node_name: string;
  firebase_config: {
    database_url: string;
  };
};

function loadConfig(filename: string = "nodeconfig.json"): NODE_CONFIG {
  const nodeConfig: NODE_CONFIG = JSON.parse(
    fs.readFileSync(filename).toString()
  );
  return nodeConfig;
}

export { NODE_CONFIG, loadConfig };
