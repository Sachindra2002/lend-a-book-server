const { request, response } = require("express");
const cheerio = require("cheerio");
const axios = require("axios");

/* SCRAPE BOOKS FROM WEBSITE */
exports.webScrapeBook = async (request, response) => {
  try {
    const siteUrl =
      "https://play.google.com/store/books/collection/cluster?clp=0g4XChUKD3RvcHNlbGxpbmdfcGFpZBAHGAE%3D:S:ANO1ljIvTNM&gsr=ChrSDhcKFQoPdG9wc2VsbGluZ19wYWlkEAcYAQ%3D%3D:S:ANO1ljK-5i4&hl=en_US&gl=US";

    //Get HTML data from site and load to Cheerio
    const { data } = await axios.get(siteUrl);

    const books = [];

    const $ = cheerio.load(data);
    const elementSelector =
      "#fcxH9b > div.WpDbMd > c-wiz > div > c-wiz > div > c-wiz > c-wiz > c-wiz > div > div.ZmHEEd > div";

    const keys = ["Title", "Image", "Price", "Link"];
    $(elementSelector).each((parentIndex, parentElement) => {
      const book = $(parentElement);
      const price = book.find(".VfPpfd.ZdBevf.i5DZme").text();
      const link = book.find("a").attr("href");
      const title = book.find(".WsMG1c.nnK0zc").text();
      const img = book.find("img").attr("data-src");

      books.push({
        price,
        link: `https://play.google.com${link}&h1=en_US&gl=US`,
        title,
        img,
      });
      //   console.log(books);
    });

    return response.status(200).json({ books });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: error.message });
  }
};
