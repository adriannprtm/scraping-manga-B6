from typing import Any
import scrapy
from scrapy.http import Response

# class MangaSpider(scrapy.Spider):
#     name = "manga-spider"
#     start_urls = ["https://myanimelist.net/topmanga.php"]
    
#     def parse(self, response):
#         for mangas in response.css('tr.ranking-list'):
#             yield{
#                 'rank': mangas.css('td.rank > span.lightLink.top-anime-rank-text::text').get(),
#                 'title': mangas.css('td.title > div.detail > h3.manga_h3 > a::text').get(),
#                 'score': mangas.css('td.score > div.js-top-ranking-score-col > span::text').get(),
#                 'img_url' : mangas.css('td.title > a.hoverinfo_trigger > img::attr(data-src)').get(),
#                 'information': mangas.css('td.title > div.detail > div.information::text').get(),
#             }

class MangaSpider(scrapy.Spider):
    name = "manga-spider"
    start_urls = ["https://myanimelist.net/topmanga.php?limit="+str(i*50) for i in range(1,5)]
    start_urls.insert(0, "https://myanimelist.net/topmanga.php")

    
    def parse(self, response):
        for mangas in response.css('tr.ranking-list'):
            information_texts = mangas.css('td.title > div.detail > div.information::text').getall()
            if len(information_texts) >= 3:
                third_line = information_texts[2].strip()
            else:
                third_line = None
                
            if len(information_texts) >=2:
                second_line =  information_texts[1].strip()
            else:
                second_line = None
                
            if len(information_texts) >=1:
                first_line =  information_texts[0].strip()
            else:
                first_line = None
                
            yield{
                'rank': mangas.css('td.rank > span.lightLink.top-anime-rank-text::text').get(),
                'title': mangas.css('td.title > div.detail > h3.manga_h3 > a::text').get(),
                'score': mangas.css('td.score > div.js-top-ranking-score-col > span::text').get(),
                'img_url' : mangas.css('td.title > a.hoverinfo_trigger > img::attr(data-src)').get(),
                'kategori' : first_line,
                'date' : second_line,
                'members': third_line
            }
            
        next_page = response.css("a.link-blue-box.next::attr(href)").get()
        if next_page is not None:
            next_page_url = "https://myanimelist.net/topmanga.php"+next_page
            yield response.follow(next_page_url, callback = self.parse)

