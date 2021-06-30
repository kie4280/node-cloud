"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const nodeConfig = config_1.loadConfig();
class Firebase {
    constructor(name, database_url) {
        this.initialize(database_url);
        this.node_name = name;
    }
    initialize(database_url, serviceAccount = "firebase-adminsdk.json") {
        this.app = firebase_admin_1.default.initializeApp({
            credential: firebase_admin_1.default.credential.cert(serviceAccount),
            databaseURL: database_url,
        });
        this.database = firebase_admin_1.default.database(this.app);
    }
    async getURLs() {
        const r = this.database.ref("nodes");
        const snapshot = await r.get();
        if (snapshot.exists()) {
            const v = snapshot.toJSON();
            return v;
        }
        return undefined;
    }
    async getNode(name) {
        const r = this.database.ref("nodes").child(name);
        return r.toJSON();
    }
    async nodeCount() {
        const r = await this.database.ref("nodes").get();
        if (!r.exists()) {
            return 0;
        }
        return r.numChildren();
    }
    async setNode(n) {
        const r = this.database.ref("nodes").child(this.node_name);
        const res = await r.set(n);
    }
}
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
    f.nodeCount().then((r) => {
        console.log(r);
    });
}
// test();
//# sourceMappingURL=firebase.js.map