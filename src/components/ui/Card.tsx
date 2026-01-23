import React, { ReactNode } from 'react';
import styles from './Card.module.css';

export type CardVariant = 'default' | 'gradient' | 'glass' | 'neon' | 'premium';
export type CardGradient = 'cosmic' | 'sunset' | 'ocean' | 'forest' | 'fire' | 'mint';

interface CardProps {
    children: ReactNode;
    variant?: CardVariant;
    gradient?: CardGradient;
    hover?: boolean;
    glow?: boolean;
    className?: string;
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
    children,
    variant = 'default',
    gradient = 'cosmic',
    hover = true,
    glow = false,
    className = '',
    onClick
}) => {
    const variantClasses = {
        default: styles.cardDefault,
        gradient: styles.cardGradient,
        glass: styles.cardGlass,
        neon: styles.cardNeon,
        premium: styles.cardPremium
    };

    return (
        <div
            className={`
        ${styles.card} 
        ${variantClasses[variant]} 
        ${hover ? styles.cardHover : ''} 
        ${glow ? styles.cardGlow : ''} 
        ${className}
      `.trim()}
            data-gradient={gradient}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            {variant === 'gradient' && (
                <div className={styles.gradientWrapper}>
                    {children}
                </div>
            )}
            {variant !== 'gradient' && children}
        </div>
    );
};

export default Card;
