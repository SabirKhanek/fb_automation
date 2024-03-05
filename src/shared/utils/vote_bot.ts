import { ErrorWithStatus } from "./errorWithStatus";
import * as cheerio from "cheerio";
import { fetchMobilePage } from "./fetchPage";
import { mobileAxios } from "../axios";
import * as querystring from "querystring";

export async function voteOnPoll(qid: string, oid: string, cookie: string) {
  const url = `https://m.facebook.com/questions.php?question_id=${qid}`;
  const page = await fetchMobilePage(url, cookie);

  const data = extractVoteData(page, oid, qid);

  const result = await mobileAxios.post(
    "/a/questions/polls/vote.php",
    querystring.stringify(data),
    {
      headers: {
        ...mobileAxios.defaults.headers.post,
        cookie: cookie,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  // console.log(result.data);
}

function extractVoteData(content: string, oid: string, qid: string) {
  try {
    // @ts-ignore
    const [_, fb_dtsg, jazoest] = content.match(
      /MPageLoadClientMetrics.init\("([^"]*)", "", "jazoest", "([^"]*)"/
    );

    const $ = cheerio.load(content);
    // @ts-ignore
    const voteMatch = $(`#${oid} .mPollVotes`).text().match(/\d+/);
    const vote = voteMatch ? voteMatch[0] : 0;
    // @ts-ignore
    const lsd = content.match(/"LSD"[^"]*{"token":"([^"]*)"}/)[1];
    // @ts-ignore
    const _a = content.match(/"ajaxResponseToken".*"encrypted":"([^"]*)"}/)[1];
    // @ts-ignore
    const _user = content.match(
      /"CurrentUserInitialData".*"ACCOUNT_ID":"([^"]*)"/
    )[1];

    return {
      oid,
      qid,
      context: "feed",
      _csr: "",
      _req: "a",
      lsd,
      _a,
      _user,
      vote,
      fb_dtsg,
      jazoest,
    };
  } catch (err: any) {
    throw new ErrorWithStatus(`Error extracting required poll data`, 500);
  }
}
