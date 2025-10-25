import { Typography } from "@/shared/ui/typography";
import { GlassContainer } from "@/shared/ui/GlassContainer";
import { GitHubIcon } from "@/shared/ui/icons/GitHubIcon/GitHubIcon";
import { ThemeIcon } from "@/shared/ui/icons/ThemeIcon/ThemeIcon";
import { TelegramIcon } from "@/shared/ui/icons/TelegramIcon/TelegramIcon";
import { TranslateIcon } from "@/shared/ui/icons/TranslateIcon/TranslateIcon";
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
            <GlassContainer
                className={styles.centerBlock}
                width={1364}
                height={948}
                borderRadius={50}
                topLeftIcon={<TranslateIcon />}
                topRightIcon={<ThemeIcon />}
                bottomRightIcon1={<TelegramIcon />}
                bottomRightIcon2={<GitHubIcon />}
            >
                <div className={styles.glassContent}>
                    {/* Здесь можно добавить дополнительный контент */}
                </div>
            </GlassContainer>
            <BackgroundArc />
        </div>
    );
};