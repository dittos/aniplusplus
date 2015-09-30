import {parse as parseUrl} from 'url';
import cheerio from 'cheerio';

async function loadFromUrl(url) {
    return cheerio.load(await fetch(url).then(r => r.text()));
}

export async function getVodUpdateList(date) {
    const url = `http://m.aniplustv.com/vodUpdateList.asp?curDate=${date}`;
    const $ = await loadFromUrl(url);
    const items = $('#timeList').find('li').get().map(item => {
        const href = $(item).find('a').attr('href');
        const parseQueryString = true;
        const parsed = parseUrl(href, parseQueryString);
        return {
            contentSerial: parsed.query.contentSerial,
            part: parsed.query.part,
            title: $(item).find('.title').text(),
            chapter: $(item).find('.chapter').text(),
            pic: $(item).find('.pic img').attr('src'),
        };
    });
    return {
        date,
        items
    };
}
