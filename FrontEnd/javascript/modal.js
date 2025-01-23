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

//Comportement MODAL (ouverture et fermeture)
let LinkModal = document.querySelector(".edit");
let modal = null;

function openModal(event) {
    event.preventDefault();
    modal = document.getElementById("modal");
    modal.classList.remove("invisible");
    modal.classList.add("modal");
    modal.removeAttribute ('aria-hidden');
    modal.setAttribute ('aria-modal', 'true');
    modal.addEventListener("click", function(event) {
        closeModal(event);
    });
    document.querySelector(".close-modal").addEventListener("click", function(event) {
        closeModal(event);
    });
    document.querySelector(".modal-box").addEventListener("click", function(event) {
        stopPropagation(event);
    });
};

function closeModal(event) {
    if (modal === null) return
    event.preventDefault();
    modal.classList.add("invisible");
    modal.classList.remove("modal");
    modal.setAttribute ('aria-hidden', 'true');
    modal.removeAttribute ('aria-modal');
    modal.removeEventListener("click", function(event) {
        closeModal(event);
    });
    document.querySelector(".close-modal").removeEventListener("click", function(event) {
        closeModal(event);
    });
    document.querySelector(".modal-box").removeEventListener("click", function(event) {
        stopPropagation(event);
    });
    modal = null;
}

function stopPropagation(event) {
    event.stopPropagation();
}

LinkModal.addEventListener("click", function(event) {
    openModal(event);
});

window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal(event);
    };
});

//Ajout automatique des projets via fetch
async function worksModal() {
    let ReponseWorks = await fetch("http://localhost:5678/api/works");
    let Works = await ReponseWorks.json();
    setModal(Works);
};
worksModal();

function setModal(data) {
    const GalleryModal = document.querySelector(".works-modal");
    GalleryModal.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        let ImageWorks = document.createElement("figure");
        ImageWorks.innerHTML = `<img src= ${data[i].imageUrl} alt= ${data[i].title}>`;
        GalleryModal.append(ImageWorks);
    }
};

//Ajout des projets à l'aide du boutton
let ButtonAdd = document.querySelector('.button-add');