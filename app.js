const apiKey = 'b6228a32044e444687a7010f98071237';
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSource = "TechCrunch"



window.addEventListener('load', async e =>{
    updateNews();
    await updateSources();
    sourceSelector.value = defaultSource;

    sourceSelector.addEventListener('change', e =>{
        updateNews(e.target.value);
    })
})

async function updateSources(){
    // const res = await fetch(`https://newsapi.org/v2/sources?apiKey=${apiKey}`);
    const res = await fetch(`https://newsapi.org/v2/sources?top-headlines?country=us&category=technology&apiKey=${apiKey}`);
    const json = await res.json();
    console.log(json)
    sourceSelector.innerHTML = json.sources.map(src => `<option value="${src.id}">${src.name}</option>`)
    .join('\n');
}

async function updateNews(source = defaultSource){
//  const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&sortBy=top&apiKey=${apiKey}`);
 const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`);
 const json = await res.json();
 console.log(json)
 main.innerHTML = json.articles.map(createArticle).join('\n');  
}

function createArticle(article){
   `
    <div class="article">
        <a href="${article.url}">
            <h2>${article.title}</h2>
            <img src="${article.urlToImage}">
            <p>${article.description}</p>
        </a>
    </div>
    `
}