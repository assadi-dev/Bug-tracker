document.addEventListener("DOMContentLoaded", (e) => {
  /**Objet contenant les éléments du formulaire de connexion */
  const connexionCard = {
    form: document.querySelector(".connexion-card"),
    input: {
      username: document.querySelector("#username"),
      password: document.querySelector("#password"),
    },
    error: document.querySelector(".connexion-card .error-validation"),
  };

  /** Authentification **/
  connexionCard.form.onsubmit = async (e) => {
    e.preventDefault();
    const { username, password } = connexionCard.input;

    try {
      connexionCard.error.textContent = "";
      if (isEmpty(username.value) || isEmpty(password.value)) {
        throw new Error("les champs ne doivent pas être vide");
      }

      const res = await login(username.value, password.value);
      const status = res.data.result.status;
      if (status == "failure") {
        throw new Error(
          `L'utilisateur ${username.value} est introuvable ou mot de passe incorrect`
        );
      }

      /**En cas de succes */
      const { token, id } = res.data.result;
      const storeData = { id, token };
      setItem(storeData);
      location.replace("../../pages/listes-bugs.html");
    } catch (error) {
      connexionCard.error.textContent = error.message;
    }
  };

  /** si presence de token dans le local storage**/

  let isLogged = getItem();

  if (!isEmpty(isLogged)) location.replace("../../pages/listes-bugs.html");
});
