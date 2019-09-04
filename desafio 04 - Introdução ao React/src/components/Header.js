import React from "react";

function Header() {
  return (
    <header>
      <nav>
        <img src="./assets/LogoFacebook.png" />
        <div>
          <span>Meu perfil</span>
          <i className="fas fa-user-circle"></i>
        </div>
      </nav>
    </header>
  );
}

export default Header;
