"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const app = express_1.default();
function startServer(port) {
    app.listen(port, () => {
        console.log("http listening on " + port);
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
    app.get("/status", (req, res) => {
        res.status(200).send({ status: "alive" });
    });
    app.use(express_1.default.static("static"));
}
exports.startServer = startServer;
//# sourceMappingURL=server.js.map