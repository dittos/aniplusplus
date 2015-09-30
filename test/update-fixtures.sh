#!/bin/sh
curl "http://m.aniplustv.com/vodUpdateList.asp?curDate=2015-09-29" -o fixtures/vodUpdateList.html
curl "http://m.aniplustv.com/vodUpdateList.asp?curDate=2015-09-27" -o fixtures/vodUpdateList_noitem.html
