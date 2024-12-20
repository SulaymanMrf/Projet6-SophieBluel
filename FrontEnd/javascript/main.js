//Récupération des données de l'API avec fetch + appel fonction setFigure
async function getWorks() {
    let ReponseWorks = await fetch("http://localhost:5678/api/works");
    let Works = await ReponseWorks.json();
    console.log(Works);
    setFigure(Works);
}
getWorks();

//Création des éléments et injection dans l'HTML
function setFigure(data) {
    const Gallery = document.querySelector(".gallery");

    for (let i = 0; i < data.length; i++) {
        let ImageWorks = document.createElement("figure");
        ImageWorks.innerHTML = `<img src= ${data[i].imageUrl} alt= ${data[i].title}> <figcaption> ${data[i].title} </figcaption>`;
        Gallery.append(ImageWorks);
    }
};

//Récupération catégories
async function getCategories() {
    let ReponseCat = await fetch("http://localhost:5678/api/categories");
    let Categories = await ReponseCat.json();
    const ListeCategorie = [...new Set(Categories)]
    console.log(Categories);
    console.log(ListeCategorie);
    setFilters(ListeCategorie);
}
getCategories();

//Création des éléments et injection dans l'HTML
function setFilters(data) {
    const DivFilters = document.querySelector(".div-filters");
    let All = document.createElement("div");
    All.innerHTML = `<div> Tous </div>`;
    All.classList.add("filters", "filter-all");
    DivFilters.appendChild(All);

    for (let i = 0; i < data.length; i++) {
        let Filters = document.createElement("div");
        Filters.innerHTML = `<div> ${data[i].name} </div>`;
        Filters.classList.add("filters", `filter-${data[i].id}`);
        DivFilters.appendChild(Filters);
    }
};

