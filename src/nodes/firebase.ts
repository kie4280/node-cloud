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
  private nodes: Array<NODE>;

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
    this.database.ref("nodes").on("value", (snap) => {
      if (!snap.exists()) {
        this.nodes = [];
      } else {
        this.nodes = new Array<NODE>();
        snap.forEach((sn) => {
          this.nodes = this.nodes.concat([sn.toJSON() as NODE]);
        });
      }
    });
  }

  public getNodes(): Array<NODE> {
    const arr = Array<NODE>(...this.nodes);
    return arr;
  }

  public nodeCount() {
    return this.nodes.length;
  }

  public async setNode(n: NODE) {
    const r = this.database.ref("nodes").child(n.node_name);
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
  f.nodeCount();
}

// test();
