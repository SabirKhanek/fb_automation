import { ErrorWithStatus } from "./errorWithStatus";
import * as cheerio from "cheerio";
import { fetchMobilePage, fetchPCPage } from "./fetchPage";
import { pcAxios } from "../axios";
import * as querystring from "querystring";
import { writeFileSync } from "fs";
import { CONFIG } from "../config";

export async function voteOnPoll(
  qid: string,
  oid: string,
  cookie: string,
  post_url: string
) {
  const page = await fetchPCPage(post_url, cookie);

  const data = extractVoteData(page, oid, qid);
  console.log(data);
  const result = await pcAxios.post(
    "/api/graphql",
    querystring.stringify(data),
    {
      headers: {
        ...pcAxios.defaults.headers.post,
        cookie: cookie,
        Referer: post_url,
        "X-Fb-Lsd": data.lsd,
        "X-Fb-Friendly-Name": data.fb_api_req_friendly_name,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  if (CONFIG.DEVELOPMENT) console.log(result);
  // if (result.data.includes("<title>Error</title>")) {
  //   throw new ErrorWithStatus("Error while submitting the poll", 500);
  // }
}

function extractValue(content: string, regex: RegExp) {
  let match = content.match(regex);
  if (match?.at(1)) {
    return match.at(1);
  } else throw new ErrorWithStatus("Error extracting poll data", 500);
}

function extractVoteData(content: string, oid: string, qid: string) {
  try {
    writeFileSync("resp.html", content);
    let usr = extractValue(content, /__user=(.*?)&/);
    let dts = extractValue(content, /"DTSGInitialData",\[\],{"token":"(.*?)"}/);
    let jzt = extractValue(content, /&jazoest=(.*?)"/);
    let lsd = extractValue(content, /"LSD",\[\],{"token":"(.*?)"}/);
    let hst = extractValue(content, /"haste_session":"(.*?)"/);
    let rev = extractValue(content, /{"rev":(.*?)}/);
    let hsi = extractValue(content, /"hsi":"(.*?)"/);
    let spr = extractValue(content, /"__spin_r":(.*?),/);
    let spt = extractValue(content, /"__spin_t":(.*?),/);
    let encrypted_tracking = extractValue(
      content,
      /"encrypted_tracking":"(.*?)"/
    );

    const data = {
      av: usr,
      __user: usr,
      __hs: hst,
      dpr: "1.5",
      __ccg: "GOOD",
      __rev: rev,
      __s: "ki02dt:nysydc:6w5q4y",
      __hsi: hsi,
      __comet_req: 15,
      fb_dtsg: dts,
      jazoest: jzt,
      lsd: lsd,
      __aaid: "0",
      __spin_r: spr,
      __spin_b: "trunk",
      __spin_t: spt,
      fb_api_caller_class: "RelayModern",
      fb_api_req_friendly_name: "useCometPollAddVoteMutation",
      variables: JSON.stringify({
        input: {
          is_tracking_encrypted: true,
          option_id: oid,
          question_id: qid,
          tracking: [encrypted_tracking],
          actor_id: usr,
          client_mutation_id: "2",
        },
        scale: 1.5,
        __relay_internal__pv__IsWorkUserrelayprovider: false,
      }),
      server_timestamps: true,
      doc_id: 7012503615525435,
    };

    return data;
  } catch (err: any) {
    console.log(err);
    throw new ErrorWithStatus(`Error extracting required poll data`, 500);
  }
}
