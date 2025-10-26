import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode } from 'react';
import { CircleIcon, GitHubIcon, TelegramIcon, ThemeIcon, TranslateIcon } from '../icons';
import styles from './GlassContainer.module.scss';

interface GlassContainerProps {
    children: ReactNode;
    className?: string;
    topLeftIcon?: ReactNode;
    topRightIcon?: ReactNode;
    bottomRightIcon1?: ReactNode;
    bottomRightIcon2?: ReactNode;
    width?: number | string;
    height?: number | string;
    minWidth?: number | string;
    minHeight?: number | string;
    borderRadius?: number;
}

export const GlassContainer = ({
    children,
    className,
    width = 'auto',
    height = 'auto',
    minWidth,
    minHeight,
    borderRadius = 50,
}: GlassContainerProps) => {
    const containerStyle = {
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth,
        minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
        borderRadius: `${borderRadius}px`,
    };

    return (
        <div className={clsx(styles.glassContainer, className)} style={containerStyle}>

            <div className={styles.topLeftCircle}>
                <CircleIcon />
            </div>

            <div className={styles.bottomLeftCircle}>
                <CircleIcon />
            </div>

            <div className={styles.bottomRightCircle}>
                <CircleIcon />
            </div>

            {/* Верхние иконки */}
            <div className={styles.topIcons}>
                <div className={styles.topLeftIcon}>
                    <TranslateIcon />
                </div>
                <div className={styles.topRightIcon}>
                    <ThemeIcon />
                </div>
            </div>

            <div className={styles.topRightButtons}>
                <Link href="/about" className={styles.main}> О нас </Link>
                <Link href="/projects" className={styles.projects}> Проекты </Link>
                <Link href="/contact" className={styles.aboutMe}> Контакты </Link>
            </div>

            {/* Основной контент */}
            <div className={styles.content}>
                {children}
            </div>

            {/* Нижние правые иконки */}
            <div className={styles.bottomRightIcons}>
                <div className={styles.bottomRightIcon}>
                    <TelegramIcon />
                </div>

                <div className={styles.bottomRightIcon}>
                    <GitHubIcon />
                </div>
            </div>
        </div>
    );
};