import React from 'react';
import { ThemeConsumer } from '../context/theme.js';

export default function Nav() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
        <nav className="row space-between">
          <button
            onClick={toggleTheme}
            className="btn-clear"
            style={{ fontSize: 30 }}
          >
            {theme === 'light' ? '🔦' : '💡'}
          </button>
        </nav>
      )}
    </ThemeConsumer>
  );
}
