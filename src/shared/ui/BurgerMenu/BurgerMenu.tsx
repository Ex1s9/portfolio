'use client';

import { useState } from 'react';
import Link from 'next/link';
import s from './BurgerMenu.module.scss';
import clsx from 'clsx';

interface BurgerMenuProps {
    className?: string;
}

export const BurgerMenu = ({ className }: BurgerMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={clsx(s.burgerMenu, className)}>
            <button 
                className={clsx(s.burger, isOpen && s.open)} 
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            {isOpen && (
                <>
                    <div className={s.overlay} onClick={toggleMenu} />
                    <div className={s.menu}>
                        <Link href="/" className={s.menuItem} onClick={toggleMenu}>
                            Главная
                        </Link>
                        <Link href="/" className={s.menuItem} onClick={toggleMenu}>
                            Проекты
                        </Link>
                        <Link href="/" className={s.menuItem} onClick={toggleMenu}>
                            Обо мне
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};