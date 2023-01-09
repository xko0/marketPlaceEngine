const request = require('request');


exports.crawler = () => {
  var result = []
  var profileInfos = []
  var options = {
    url: 'https://api.crawlbase.com/?token=552anrPuCZJX9BYX-bZXYw&device=desktop&scraper=generic-extractor&format=json&country=FR&url=https%3A%2F%2Fwww.malt.fr%2Fs%3Fq%3Druby+on+rails'
  };
  
  var getProfileInfos = (linksList) => {
    for (var i = 0; i < linksList.length; i++) {
      var encodeLink = encodeURI(linksList[i])
      console.log(encodeLink)
      var option = {
        url: `https://api.crawlbase.com/?token=clHjnuwKh4i-iOKRGSdPjA&device=desktop&scraper=generic-extractor&format=json&url=${encodeLink}`
      }
      request(option, infoscallback)
    }
  }
  
  function infoscallback(error, response, body) {
    if (!error && response.statusCode == 200) {
      profileInfos.push(body)
      var infosJSON = JSON.parse(body)
      console.log(infosJSON.body.title)
      //searchInfos(infosJSON.body)
    }
  }

  function searchInfos(link) {
    console.log(link.body)
  }

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var resultJSON = JSON.parse(body)
      profileLinks(resultJSON.body.links)
    }
  }

  function profileLinks(links) {
    for(var i = 0; i < links.length; i++) {
      if (links[i].includes("/profile")){
        result.push(links[i]);
      }
    }
    getProfileInfos(result);
  }

  request(options, callback);
}
