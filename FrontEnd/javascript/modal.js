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
    document.querySelector(".close-modal2").addEventListener("click", closeModal2);

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
    document.querySelector(".close-modal2").removeEventListener("click", closeModal2);

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
    let url =`http://localhost:5678/api/works/${id}`;
    const token = sessionStorage.token;

    //Appel à l'API
    const response = await fetch(url, {
        method : 'DELETE',
        headers : {
            'Authorization': `Bearer ${token}`,
        }
    });

    if (response.status >= 300) {
        console.log('Erreur lors de la suppression');
        return;
    }else {
        getWorks();
    }
};

const uploadBtn = document.querySelector('.upload-btn');
const fileInput = document.getElementById('fileInput');
const addImageDiv = document.querySelector(".add-image");

//Event affichage image modale ajout de photo
let selectedFile = null; 

document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("fileInput");
    const imageLoaded = document.querySelector(".image-loaded");
    const addImageDiv = document.querySelector(".add-image");

    fileInput.addEventListener("change", function (event) {
        selectedFile = event.target.files[0]; // Stocke le fichier globalement

        if (selectedFile && selectedFile.type.startsWith("image/")) {
            const reader = new FileReader();

            reader.onload = function (e) {
                console.log("Image en binaire:", e.target.result); // Affiche les données binaires
                
                // Ajout de l'image dans l'interface
                let existingImg = imageLoaded.querySelector("img");
                if (!existingImg) {
                    existingImg = document.createElement("img");
                    imageLoaded.appendChild(existingImg);
                }
                existingImg.src = URL.createObjectURL(selectedFile); // Affiche l'image
            };

            addImageDiv.classList.add('invisible');
            imageLoaded.classList.remove("invisible");

            reader.readAsArrayBuffer(selectedFile); // Convertit en binaire
        }
    });
});


//Bloque la propagation du clic
fileInput.addEventListener('click', function(event) {
    event.stopPropagation(); 
});


//Event click sur le boutton
uploadBtn.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    fileInput.click();
});

//Catégories select
let ResponseCategoriesApi = await fetch(['http://localhost:5678/api/categories']);
    let CategoriesApi = await ResponseCategoriesApi.json();

async function selectCategories(data) {
    let InputCategory = document.getElementById('categories');
    InputCategory.innerHTML = "";
    
    const empty = document.createElement("option");
    empty.innerHTML = "";
    InputCategory.append(empty);

    for (let i = 0; i < data.length; i++) {
        let Categories = document.createElement("option");
        Categories.innerHTML = `${data[i].name}`;
        InputCategory.append(Categories);
    }
};

selectCategories(CategoriesApi);

function getCategoryId(category) {
    if (category === 'Objets') return 1
    if (category === 'Appartements') return 2
    if (category === 'Hotels & restaurants') return 3
    return 0
}

//Fonction ajout de projets
async function addWorks(event) {
    event.preventDefault();

    const AddApi = 'http://localhost:5678/api/works';
    const titleValue = document.getElementById('title').value;
    const categoryValue = document.getElementById('categories').value;
    const token = sessionStorage.getItem("token");
    

    if (!selectedFile || !titleValue || !categoryValue) {
        console.log('Il manque des éléments pour ajouter un projet');
        return;
    }


    const formData = new FormData();
    formData.append('image', selectedFile); 
    formData.append('title', titleValue);
    formData.append('category', getCategoryId(categoryValue));

    try {
        const response = await fetch(AddApi, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}` 
            },
            body: formData
        });

        if (response.status >= 300) {
            console.log("Erreur lors de l'ajout:", response.statusText);
        } else {
            console.log("Projet ajouté avec succès !");
            getWorks();     
            cleanValues();
        }
    } catch (error) {
        console.error("Erreur réseau :", error);
    }
};

document.querySelector(".button-valid").addEventListener('click', addWorks);

function cleanValues() {
    selectedFile = null;
    fileInput.value = ""; 
    titleInput.value = ""; 
    categorySelect.value = ""; 

    document.querySelector(".image-loaded").classList.add("invisible"); // Cacher l'aperçu de l'image
    document.querySelector(".add-image").classList.remove("invisible"); // Réafficher l'ajout d'image
    document.querySelector(".image-loaded").innerHTML = ""; 

    updateButtonState();
}


// Sélection des éléments
const titleInput = document.getElementById("title");
const categorySelect = document.getElementById("categories");
const validateButton = document.querySelector(".button-valid");

// Fonction pour vérifier si tous les champs sont remplis
function updateButtonState() {
    const selectedFile = fileInput.files.length > 0;
    const titleValue = titleInput.value.trim(); // Trim pour éviter les espaces vides
    const categoryValue = categorySelect.value;

    if (selectedFile && titleValue && categoryValue) {
        validateButton.classList.remove("button-color"); 
    } else {
        validateButton.classList.add("button-color"); 
    }
}

// Ajout des écouteurs d'événements
fileInput.addEventListener("change", updateButtonState);
titleInput.addEventListener("input", updateButtonState);
categorySelect.addEventListener("change", updateButtonState);

// Vérification initiale au cas où des valeurs sont déjà présentes
updateButtonState();
