"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const https = __importStar(require("https"));
const http = __importStar(require("http"));
const fs_1 = __importDefault(require("fs"));
const config_1 = require("../config");
const nodeConfig = config_1.loadConfig();
const privkey = fs_1.default.readFileSync("/etc/letsencrypt/live/node-cloud.ddnsfree.com/privkey.pem", "utf8");
const certificate = fs_1.default.readFileSync("/etc/letsencrypt/live/node-cloud.ddnsfree.com/cert.pem", "utf8");
const ca = fs_1.default.readFileSync("/etc/letsencrypt/live/node-cloud.ddnsfree.com/chain.pem", "utf8");
const credentials = {
    key: privkey,
    cert: certificate,
    ca: ca,
};
const app = express_1.default();
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
httpServer.listen(3000, () => {
    console.log("http listening on 3000");
});
httpsServer.listen(3003, () => {
    console.log("https listening on 3003");
});
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(express_session_1.default({
    saveUninitialized: false,
    secret: "df4t3g8rybuib",
    resave: false,
}));
// end middleware
app.get("/", (req, res) => {
    console.log(req.body);
    res.status(200).send("hello");
});
app.use(express_1.default.static("static"));
//# sourceMappingURL=server.js.map