import React, { ReactNode } from 'react';
import styles from './Badge.module.css';

export type BadgeVariant = 'default' | 'gradient' | 'glow' | 'outline';
export type BadgeColor = 'primary' | 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps {
    children: ReactNode;
    variant?: BadgeVariant;
    color?: BadgeColor;
    gradient?: 'cosmic' | 'sunset' | 'ocean' | 'forest' | 'fire' | 'mint';
    icon?: ReactNode;
    pulse?: boolean;
    className?: string;
}

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'default',
    color = 'primary',
    gradient = 'cosmic',
    icon,
    pulse = false,
    className = ''
}) => {
    const variantClasses = {
        default: styles.badgeDefault,
        gradient: styles.badgeGradient,
        glow: styles.badgeGlow,
        outline: styles.badgeOutline
    };

    return (
        <span
            className={`
        ${styles.badge}
        ${variantClasses[variant]}
        ${pulse ? styles.badgePulse : ''}
        ${className}
      `.trim()}
            data-color={color}
            data-gradient={gradient}
        >
            {icon && <span className={styles.badgeIcon}>{icon}</span>}
            {children}
        </span>
    );
};

export default Badge;
