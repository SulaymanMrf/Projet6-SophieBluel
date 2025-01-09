//Récupération des données de l'API avec fetch + appel fonction setFigure
async function getWorks(filter) {
    let ReponseWorks = await fetch("http://localhost:5678/api/works");
    let Works = await ReponseWorks.json();
    let ObjetsFiltered = Works.filter((work) => work.category.name === "Objets");
    let AppartsFiltered = Works.filter((work) => work.category.name === "Appartements");
    let HotelsRestaurantsFiltered = Works.filter((work) => work.category.name === "Hotels & restaurants");
    //Application filtres
    if (filter === "Tous") {
        console.log(Works);
        setFigure(Works);
    }; 

    if (filter === "Objets") {
        console.log(ObjetsFiltered);
        setFigure(ObjetsFiltered);
    };

    if (filter === "Apparts") {
        console.log(AppartsFiltered);
        setFigure(AppartsFiltered);
    };

    if (filter === "HotelsRestaurants") {
        console.log(HotelsRestaurantsFiltered);
        setFigure(HotelsRestaurantsFiltered);
    };
}

getWorks("Tous");

//Création des éléments et injection dans l'HTML
function setFigure(data) {
    const Gallery = document.querySelector(".gallery");
    Gallery.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        let ImageWorks = document.createElement("figure");
        ImageWorks.innerHTML = `<img src= ${data[i].imageUrl} alt= ${data[i].title}> <figcaption> ${data[i].title} </figcaption>`;
        Gallery.append(ImageWorks);
    }
};

//Récupération catégories + création filtre séléctionné
async function getCategories() {
    let ReponseCat = await fetch("http://localhost:5678/api/categories");
    let Categories = await ReponseCat.json();
    const ListeCategorie = [...new Set(Categories)]
    console.log(Categories);
    console.log(ListeCategorie);
    setFilters(ListeCategorie);

    //Création fonction filtre séléctionné
    let selectedFilter = document.querySelector(".filter-all");
    selectedFilter.classList.add("filter_selected");

    function selectFilter(number) {
        selectedFilter.classList.remove("filter_selected")
        if (number === 1) {
            selectedFilter = document.querySelector(`.filter-1`);
            selectedFilter.classList.add("filter_selected");
        };
        if (number === 2) {
            selectedFilter = document.querySelector(`.filter-2`);
            selectedFilter.classList.add("filter_selected");
        };
        if (number === 3){
            selectedFilter = document.querySelector(`.filter-3`);
            selectedFilter.classList.add("filter_selected");
        };
        if (number === 0) {
            selectedFilter = document.querySelector(`.filter-all`);
            selectedFilter.classList.add("filter_selected");
        };
    };

    //Add event listeners 
    let All = document.querySelector(".filter-all");
    let Objets = document.querySelector(".filter-1");
    let Apparts = document.querySelector(".filter-2");
    let HotelsRestaurants = document.querySelector(".filter-3");

    All.addEventListener("click", function() {
        console.log("Vous avez cliqué sur Tous!");
        getWorks("Tous");
        selectFilter(0);
    });
    Objets.addEventListener("click", function() {
        console.log("Vous avez cliqué sur Objets!");
        getWorks("Objets");
        selectFilter(1);
    });
    Apparts.addEventListener("click", function() {
        console.log("Vous avez cliqué sur Appartements!");
        getWorks("Apparts");
        selectFilter(2);
    });
    HotelsRestaurants.addEventListener("click", function() {
        console.log("Vous avez cliqué sur Hotels & Restaurants!");
        getWorks("HotelsRestaurants");
        selectFilter(3);
    });
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

