"use client";

interface FilterPillsProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export default function FilterPills({ categories, selectedCategory, onSelect }: FilterPillsProps) {
  const categoryColors: Record<string, string> = {
    'Všechny': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    'Vývoj': 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
    'Návrh': 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
    'Technologie': 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
    'Backend': 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    'Frontend': 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    'Funkcionalita': 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
    'AI': 'linear-gradient(135deg, #a855f7 0%, #d946ef 100%)',
    'Vzdělávání': 'linear-gradient(135deg, #14b8a6 0%, #22d3ee 100%)',
    'Analytics': 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    'Business': 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    'Kariéra': 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    'CMS': 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
    'DevOps': 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
    'UX': 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
  };

  return (
    <div
      className="filter-pills"
      style={{
        display: 'flex',
        gap: 'var(--space-2)',
        flexWrap: 'wrap',
        width: '100%',
      }}
    >
      {categories.map((category) => {
        const isSelected = selectedCategory === category;
        const gradient = categoryColors[category] || 'var(--color-accent-gradient)';

        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              fontSize: 'var(--text-sm)',
              fontWeight: isSelected ? 'var(--font-semibold)' : 'var(--font-medium)',
              background: isSelected ? gradient : 'var(--color-card-bg)',
              color: isSelected ? 'var(--color-text-inverse)' : 'var(--color-text-secondary)',
              border: isSelected ? 'none' : '1px solid var(--color-card-border)',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              transition: 'all var(--transition-normal)',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              if (!isSelected) {
                e.currentTarget.style.background = 'var(--color-card-bg-hover)';
                e.currentTarget.style.borderColor = 'var(--color-accent-secondary)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                e.currentTarget.style.background = 'var(--color-card-bg)';
                e.currentTarget.style.borderColor = 'var(--color-card-border)';
              }
            }}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}