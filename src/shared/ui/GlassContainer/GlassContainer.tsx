import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode } from 'react';
import { CircleIcon, GitHubIcon, TelegramIcon, ThemeIcon, TranslateIcon } from '../icons';
import s from './GlassContainer.module.scss';

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
        <div className={clsx(s.glassContainer, className)} style={containerStyle}>

            <div className={s.topLeftCircle}>
                <CircleIcon />
            </div>

            <div className={s.bottomLeftCircle}>
                <CircleIcon />
            </div>

            <div className={s.topRightCircle}>
                <CircleIcon />
            </div>

            <div className={s.bottomRightCircle}>
                <CircleIcon />
            </div>

            <div className={s.topIcons}>
                <div className={s.topLeftIcon}>
                    <TranslateIcon />
                </div>
                <div className={s.topRightIcon}>
                    <ThemeIcon />
                </div>
            </div>

            <div className={s.topRightButtons}>
                <Link href="/" className={s.main}> Главная </Link>
                <Link href="/" className={s.projects}> Проекты </Link>
                <Link href="/" className={s.aboutMe}> Обо мне </Link>
            </div>


            <div className={s.content}>
                {children}
            </div>

            <div className={s.bottomRightIcons}>
                <div className={s.bottomRightIcon}>
                    <TelegramIcon />
                </div>

                <div className={s.bottomRightIcon}>
                    <GitHubIcon />
                </div>
            </div>
        </div>
    );
};