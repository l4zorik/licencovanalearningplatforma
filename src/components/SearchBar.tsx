"use client";

import { useState } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = '🔍 Hledat v článcích...' }: SearchBarProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className="search-bar-container"
      style={{
        position: 'relative',
        width: '100%',
      }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={(e) => {
          setFocused(true);
          e.currentTarget.style.borderColor = 'var(--color-accent-primary)';
          e.currentTarget.style.background = 'var(--color-card-bg)';
          e.currentTarget.style.boxShadow = '0 0 20px var(--glow-primary)';
        }}
        onBlur={(e) => {
          setFocused(false);
          e.currentTarget.style.borderColor = 'var(--color-card-border)';
          e.currentTarget.style.background = 'var(--color-glass-bg)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        style={{
          width: '100%',
          padding: 'var(--space-4) var(--space-12) var(--space-4) var(--space-4)',
          fontSize: 'var(--text-base)',
          fontWeight: 'var(--font-medium)',
          color: 'var(--color-text-primary)',
          background: 'var(--color-glass-bg)',
          backdropFilter: 'blur(var(--glass-blur))',
          WebkitBackdropFilter: 'blur(var(--glass-blur))',
          border: '2px solid var(--color-card-border)',
          borderRadius: 'var(--radius-lg)',
          outline: 'none',
          transition: 'all var(--transition-normal)',
          cursor: 'text',
        }}
        onMouseEnter={(e) => {
          if (!focused) {
            e.currentTarget.style.borderColor = 'var(--color-accent-secondary)';
            e.currentTarget.style.background = 'var(--color-card-bg)';
          }
        }}
        onMouseLeave={(e) => {
          if (!focused) {
            e.currentTarget.style.borderColor = 'var(--color-card-border)';
            e.currentTarget.style.background = 'var(--color-glass-bg)';
          }
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 'var(--space-4)',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '1.25rem',
          opacity: value ? '0.5' : '1',
          transition: 'opacity var(--transition-normal)',
          pointerEvents: 'none',
        }}
      >
        {value ? (
          <span
            style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-tertiary)',
            }}
          >
            {value.length} výsledků
          </span>
        ) : (
          <span>🔍</span>
        )}
      </div>
      {focused && (
        <div
          style={{
            position: 'absolute',
            bottom: '-1px',
            left: '0',
            right: '0',
            height: '2px',
            background: 'var(--color-accent-gradient)',
            borderRadius: 'var(--radius-full)',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
      )}
    </div>
  );
}