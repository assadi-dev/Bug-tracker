document.addEventListener("DOMContentLoaded", (e) => {
  /** si presence de token dans le local storage**/
  let isLogged = getItem();
  if (isEmpty(isLogged)) location.replace("../../index.html");

  /**Deconnexion du site */
  const logout_btn = document.querySelector(".logout_btn");

  logout_btn.onclick = () => {
    logout().then(() => {
      clearItem();
      location.replace("../../index.html");
    });
  };
});
