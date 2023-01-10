const request = require('request');
const Crawler = require('../models/crawler');
const rp = require('request-promise');

exports.crawler = (req, res, next) => {
   var result = []
  // var profileInfos = []
  // var message = ""
  // var options = {
  //   url: 'https://api.crawlbase.com/?token=552anrPuCZJX9BYX-bZXYw&device=desktop&scraper=generic-extractor&format=json&country=FR&url=https%3A%2F%2Fwww.malt.fr%2Fs%3Fq%3Druby+on+rails'
  // };
  
  // var getProfileInfos = (linksList) => {
  //   for (var i = 0; i < linksList.length; i++) {
  //     var encodeLink = encodeURI(linksList[i])
  //     console.log(encodeLink)
  //     var option = {
  //       url: `https://api.crawlbase.com/?token=clHjnuwKh4i-iOKRGSdPjA&device=desktop&scraper=generic-extractor&format=json&url=${encodeLink}`
  //     }
  //     request(option, infoscallback)
  //   }
  // }
  
  // function infoscallback(error, response, body) {
  //   if (!error && response.statusCode == 200) {
  //     profileInfos.push(body)
  //     var infosJSON = JSON.parse(body)
  //     profileInfos.push(infosJSON.body.title, infosJSON.body.og_images, infosJSON.body.canonical, infosJSON.body.content)
  //     message = 'Scraping complete'
  //     //searchInfos(infosJSON.body)
  //   }
  //   return profileInfos
  // }

  // function searchInfos(link) {
  //   console.log(link.body)
  // }

  // function callback(error, response, body) {
  //   if (!error && response.statusCode == 200) {
  //     message = 'Scraping in progress...'
  //     response.status = 200
  //     var resultJSON = JSON.parse(body)
  //     profileLinks(resultJSON.body.links)
  //   }
  // }

  function profileLinks(links) {
    for(var i = 0; i < links.length; i++) {
      if (links[i].includes("/profile")){
        result.push(links[i]);
      }
    }
    res.status(200).json({ message: 'Scraping in progress...', result })
    console.log(result)
    //getProfileInfos(result);
  }

  // request(options, callback);
  rp('https://api.crawlbase.com/?token=552anrPuCZJX9BYX-bZXYw&device=desktop&scraper=generic-extractor&format=json&country=FR&url=https%3A%2F%2Fwww.malt.fr%2Fs%3Fq%3Druby+on+rails')
  .then((response) => {
    // console.log(JSON.parse(response))
    var resultJSON = JSON.parse(response)
    var links = resultJSON.body.links
    // console.log(links)
    profileLinks(links)
  })
  .catch((error) => {
    console.error(error)
  });
}
