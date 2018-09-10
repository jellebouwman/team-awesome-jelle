import React from 'react';
import PropTypes from 'prop-types';

import MainNavigation from './main-navigation/MainNavigation';

import './header.scss';

const Header = ({ isMenuVisible, onToggleMenu }) => (
  <header className="header">
    <div className="header__mobile-controls">
      <a
        className="header__company-logo"
        href="#link"
      >
      team awesome
      </a>

      <button
        className={`
          header__menu-button
          header__menu-button--${isMenuVisible ? 'clicked' : ''}
          `}
        type="submit"
        onClick={onToggleMenu}
      >
        <img
          alt="menu-button"
          className="menu-button__icon--open"
          width="20px"
          height="20px"
          src="/static/icons/hamburger.svg"
        />
        <img
          alt="menu-button-close"
          className="menu-button__icon--close"
          height="20px"
          width="20px"
          src="/static/icons/close.svg"
        />
      </button>
    </div>
    <MainNavigation
      isMenuVisible={isMenuVisible}
    />
  </header>
);

Header.propTypes = {
  isMenuVisible: PropTypes.bool.isRequired,
  onToggleMenu: PropTypes.func.isRequired
};

export default Header;
