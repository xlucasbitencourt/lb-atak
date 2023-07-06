const puppeteer = require("puppeteer");

const search = async (query) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
    await page.waitForSelector("div.g");

    const searchResult = await page.evaluate(() => {
      const results = [];

      const elements = document.querySelectorAll("div.g");
      elements.forEach((element) => {
        const titleElement = element.querySelector("h3");
        const linkElement = element.querySelector("a");

        if (titleElement && linkElement) {
          const title = titleElement.textContent;
          const link = linkElement.href;
          results.push({ title, link });
        }
      });

      return results;
    });

    await browser.close();

    return searchResult;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = search;
