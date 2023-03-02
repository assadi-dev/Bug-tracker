document.addEventListener("DOMContentLoaded", (e) => {
  /**Objet contenant les éléments du formulaire de connexion */
  const connexionCard = {
    form: document.querySelector(".connexion-card"),
    input: {
      username: document.querySelector("#username"),
      password: document.querySelector("#password"),
      confirm: document.querySelector("#confirm"),
    },
    error: document.querySelector(".connexion-card .error-validation"),
  };

  /** Authentification **/
  connexionCard.form.onsubmit = async (e) => {
    e.preventDefault();
    const { username, password, confirm } = connexionCard.input;

    try {
      connexionCard.error.textContent = "";
      if (isEmpty(username.value) || isEmpty(password.value)) {
        throw new Error("les champs ne doivent pas être vide");
      }

      if (password.value != confirm.value) {
        throw new Error("les mot de passe ne sont pas identique");
      }

      const res = await signUp(username.value, password.value);
      const status = res.data.result.status;

      /**En cas de succes */
      const { token, id } = res.data.result;
      const storeData = { id, token };
      setItem(storeData);
      location.replace("../../pages/listes-bugs.html");
    } catch (error) {
      connexionCard.error.textContent = error.message;
    }
  };
});
