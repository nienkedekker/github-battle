import React from 'react';
import { NavLink } from 'react-router-dom';
import ThemeContext from '../contexts/theme.js';

const activeStyle = {
  color: 'red',
};

export default function Nav({ toggleTheme }) {
  const theme = React.useContext(ThemeContext);

  return (
    <nav className="row space-between">
      <ul className="row nav">
        <li>
          <NavLink to="/" exact activeStyle={activeStyle} className="nav-link">
            Popular
          </NavLink>
        </li>
        <li>
          <NavLink to="/battle" activeStyle={activeStyle} className="nav-link">
            Battle
          </NavLink>
        </li>
      </ul>
      <button
        onClick={toggleTheme}
        className="btn-clear"
        style={{ fontSize: 30 }}
      >
        {theme === 'light' ? '🔦' : '💡'}
      </button>
    </nav>
  );
}
