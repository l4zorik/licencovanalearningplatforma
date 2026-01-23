import React from 'react';
import styles from './Progress.module.css';

interface ProgressProps {
    value: number;
    max?: number;
    gradient?: 'cosmic' | 'sunset' | 'ocean' | 'forest' | 'fire' | 'mint';
    showLabel?: boolean;
    animated?: boolean;
    height?: 'sm' | 'md' | 'lg';
    className?: string;
}

const Progress: React.FC<ProgressProps> = ({
    value,
    max = 100,
    gradient = 'cosmic',
    showLabel = false,
    animated = true,
    height = 'md',
    className = ''
}) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    const heightClasses = {
        sm: styles.progressSm,
        md: styles.progressMd,
        lg: styles.progressLg
    };

    return (
        <div className={`${styles.progressWrapper} ${className}`}>
            <div className={`${styles.progress} ${heightClasses[height]}`}>
                <div
                    className={`${styles.progressBar} ${animated ? styles.progressAnimated : ''}`}
                    data-gradient={gradient}
                    style={{ width: `${percentage}%` }}
                >
                    {showLabel && height !== 'sm' && (
                        <span className={styles.progressLabel}>
                            {Math.round(percentage)}%
                        </span>
                    )}
                </div>
            </div>
            {showLabel && (
                <div className={styles.labelWrapper}>
                    <span className={styles.labelText}>{value} / {max}</span>
                </div>
            )}
        </div>
    );
};

export default Progress;
