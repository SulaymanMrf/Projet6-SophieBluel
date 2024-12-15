//Récupération des données de l'API avec fetch + appel fonction setFigure
async function getWorks() {
    let Reponse = await fetch("http://localhost:5678/api/works");
    let Works = await Reponse.json();
    console.log(Works);
    setFigure(Works);
}
getWorks();

//Création des éléments et injection dans l'HTML
function setFigure(data) {
    let Gallery = document.querySelector(".gallery");

    for (let i = 0; i < data.length; i++) {
        let ImageWorks = document.createElement("figure");
        ImageWorks.innerHTML = `<img src= ${data[i].imageUrl} alt= ${data[i].title}> <figcaption> ${data[i].title} </figcaption>`;
        Gallery.append(ImageWorks);
    }
};

