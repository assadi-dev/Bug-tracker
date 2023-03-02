document.addEventListener("DOMContentLoaded", (e) => {
  const toggleMenu = document.querySelector(".toggle-menu");
  const listMenuDropdown = document.querySelector(".list-nav");
  let isOpen = false;

  /**
   *
   * Ouverture et fermeture du menu responsive
   */
  const toogleMenu = () => {
    isOpen = !isOpen;
    if (isOpen) {
      toggleMenu.classList.add("close-toggle");
      listMenuDropdown.classList.remove("close-nav");
      return;
    }

    toggleMenu.classList.remove("close-toggle");
    listMenuDropdown.classList.add("close-nav");
  };

  toggleMenu.addEventListener("click", toogleMenu);
});
