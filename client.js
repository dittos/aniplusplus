import {parse as parseUrl} from 'url';
import cheerio from 'cheerio';
import http from './http';

export async function getVodUpdateList(date) {
    const url = `http://m.aniplustv.com/vodUpdateList.asp?curDate=${date}`;
    const $ = cheerio.load(await (await http.fetch(url)).text());
    const items = $('#timeList').find('li').map(function() {
        const href = $(this).find('a').attr('href');
        const parseQueryString = true;
        const parsed = parseUrl(href, parseQueryString);
        return {
            contentSerial: parsed.query.contentSerial,
            part: parsed.query.part,
            title: $(this).find('.title').text(),
            chapter: $(this).find('.chapter').text(),
            pic: $(this).find('.pic img').attr('src'),
        };
    }).get();
    return {
        date,
        items
    };
}
