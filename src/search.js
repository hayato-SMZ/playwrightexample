const playwright = require("playwright");
const fs = require("fs");

(async () => {
  const browser = await playwright.chromium.launch();
  const newPage = await browser.newPage();
  const setting = JSON.parse(fs.readFileSync("config.json"));
  await newPage.goto(setting.google);
  await newPage.fill("[type='text']", "スポーツテスト");
  await newPage.click("[name='btnK']");
  await newPage.waitForLoadState("domcontentloaded");
  await newPage.screenshot({ path: 'search.png' });
  const urlList = (await newPage.$$("#search .g .yuRUbf>a")).map(anker => {
    return anker.getAttribute("href");
  });
  Promise.all(urlList).then((result) => {
    fs.writeFileSync("topURLList.json", JSON.stringify(result));
    browser.close();
  });
})();