const playwright = require("playwright");
const fs = require("fs");
(async () => {
  const device = await playwright.devices["iPhone 11"];
  const browser = await playwright.webkit.launch();
  const context = await browser.newContext({
    ...device,
  });
  const newPage = await context.newPage();
  const setting = JSON.parse(fs.readFileSync("config.json"));
  await newPage.goto(setting.accessURL);
  await newPage.screenshot({ path: 'iphone11.png' ,fullPage: true});
  await browser.close();
})();