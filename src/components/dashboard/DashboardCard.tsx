import React, { ReactNode } from 'react';
import Card from '../ui/Card';
import styles from './DashboardCard.module.css';

interface DashboardCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon?: ReactNode;
    gradient?: 'cosmic' | 'sunset' | 'ocean' | 'forest' | 'fire' | 'mint';
    trend?: {
        value: number;
        label: string;
    };
    onClick?: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
    title,
    value,
    subtitle,
    icon,
    gradient = 'cosmic',
    trend,
    onClick
}) => {
    return (
        <Card variant="premium" gradient={gradient} hover onClick={onClick}>
            <div className={styles.dashboardCard}>
                <div className={styles.header}>
                    {icon && (
                        <div
                            className={styles.iconWrapper}
                            data-gradient={gradient}
                        >
                            {icon}
                        </div>
                    )}
                    <div className={styles.headerText}>
                        <h3 className={styles.title}>{title}</h3>
                        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                    </div>
                </div>

                <div className={styles.content}>
                    <div className={`${styles.value} animate-fade-in`}>
                        {value}
                    </div>

                    {trend && (
                        <div className={`${styles.trend} ${trend.value >= 0 ? styles.trendUp : styles.trendDown}`}>
                            <span className={styles.trendIcon}>
                                {trend.value >= 0 ? '↑' : '↓'}
                            </span>
                            <span className={styles.trendValue}>
                                {Math.abs(trend.value)}%
                            </span>
                            <span className={styles.trendLabel}>{trend.label}</span>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default DashboardCard;
