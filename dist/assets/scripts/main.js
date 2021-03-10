let dateObj = new Date();
let month = dateObj.getUTCMonth();
let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();
let date = `${year}-${month}-${day}`;
console.log(date);
let cardHTML = `{{#each news}}
<div class="c25">
    <img src="{{urlToImage}}" alt="" class="newsImage">
    <h2>{{title}}</h2>
    <p>{{description}}</p>
    <a href="{{url}}" target="_blank">Leer más</a>
    </div>
{{/each}}`;
let card = document.getElementById('card');
let btnSearch = document.getElementById('searchButton');
btnSearch.addEventListener('click', function () {
    let inputSearch = document.getElementById('inputSearch').value.toUpperCase();
    console.log(inputSearch);
    var url = `http://localhost:3000/news?q=${inputSearch}`;
    var req = new Request(url);
    fetch(req)
        .then(function (response) {
        console.log(response.json()
            .then(function (data) {
            let news = data.articles.map(function (x) {
                return {
                    'urlToImage': x.urlToImage,
                    'title': x.title,
                    'description': x.description,
                    'url': x.url
                };
            });
            card.innerHTML = cardHTML;
            console.log(news);
            const item = document.getElementById('card').innerHTML;
            const template = Handlebars.compile(item);
            document.getElementById('card').innerHTML = template({
                news: news
            });
        }));
    });
});
