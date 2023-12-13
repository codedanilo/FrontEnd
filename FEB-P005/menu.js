document.addEventListener('DOMContentLoaded', function () {
    const menuList = document.querySelector('.menu-list');
    const menuIcon = document.querySelector('.menu-icon');
  
    let isMenuOpen = false;
  
    menuIcon.addEventListener('click', function () {
      isMenuOpen = !isMenuOpen;
      if (isMenuOpen) {
        menuList.style.display = 'block';
      } else {
        menuList.style.display = 'none';
      }
    });
  
    document.addEventListener('click', function (event) {
      if (!menuIcon.contains(event.target) && !menuList.contains(event.target)) {
        menuList.style.display = 'none';
        isMenuOpen = false;
      }
    });
  
    // Abrir o menu em telas menores
    const screenWidth = window.innerWidth;
    if (screenWidth <= 500) {
      menuList.style.display = 'none'; // Oculta o menu inicialmente em telas menores
      menuList.style.display = 'block'; // Mostra o menu ao clicar no ícone do menu
    }
  });
  