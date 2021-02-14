declare var Handlebars: any;
let dateObj: Date = new Date();
let month: number = dateObj.getUTCMonth();
let day: number = dateObj.getUTCDate();
let year: number = dateObj.getUTCFullYear();

let date: string = `${year}-${month}-${day}`;

console.log(date);

let cardHTML = `{{#each news}}
<div class="c25">
    <img src="{{urlToImage}}" alt="" class="newsImage">
    <h2>{{title}}</h2>
    <p>{{description}}</p>
    <a href="{{url}}" target="_blank">Leer más</a>
    </div>
{{/each}}`
let card = document.getElementById('card');

let btnSearch = document.getElementById('searchButton');
btnSearch.addEventListener('click', function () {
    let inputSearch = (<HTMLInputElement>document.getElementById('inputSearch')).value.toUpperCase();
    console.log(inputSearch);
    var url = `http://newsapi.org/v2/everything?q=${inputSearch}&from${date}&sortBy=popularity&apiKey=356a0ae18676408cb5163093dceeb08e`;
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
                        }
                    })

                    card.innerHTML = cardHTML;
                    console.log(news);
                    const item = document.getElementById('card').innerHTML;
                    const template = Handlebars.compile(item);
                    document.getElementById('card').innerHTML = template({
                        news: news
                    });
                })
            );
        });
});