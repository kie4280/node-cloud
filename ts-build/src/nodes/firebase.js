"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Firebase = void 0;
const config_1 = require("../config");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const nodeConfig = config_1.loadConfig();
class Firebase {
    constructor(node_name, database_url) {
        this.initialize(database_url);
        this.node_name = node_name;
    }
    initialize(database_url, serviceAccount = "firebase-adminsdk.json") {
        this.app = firebase_admin_1.default.initializeApp({
            credential: firebase_admin_1.default.credential.cert(serviceAccount),
            databaseURL: database_url,
        });
        this.database = firebase_admin_1.default.database(this.app);
        this.database.ref("nodes").on("value", (snap) => {
            if (!snap.exists()) {
                this.nodes = [];
            }
            else {
                this.nodes = new Array();
                snap.forEach((sn) => {
                    this.nodes = this.nodes.concat([sn.toJSON()]);
                });
            }
        });
    }
    getNodes() {
        const arr = Array(...this.nodes);
        return arr;
    }
    nodeCount() {
        return this.nodes.length;
    }
    async setNode(n) {
        const r = this.database.ref("nodes").child(n.node_name);
        const res = await r.set(n);
    }
}
exports.Firebase = Firebase;
function test() {
    const f = new Firebase("node2", nodeConfig.firebase_config.database_url);
    const n = {
        is_master: true,
        lastSeen: new Date().toUTCString(),
        node_name: "node2",
        status: "online",
        url: "test",
    };
    f.setNode(n)
        .then(() => { })
        .catch((err) => {
        console.log(err);
    });
    f.nodeCount();
}
// test();
//# sourceMappingURL=firebase.js.map