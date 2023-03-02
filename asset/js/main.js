document.addEventListener("DOMContentLoaded", (e) => {
  /** si presence de token dans le local storage**/
  let isLogged = getItem();
  if (isEmpty(isLogged)) location.replace("../../index.html");
});
