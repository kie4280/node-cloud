import firebase from "firebase";
import firebaseui from "firebaseui";

var firebaseConfig = {
  apiKey: "AIzaSyACPSB6wCd1QYqDEvTH7hEqjyeygA5_sE8",
  authDomain: "node-cloud-fcbd4.firebaseapp.com",
  databaseURL: "https://node-cloud-fcbd4-default-rtdb.firebaseio.com",
  projectId: "node-cloud-fcbd4",
  storageBucket: "node-cloud-fcbd4.appspot.com",
  messagingSenderId: "1031166173720",
  appId: "1:1031166173720:web:8d275377a111e4db6d996d",
};
firebase.initializeApp(firebaseConfig);
console.log("user uid", firebase.auth().currentUser);

const ui = new firebaseui.auth.AuthUI(firebase.auth());
firebase
  .auth()
  .setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .catch((err) => {
    console.log(err);
  });

console.log("initialize firebase app");

type NODE = {
  node_name: string;
  url: string;
  status: "online" | "offline" | "maintenance";
  lastSeen: string;
  is_master: boolean;
};

class RealtimeDatabase {
  database: firebase.database.Database;
  private nodes: Array<NODE>;

  constructor() {
    this.database = firebase.database();
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

let database: RealtimeDatabase = null;

function getDatabase() {
  if (database == null) {
    database = new RealtimeDatabase();
  }
  // console.log("user uid", firebase.auth().currentUser.uid);
  return database;
}

export { ui, RealtimeDatabase, NODE, getDatabase };
