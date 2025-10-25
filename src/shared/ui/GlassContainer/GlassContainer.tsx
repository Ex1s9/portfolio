import { ReactNode } from 'react';
import clsx from 'clsx';
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
    topLeftIcon,
    topRightIcon,
    bottomRightIcon1,
    bottomRightIcon2,
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
            {/* Верхние иконки */}
            <div className={styles.topIcons}>
                {topLeftIcon && (
                    <div className={styles.topLeftIcon}>
                        {topLeftIcon}
                    </div>
                )}
                {topRightIcon && (
                    <div className={styles.topRightIcon}>
                        {topRightIcon}
                    </div>
                )}
            </div>

            {/* Основной контент */}
            <div className={styles.content}>
                {children}
            </div>

            {/* Нижние правые иконки */}
            <div className={styles.bottomRightIcons}>
                {bottomRightIcon1 && (
                    <div className={styles.bottomRightIcon}>
                        {bottomRightIcon1}
                    </div>
                )}
                {bottomRightIcon2 && (
                    <div className={styles.bottomRightIcon}>
                        {bottomRightIcon2}
                    </div>
                )}
            </div>
        </div>
    );
};