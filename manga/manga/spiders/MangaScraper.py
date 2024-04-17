import scrapy

class MangaSpider(scrapy.Spider):
    name = "manga-spider"
    # start_urls = ["https://myanimelist.net/topmanga.php"]

    # cara untuk menampilkan ranking-list sesuai range 
    start_urls = ["https://myanimelist.net/topmanga.php?limit="+str(i*50) for i in range(1,10)] #sebanyak 1500 data
    start_urls.insert(0, "https://myanimelist.net/topmanga.php")

    # prosedur untuk menampikan detail dari setiap ranking-list
    def parse(self, response):
        for mangas in response.css('tr.ranking-list'):
            yield {
                'rank': mangas.css('span.lightLink.top-anime-rank-text::text').get(),
                'image': mangas.css('img::attr(data-src)').get(),
                'title': mangas.css('a.hoverinfo_trigger.fs14.fw-b::text').get()
            }




    # Code dibwah untuk mengambil semua data manga (mengambil dari setiap page sampai sudah tidak ada page lagi)
        """
        next_page = response.css("a.link-blue-box.next::attr(href)").get()
        if next_page is not None:
            next_page_url = "https://myanimelist.net/topmanga.php"+next_page
            yield response.follow(next_page_url, callback = self.parse)
        
        """
    