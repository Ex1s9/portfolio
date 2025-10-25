import { GlassEffect } from "@/components";
import { Typography } from "@/shared/ui/typography";
import { BackgroundArc } from "@/widgets/backgoundArc/BackgroundArc";
import clsx from 'clsx';
import styles from './MainPage.module.scss';

interface MainPageProps {
    isLoaded: boolean;
}

export const MainPage = ({ isLoaded }: MainPageProps) => {
    return (
        <div className={styles.MainPage}>
            <div className={clsx(styles.textBlock, isLoaded && styles.loaded)}>
                <Typography className={styles.firstWord} as="span" fontWeight="regular" fontFamily="italiana">
                    web-
                </Typography>
                <Typography className={styles.secondWord} as="span" fontWeight="regular" fontFamily="italiana">
                    deve
                </Typography>
                <Typography className={styles.thirdWord} as="span" fontWeight="regular" fontFamily="italiana">
                    loper
                </Typography>

            </div>
            <div className={styles.centerBlock}>
                <GlassEffect
                    width={1364}
                    height={948}
                    borderRadius={50}
                    intensity={15}
                />
            </div>
            <BackgroundArc />
        </div>
    );
};