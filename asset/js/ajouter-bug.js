document.addEventListener("DOMContentLoaded", () => {
  const addBugForm = {
    form: document.querySelector(".ajouter-bug form"),
    input: {
      title: document.querySelector("#title"),
      description: document.querySelector("#description"),
    },
  };

  const redirection = () => {
    location.replace("../../pages/listes-bugs.html");
  };

  const { id, token } = getItem();

  addBugForm.form.onsubmit = (e) => {
    e.preventDefault();
    const { title, description } = addBugForm.input;

    try {
      if (isEmpty(title.value) || isEmpty(description.value)) {
        throw new Error("Les champs ne doivent pas être vide");
      }

      const body = { title: title.value, description: description.value };

      addBug(id, body)
        .then((res) => {
          Swal.fire({
            title: "Nouveau bug ajouté",
            text: `Le bug ${title.value} à bien été enregistré`,
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#1474E5",
            confirmButtonText: "OK",
          }).then((res) => {
            if (res.isConfirmed) {
              sleep(redirection, 1000);
            }
          });
        })
        .catch((error) => {
          Swal.fire({
            title: "Erreur !",
            text: error.message,
            icon: "error",
            showCancelButton: false,
            confirmButtonColor: "#1474E5",
            confirmButtonText: "OK",
          });
        });
    } catch (error) {
      Swal.fire({
        title: "Erreur !",
        text: error.message,
        icon: "error",
        showCancelButton: false,
        confirmButtonColor: "#1474E5",
        confirmButtonText: "OK",
      });
    }
  };
});
