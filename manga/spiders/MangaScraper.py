from typing import Any
import scrapy
from scrapy.http import Response

class MangaSpider(scrapy.Spider):
    name = "manga-spider"
    start_urls = ["https://myanimelist.net/topmanga.php?limit="+str(i*50) for i in range(1,5)]
    start_urls.insert(0, "https://myanimelist.net/topmanga.php")

    def parse(self, response):
        for mangas in response.css('tr.ranking-list'):
            rank = mangas.css('td.rank > span.lightLink.top-anime-rank-text::text').get()
            title = mangas.css('td.title > div.detail > h3.manga_h3 > a::text').get()
            score = mangas.css('td.score > div.js-top-ranking-score-col > span::text').get()
            img_url = mangas.css('td.title > a.hoverinfo_trigger > img::attr(data-src)').get()
            
            detail_link = mangas.css('td.title > div.detail > h3.manga_h3 > a::attr(href)').get()
            if detail_link:
                yield response.follow(detail_link, callback=self.parse_detail, meta={'rank': rank, 'title': title, 'score': score, 'img_url': img_url})
            
        next_page = response.css("a.link-blue-box.next::attr(href)").get()
        if next_page is not None:
            next_page_url = response.urljoin(next_page)
            yield scrapy.Request(next_page_url, callback=self.parse)

    def parse_detail(self, response):
        rank = response.meta['rank']
        title = response.meta['title']
        score = response.meta['score']
        img_url = response.meta['img_url']
        genre = response.css('span[itemprop="genre"]::text').getall()
        synopsis = response.css('span[itemprop="description"]::text').get()
        authors = response.css('span.dark_text:contains("Authors:") ~ a::text').getall()

        yield {
            'rank': rank,
            'title': title,
            'score': score,
            'img_url': img_url,
            'genre': genre,
            'synopsis': synopsis,
            'authors': authors
        }
