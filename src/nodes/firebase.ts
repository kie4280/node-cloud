import firebase from "firebase";
import { loadConfig } from "../config";
import admin from "firebase-admin";

const nodeConfig = loadConfig();

export type NODE = {
  node_name: string;
  url: string;
  status: "online" | "offline" | "maintenance";
  lastSeen: string;
  is_master: boolean;
};

export class Firebase {
  app: admin.app.App;
  database: admin.database.Database;
  node_name: string;
  constructor(node_name: string, database_url) {
    this.initialize(database_url);
    this.node_name = node_name;
  }

  private initialize(
    database_url: string,
    serviceAccount: string = "firebase-adminsdk.json"
  ) {
    this.app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: database_url,
    });

    this.database = admin.database(this.app);
  }

  public async getURLs() {
    const r = this.database.ref("nodes");
    const snapshot = await r.get();
    if (snapshot.exists()) {
      const v = snapshot.toJSON();
      return v;
    }
    return undefined;
  }

  public async getNode(name: string) {
    const r = this.database.ref("nodes").child(name);

    return r.toJSON();
  }

  public async nodeCount() {
    const r = await this.database.ref("nodes").get();
    if (!r.exists()) {
      return 0;
    }
    return r.numChildren();
  }

  public async setNode(n: NODE) {
    const r = this.database.ref("nodes").child(this.node_name);

    const res = await r.set(n);
  }
}

function test() {
  const f = new Firebase("node2", nodeConfig.firebase_config.database_url);
  const n: NODE = {
    is_master: true,
    lastSeen: new Date().toUTCString(),
    node_name: "node2",
    status: "online",
    url: "test",
  };
  f.setNode(n)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
  f.nodeCount().then((r) => {
    console.log(r);
  });
}

// test();
