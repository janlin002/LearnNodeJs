const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://tw.stock.yahoo.com/quote/2330.TW';

axios.get(url)
    .then(response => {
        const $ = cheerio.load(response.data);

        const data = $('.D\\(f\\).Fld\\(c\\).Flw\\(w\\).H\\(192px\\).Mx\\(-16px\\)').find('li').map((i, el) => {
            const label = $(el).find('span:first-child').text();
            const value = $(el).find('span:last-child').text();
            return { label, value };
        }).get();

        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
