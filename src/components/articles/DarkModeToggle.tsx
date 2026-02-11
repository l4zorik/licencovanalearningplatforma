'use client';

import { useDarkMode } from './DarkModeContext';

export default function DarkModeToggle() {
  const { resolvedTheme, toggleTheme } = useDarkMode();

  return (
    <button
      onClick={toggleTheme}
      className="dark-mode-toggle"
      aria-label={resolvedTheme === 'dark' ? 'Přepnout na světlý režim' : 'Přepnout na tmavý režim'}
      style={{
        background: 'var(--color-card-bg)',
        border: '1px solid var(--color-card-border)',
        borderRadius: '50%',
        width: '44px',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        color: 'var(--color-text-primary)',
        fontSize: '20px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {resolvedTheme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
