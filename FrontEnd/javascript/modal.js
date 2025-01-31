async function getWorks() {
    let ReponseWorks = await fetch("http://localhost:5678/api/works");
    let Works = await ReponseWorks.json();
    
    setFigure(Works);
    setModal(Works);

    let trash = document.querySelectorAll('.overlay-image');
    trash.forEach((item) => item.addEventListener('click', (element) => deleteWorks(element)));
};

getWorks();

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

//COMPORTEMENT MODAL

let LinkModal = document.querySelector(".edit");
let ButtonAdd = document.querySelector('.button-add');
let Back = document.querySelector('.back');

let modal = null;
let modal2 = null;

// Fonction pour stopper la propagation
function stopPropagation(event) {
    event.stopPropagation();
};

// Fonction pour attacher l'écouteur de stopPropagation à une modal donnée
function attachStopPropagation(modalElement) {
    let modalBox = modalElement.querySelector(".modal-box");
    if (modalBox) {
        modalBox.addEventListener("click", stopPropagation);
    }
};

// Fonction d'ouverture de la première modal
function openModal(event) {
    event.preventDefault();
    modal = document.getElementById("modal");
    modal.classList.remove("invisible");
    modal.classList.add("modal");
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');

    modal.addEventListener("click", closeModal);
    document.querySelector(".close-modal").addEventListener("click", closeModal);
    
    attachStopPropagation(modal);
};

LinkModal.addEventListener("click", openModal);

// Fonction de fermeture de la première modal
function closeModal(event) {
    if (modal === null) return;
    event.preventDefault();
    modal.classList.add("invisible");
    modal.classList.remove("modal");
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');

    modal.removeEventListener("click", closeModal);
    document.querySelector(".close-modal").removeEventListener("click", closeModal);

    modal = null;
};

// Fermeture avec la touche "Escape"
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal(event);
        closeModal2(event);
    }
});

// Fonction d'ouverture de la deuxième modal
function modalAdd(event) {
    event.preventDefault();
    closeModal(event);
    modal2 = document.getElementById('modal2');
    modal2.classList.remove("invisible");
    modal2.classList.add("modal");
    modal2.removeAttribute('aria-hidden');
    modal2.setAttribute('aria-modal', 'true');

    modal2.addEventListener("click", closeModal2);
    document.querySelector(".close-modal").addEventListener("click", closeModal2);

    attachStopPropagation(modal2);
};

ButtonAdd.addEventListener('click', modalAdd);

// Fonction de fermeture de la deuxième modal
function closeModal2(event) {
    if (modal2 === null) return;
    event.preventDefault();
    modal2.classList.add("invisible");
    modal2.classList.remove("modal");
    modal2.setAttribute('aria-hidden', 'true');
    modal2.removeAttribute('aria-modal');

    modal2.removeEventListener("click", closeModal2);
    document.querySelector(".close-modal").removeEventListener("click", closeModal2);

    modal2 = null;
};

// Fonction pour revenir à la première modal depuis la deuxième
function backModal(event) {
    if (modal2 === null) return;
    event.preventDefault();
    openModal(event);
    closeModal2(event);
};

Back.addEventListener('click', backModal);


//Ajout automatique des projets via fetch
function setModal(data) {
    const GalleryModal = document.querySelector(".works-modal");
    GalleryModal.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        let ImageWorks = document.createElement("figure");
        ImageWorks.classList.add("image-container"); 
        ImageWorks.innerHTML = `
            <img class="base-image" src="${data[i].imageUrl}" alt="${data[i].title}">
            <i class="fa-solid fa-trash-can overlay-image" id="trash${data[i].id}"></i>
        `;
        GalleryModal.append(ImageWorks);
    }
};

//Fonction suppression de projets
async function deleteWorks(element) {
    const id = element.target.id.replace("trash", "");
    let DeleteApi ='http://localhost:5678/api/works/';
    const token = sessionStorage.token;

    //Appel à l'API
    const response = await fetch(DeleteApi + id, {
        method : 'DELETE',
        headers : {
            'Authorization': `Bearer ${token}`,
        }
    });

    if (response.status === 401 || response.status === 500) {
        console.log('Erreur lors de la suppression');
        return;
    }else {
        getWorks();
    }
};

//Fonction ajout de projets
// async function addWorks(element) {
//     element.preventDefault();

//     let imageValue = document.querySelector('.');
//     let titleValue = document.getElementById('title');
//     let categoryValue = document.getElementById('categories');

//     let work = {
//         image : "",
//         title : titleValue,
//         category : CategoryValue
//     };

//     let AddApi = 'http://localhost:5678/api/works/';

//     //Appel API
//     const response = await fetch(AddApi {
//         method : 'POST',
//         headers : {
//              "Content-Type": 'application/json' 
//           }
//         body : JSON.stringify(work)
//     })
// }

//Catégories select

async function selectCategories() {
    let InputCategory = document.getElementById('categories');
    let ResponseCategoriesApi = await fetch(['http://localhost:5678/api/categories']);
    let CategoriesApi = await ResponseCategoriesApi.json();
    console.log(CategoriesApi);

    InputCategory.innerHTML = "";
    
}

selectCategories();