"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pcloud_sdk_js_1 = __importDefault(require("pcloud-sdk-js"));
const promises_1 = __importDefault(require("fs/promises"));
const url_1 = __importDefault(require("url"));
const prompt_sync_1 = __importDefault(require("prompt-sync"));
async function readCredentials(file = "pcloud_credentials.json") {
    const cred = JSON.parse((await promises_1.default.readFile(file)).toString());
    return cred;
}
class PCloud {
    constructor() { }
    async auth(code, cred) {
        this.cred = cred;
        try {
            const res = await pcloud_sdk_js_1.default.oauth.getTokenFromCode(code, this.cred.client_id, this.cred.client_secret);
            console.log("Received token: ", res.access_token);
            this.cred.access_token = res.access_token;
            this.cred.user_id = res.userid;
            promises_1.default.writeFile("pcloud_auth.json", JSON.stringify(this.cred));
            pcloud_sdk_js_1.default;
        }
        catch (err) {
            console.log(err);
        }
    }
}
function launchAuth(cred) {
    const oauthUrl = new url_1.default.URL("https://my.pcloud.com/oauth2/authorize");
    oauthUrl.searchParams.append("client_id", cred.client_id);
    oauthUrl.searchParams.append("response_type", "code");
    console.log("Go to this url to login");
    console.log(oauthUrl.href);
    const code = prompt_sync_1.default({ sigint: true })("the code:");
    const p = new PCloud();
    p.auth(code, cred).then(() => { });
    return p;
}
readCredentials().then((c) => {
    launchAuth(c);
});
//# sourceMappingURL=pcloud.js.map