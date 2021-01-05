const playwright = require("playwright");
const fs = require('fs');

(async () => {
  const browser = await playwright.webkit.launch();
  const page = await browser.newPage();
  const setting = JSON.parse(fs.readFileSync("config.json"));
  await page.goto(setting.accessURL);
  await page.screenshot({ path: 'chromeSS.png' });
  await browser.close();
})();