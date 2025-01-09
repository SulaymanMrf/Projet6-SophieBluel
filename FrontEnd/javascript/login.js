const LoginApi = 'http://localhost:5678/api/users/login';

let form = document.getElementById("form-login");

//Evènement au submit du formulaire
form.addEventListener("submit", authenthification);

//Création fonction d'authentification
async function authenthification(event) {
    //Eviter le comportement par défaut du navigateur
    event.preventDefault();
    
    let emailValue = document.getElementById("email").value;
    let passwordValue = document.getElementById("password").value;

    let user = {
        email : emailValue,
        password : passwordValue,
    };

    //Appel à l'API
    const response = await fetch(LoginApi, {
        method : 'POST',
        headers : { 
            "Content-Type": 'application/json' 
        },
        body : JSON.stringify(user),
    });

    // Supprimer un ancien message d'erreur s'il existe (CHATGPT)
    let existingError = document.querySelector('.error-login');
    if (existingError) {
        existingError.remove();
    }

    if (form) {
        if (response.status !== 200) {
            //SI échec de la connexion, création du message d'erreur
            const error = document.createElement("div");
            error.classList.add('error-login');
            error.innerHTML= 'Erreur dans l’identifiant ou le mot de passe!';
            form.appendChild(error);
            console.log('Erreur de la connexion',response);
        } else {
            let result = await response.json();
            const token = result.token;
            console.log(token);
            sessionStorage.setItem("token", token);
            window.location.href="connected.html"
        }
    }
};
