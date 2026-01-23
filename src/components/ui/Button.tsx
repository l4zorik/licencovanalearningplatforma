import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'gradient' | 'neomorph' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    gradient?: 'cosmic' | 'sunset' | 'ocean' | 'forest' | 'fire' | 'mint';
    loading?: boolean;
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    gradient = 'cosmic',
    loading = false,
    icon,
    iconPosition = 'left',
    fullWidth = false,
    className = '',
    disabled,
    ...props
}) => {
    const variantClasses = {
        primary: styles.btnPrimary,
        gradient: styles.btnGradient,
        neomorph: styles.btnNeomorph,
        outline: styles.btnOutline,
        ghost: styles.btnGhost
    };

    const sizeClasses = {
        sm: styles.btnSm,
        md: styles.btnMd,
        lg: styles.btnLg
    };

    return (
        <button
            className={`
        ${styles.btn}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${loading ? styles.btnLoading : ''}
        ${fullWidth ? styles.btnFullWidth : ''}
        ${className}
      `.trim()}
            data-gradient={gradient}
            disabled={disabled || loading}
            {...props}
        >
            {loading && (
                <span className={styles.spinner}>
                    <span className={styles.spinnerCircle} />
                </span>
            )}

            {!loading && icon && iconPosition === 'left' && (
                <span className={styles.icon}>{icon}</span>
            )}

            <span className={styles.btnText}>{children}</span>

            {!loading && icon && iconPosition === 'right' && (
                <span className={styles.icon}>{icon}</span>
            )}

            {variant === 'gradient' && <div className={styles.shimmer} />}
        </button>
    );
};

export default Button;
