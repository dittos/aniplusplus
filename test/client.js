import {readFileSync} from 'fs';
import {expect} from 'chai';
import {describe, it} from 'mocha';
import sinon from 'sinon';
import * as Client from '../client';
import http from '../http';

const fixtureDir = __dirname + '/fixtures';

describe('Client', () => {
    it('should load vod update list', async function() {
        const fixtureData = readFileSync(fixtureDir + '/vodUpdateList.html');
        sinon.stub(http, 'fetch')
            .returns(Promise.resolve({text: () => Promise.resolve(fixtureData)}));
        const date = '2015-09-30';
        const items = await Client.getVodUpdateList(date);
        expect(http.fetch.args[0][0]).to.equal('http://m.aniplustv.com/vodUpdateList.asp?curDate=2015-09-30');
        expect(items).to.deep.equal({
            date: date,
            items: [
                {
                    contentSerial: "1578",
                    part: "23",
                    title: "아이돌 마스터 신데렐라 걸즈",
                    chapter: "23화 Glass Slippers",
                    pic: "http://www.tvee.co.kr/images/tvee-admin/content/M_20150123150559.jpg",
                },
                {
                    contentSerial: "1649",
                    part: "10",
                    title: "프리즈마 이리야 2wei Herz!",
                    chapter: "10화 세상의 한편에서 너의 이름을",
                    pic: "http://www.tvee.co.kr/images/tvee-admin/content/M_20150727121819.jpg",
                },
                {
                    contentSerial: "1648",
                    part: "13",
                    title: "GOD EATER",
                    chapter: "9화 소마 시크잘",
                    pic: "http://www.tvee.co.kr/images/tvee-admin/content/M_20150706161157.jpg",
                },
                {
                    contentSerial: "1647",
                    part: "13",
                    title: "WORKING!!! 3기",
                    chapter: "13화 마히루의 결투",
                    pic: "http://www.tvee.co.kr/images/tvee-admin/content/M_20150721153827.jpg",
                },
            ]
        });
    });
});
