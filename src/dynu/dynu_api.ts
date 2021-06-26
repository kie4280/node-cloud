import axios from "axios";
import fs from "fs";
import * as models from "./dynu_models";

type CONFIG = { dynu_api_key: string };

const config = getConfigs();
const API_KEY: string = config.dynu_api_key;
const DOMAIN: string = "node-cloud.ddnsfree.com";
const WEBDIRECT_NAME: string = "node-cloud.ddnsfree.com";

function getConfigs(file: string = "dynuconfig.json"): CONFIG {
  const cred = JSON.parse(fs.readFileSync(file).toString());
  return cred;
}

async function getWebDirects(
  domain_id: number
): Promise<models.webredirect_response> {
  const instance = axios.create({
    headers: { accept: "application/json", "API-KEY": API_KEY },
  });
  const res = await instance.get(
    `https://api.dynu.com/v2/dns/${domain_id}/webredirect`
  );
  return res.data;
}

async function getDNS(): Promise<models.DNS_response> {
  const instance = axios.create({
    headers: { accept: "application/json", "API-KEY": API_KEY },
  });
  const dns = await instance.get("https://api.dynu.com/v2/dns");
  return dns.data;
}
export async function updateWebRedirect(new_url: string) {
  const instance = axios.create({
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
    mod.redirectType = models.RedirectTypes.UF;
    mod.url = new_url;
    // delete mod.updatedOn;
    // delete mod.id;
    // delete mod.domainId;
    // delete mod.domainName;
    // delete mod.host;
    // delete mod.hostname;
    const update = await instance.post(
      `https://api.dynu.com/v2/dns/${domain.id}/webRedirect/${webred.id}`,
      JSON.stringify(mod)
    );
  } catch (err) {
    throw err;
  }
}

function tests() {
  updateWebRedirect("https://www.youtube.com")
    .then((d) => {
      console.log(d);
    })
    .catch((err) => {
      console.error(err);
    });
}
