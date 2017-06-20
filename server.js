const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const path = require('path');
const app = express();
const _ = require('underscore');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


let fetchImageIfNotExists = function(dest, source) {
  const path = `./public/${dest}`;
  if(!fs.existsSync(path)) {
    const file = fs.createWriteStream(path)
    http.get(`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/${source}`, function(response) {
      response.pipe(file)
    })
  }
}

let fetchChampionData = function() {
  const batchedData = {}
  const promises = []
  let topPromise = new Promise((resolve1, reject1) => {
    const request = https.get("https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&dataById=false&api_key=RGAPI-a9560bb4-660c-4f56-ab86-6a703c43d481", function(res) {
      var body = '';
      res.on('data', function(chunk) {
        body += chunk;
      });
      res.on('end', function() {
        championsData = JSON.parse(body)
        let idx = 0
        _.each(championsData.data, (champion) => {
          console.log(idx)
          promises.push(new Promise((resolve, reject) => {
              setTimeout(() => {
                https.get(`https://na1.api.riotgames.com/lol/static-data/v3/champions/${champion.id}?locale=en_US&tags=all&api_key=RGAPI-a9560bb4-660c-4f56-ab86-6a703c43d481`, function(res2) {
                  var body = '';
                  res2.on('data', function(chunk) {
                    body += chunk;
                  });
                  res2.on('end', function() {
                    championData = JSON.parse(body)
                    batchedData[champion['id']] = championData

                    _.each(championData.spells, (spell) => {
                      fetchImageIfNotExists(`spell/${spell.image.full}`, `/spell/${spell.image.full}`)
                    })
                    fetchImageIfNotExists(`champion/${championData.image.full}`, `/champion/${championData.image.full}`)
                    resolve();
                  });
                });
              }, idx * 1300)
              idx += 1;
            })
          )
        })
        resolve1()
        Promise.all(promises).then(() => {
          var fs = require('fs');
          fs.writeFile("./public/championData.json", JSON.stringify(batchedData), function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("Champion data saved");
          })
        })
      });
    });
  });
}

let fetchItemData = function() {
  const batchedData = {}
  const promises = []
  let topPromise = new Promise((resolve1, reject1) => {
    const request = https.get("https://na1.api.riotgames.com/lol/static-data/v3/items?locale=en_US&dataById=false&api_key=RGAPI-a9560bb4-660c-4f56-ab86-6a703c43d481", function(res) {
      var body = '';
      res.on('data', function(chunk) {
        body += chunk;
      });
      res.on('end', function() {
        itemsData = JSON.parse(body)
        let idx = 0
        _.each(itemsData.data, (item) => {
          console.log(idx)
          promises.push(new Promise((resolve, reject) => {
              setTimeout(() => {
                https.get(`https://na1.api.riotgames.com/lol/static-data/v3/items/${item.id}?locale=en_US&tags=all&api_key=RGAPI-a9560bb4-660c-4f56-ab86-6a703c43d481`, function(res2) {
                  var body = '';
                  res2.on('data', function(chunk) {
                    body += chunk;
                  });
                  res2.on('end', function() {
                    itemData = JSON.parse(body)
                    batchedData[item['id']] = itemData
                    fetchImageIfNotExists(`items/${itemData.image.full}`, `item/${itemData.image.full}`)
                    resolve();
                  });
                });
              }, idx * 1300)
              idx += 1;
            })
          )
        })
        resolve1()
        Promise.all(promises).then(() => {
          var fs = require('fs');
          fs.writeFile("./public/itemData.json", JSON.stringify(batchedData), function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("Item data saved");
          })
        })
      });
    });
  });
}

let fetchAPIData = function() {
  fetchChampionData();
  fetchItemData();
}();


app.listen(9000);
