import { GlassContainer } from "@/shared/ui/GlassContainer";
import { Typography } from "@/shared/ui/typography";
import { BackgroundArc } from "@/widgets/backgoundArc/BackgroundArc";
import clsx from 'clsx';
import s from './MainPage.module.scss';

interface MainPageProps {
    isLoaded: boolean;
}

export const MainPage = ({ isLoaded }: MainPageProps) => {
    return (
        <div className={s.MainPage}>
            <GlassContainer
                className={s.centerBlock}
                width={1364}
                height={948}
                borderRadius={50}
            >
                <div className={clsx(s.textBlock, isLoaded && s.loaded)}>
                    <Typography className={s.firstWord} as="span" fontWeight="regular" fontFamily="italiana">
                        web-
                    </Typography>
                    <Typography className={s.secondWord} as="span" fontWeight="regular" fontFamily="italiana">
                        deve
                    </Typography>
                    <Typography className={s.thirdWord} as="span" fontWeight="regular" fontFamily="italiana">
                        loper
                    </Typography>
                </div>
            </GlassContainer>
            <BackgroundArc />
        </div>
    );
};