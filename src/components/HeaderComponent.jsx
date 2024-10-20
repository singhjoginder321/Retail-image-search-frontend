import React from "react";
import "../style/HeaderComponent.css";

const HeaderComponent = ({ onSignOut }) => {
  return (
    <header className="app-header">
      <h1>Retail Image Search</h1>
      <button className="signout-button" onClick={onSignOut}>
        Sign Out
      </button>
    </header>
  );
};

export default HeaderComponent;
