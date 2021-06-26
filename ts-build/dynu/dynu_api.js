"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWebRedirect = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const config = getConfigs();
const API_KEY = config.dynu_api_key;
const DOMAIN = "node-cloud.ddnsfree.com";
const WEBDIRECT_NAME = "node-cloud.ddnsfree.com";
function getConfigs(file = "dynuconfig.json") {
    const cred = JSON.parse(fs_1.default.readFileSync(file).toString());
    return cred;
}
async function getWebDirects(domain_id) {
    const instance = axios_1.default.create({
        headers: { accept: "application/json", "API-KEY": API_KEY },
    });
    const res = await instance.get(`https://api.dynu.com/v2/dns/${domain_id}/webredirect`);
    return res.data;
}
async function getDNS() {
    const instance = axios_1.default.create({
        headers: { accept: "application/json", "API-KEY": API_KEY },
    });
    const dns = await instance.get("https://api.dynu.com/v2/dns");
    return dns.data;
}
async function updateWebRedirect(new_url) {
    const instance = axios_1.default.create({
        headers: { accept: "application/json", "API-KEY": API_KEY },
    });
    try {
        const dns_res = await getDNS();
        if (dns_res.statusCode != 200) {
            throw dns_res.exception.message;
        }
        const domain = dns_res.domains.find((v, i, arr) => {
            return v.name == DOMAIN;
        });
        if (domain == undefined) {
            throw "No matching domain name found in account";
        }
        const web_res = await getWebDirects(domain.id);
        if (web_res.statusCode != 200) {
            throw web_res.exception.message;
        }
        const webred = web_res.webRedirects.find((v, i, arr) => {
            return v.hostname == WEBDIRECT_NAME;
        });
        if (webred == undefined) {
            throw "No matching webdirect name found in account";
        }
        const mod = webred;
        mod.redirectType = "UF" /* UF */;
        mod.url = new_url;
        // delete mod.updatedOn;
        // delete mod.id;
        // delete mod.domainId;
        // delete mod.domainName;
        // delete mod.host;
        // delete mod.hostname;
        const update = await instance.post(`https://api.dynu.com/v2/dns/${domain.id}/webRedirect/${webred.id}`, JSON.stringify(mod));
    }
    catch (err) {
        throw err;
    }
}
exports.updateWebRedirect = updateWebRedirect;
function tests() {
    updateWebRedirect("https://www.youtube.com")
        .then((d) => {
        console.log(d);
    })
        .catch((err) => {
        console.error(err);
    });
}
//# sourceMappingURL=dynu_api.js.map