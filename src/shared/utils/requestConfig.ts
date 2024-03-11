function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateUserAgent(): string {
  const ipadVersions: string[] = [
    "iPad1,1",
    "iPad2,1",
    "iPad3,1",
    "iPad4,1",
    "iPad5,1",
  ];
  const iosVersions: string[] = ["10_2", "11_0", "11_1", "11_2", "11_3"];
  const webkitVersions: string[] = [
    "602.3.12",
    "603.1.30",
    "604.4.7",
    "605.1.15",
  ];
  const mobileVersions: string[] = ["14C92", "15A421", "16A366", "17B102"];
  const fbanVersions: string = "MessengerForiOS";
  const fbavVersions: string[] = [
    "100.1.0.36.68",
    "101.0.0.27.69",
    "102.1.0.42.99",
  ];
  const fbmdVersions: string = "iPad";
  const fbsvVersions: string[] = ["10.2", "11.0", "11.1", "11.2"];

  const ipadVersion: string = pickRandom(ipadVersions);
  const iosVersion: string = pickRandom(iosVersions);
  const webkitVersion: string = pickRandom(webkitVersions);
  const mobileVersion: string = pickRandom(mobileVersions);
  const fbanVersion: string = fbanVersions;
  const fbavVersion: string = pickRandom(fbavVersions);
  const fbmdVersion: string = fbmdVersions;
  const fbsvVersion: string = pickRandom(fbsvVersions);

  const userAgent: string = `Mozilla/5.0 (iPad; CPU OS ${iosVersion} like Mac OS X) AppleWebKit/${webkitVersion} (KHTML, like Gecko) Mobile/${mobileVersion} [FBAN/${fbanVersion};FBAV/${fbavVersion};FBDV/${ipadVersion};FBMD/${fbmdVersion};FBSN/iOS;FBSV/${fbsvVersion};FBSS/2;FBCR/;FBID/tablet;FBLC/en_US;FBOP/5]`;

  return userAgent;
}

export const GLOBAL_HEADERS = {
  authority: "www.facebook.com",
  accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
  "cache-control": "max-age=0",
  dpr: "0.9",
  "sec-ch-prefers-color-scheme": "light",
  "sec-ch-ua":
    '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
  "sec-ch-ua-full-version-list":
    '"Not_A Brand";v="8.0.0.0", "Chromium";v="120.0.6099.109", "Google Chrome";v="120.0.6099.109"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-model": '""',
  "sec-ch-ua-platform": '"Windows"',
  "sec-ch-ua-platform-version": '"10.0.0"',
  "sec-fetch-dest": "document",
  "sec-fetch-mode": "navigate",
  "sec-fetch-site": "same-origin",
  "sec-fetch-user": "?1",
  "upgrade-insecure-requests": "1",
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "viewport-width": "983",
};

export const MOBILE_HEADERS = {
  authority: "www.facebook.com",
  accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
  "cache-control": "max-age=0",
  dpr: "0.9",
  "sec-ch-prefers-color-scheme": "light",
  "sec-ch-ua":
    '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
  "sec-ch-ua-full-version-list":
    '"Not_A Brand";v="8.0.0.0", "Chromium";v="120.0.6099.109", "Google Chrome";v="120.0.6099.109"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-model": '""',
  "sec-ch-ua-platform": '"Linux"',
  "sec-ch-ua-platform-version": '"Android 4.4.2"',
  "sec-fetch-dest": "document",
  "sec-fetch-mode": "navigate",
  "sec-fetch-site": "same-origin",
  "sec-fetch-user": "?1",
  "upgrade-insecure-requests": "1",
  "user-agent":
    "Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.114 Mobile Safari/537.36",
  "viewport-width": "983",
};

export const PC_HEADERS = {
  authority: "www.facebook.com",
  origin: "https://www.facebook.com",
  accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "accept-language": "en-US,en;q=0.9,id;q=0.8,nl;q=0.7,pt;q=0.6",
  "cache-control": "max-age=0",
  dpr: "1.5",
  "sec-ch-prefers-color-scheme": "light",
  "sec-ch-ua":
    '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
  "sec-ch-ua-full-version-list":
    '"Chromium";v="122.0.6226.2", "Not(A:Brand";v="24.0.0.0", "Google Chrome";v="122.0.6226.2"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-model": '""',
  "sec-ch-ua-platform": '"Windows"',
  "sec-ch-ua-platform-version": '"15.0.0"',
  "sec-fetch-dest": "document",
  "sec-fetch-mode": "navigate",
  "sec-fetch-site": "same-origin",
  "sec-fetch-user": "?1",
  "upgrade-insecure-requests": "1",
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
};

export const BASIC_BASE_URL = "https://mbasic.facebook.com";
export const MOBILE_BASE_URL = "https://m.facebook.com";
export const PC_BASE_URL = "https://www.facebook.com";
