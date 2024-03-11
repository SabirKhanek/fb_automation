import * as cheerio from "cheerio";
import { fetchPage } from "./fetchPage";
import { axios } from "../axios";
import * as querystring from "querystring";
import { writeFileSync } from "fs";
export async function commentOnPost(
  url: string,
  cookies: string,
  comment_text: string
) {
  const page = await fetchPage(url, cookies);
  const { action, fb_dtsg, jazoest } = extractCommentData(page);
  // console.log({ action, fb_dtsg, jazoest });
  const res = await axios.post<string>(
    action,
    querystring.stringify({ fb_dtsg, jazoest, comment_text }),
    {
      headers: {
        ...axios.defaults.headers.post,
        cookie: cookies,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  console.log(res.data);
  if (!res.data) return;
  if (res.data.includes("restricted"))
    throw new Error("Can't Comment: Account is restricted");
}

function extractCommentData(page: string) {
  const $ = cheerio.load(page);
  // writeFileSync("comment.html", page);
  // Extract fb_dtsg value
  const fb_dtsgElement = $('input[type="hidden"][name="fb_dtsg"]');
  const fb_dtsg = fb_dtsgElement.val();

  // Extract jazoest value
  const jazoestElement = $('input[type="hidden"][name="jazoest"]');
  const jazoest = jazoestElement.val();

  const formElement = $('form[method="POST"]')[0];
  const action = formElement.attribs["action"];

  return {
    fb_dtsg,
    jazoest,
    action,
  };
}
