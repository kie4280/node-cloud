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
    this.nodes = [];
    setInterval(this.pingNodes.bind(this), 5000);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.database = firebase.database();
        this.database.ref("nodes").on("value", (snap) => {
          if (snap.exists()) {
            this.nodes = new Array<NODE>();
            snap.forEach((sn) => {
              this.nodes = this.nodes.concat([sn.toJSON() as NODE]);
            });
          }
        });
      } else {
        if (this.database) {
          this.database.ref("nodes").off("value");
          this.database = null;
        }
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

  private pingNodes() {
    this.nodes.forEach((v) => {
      if (v.status == "online") {
        fetch(`${v.url}/status`, {
          method: "GET",
          mode: "cors",
        })
          .then((res) => {
            if (!res.ok) {
              const vv = Object.assign({}, v);
              vv.lastSeen = new Date().toUTCString();
              vv.status = "offline";
              vv.url = "";
              getDatabase().setNode(vv);
            }
          })
          .catch((err) => {
            console.log(err);
            const vv = Object.assign({}, v);
            vv.lastSeen = new Date().toUTCString();
            vv.status = "offline";
            vv.url = "";
            getDatabase().setNode(vv);
          });
      }
    });
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
