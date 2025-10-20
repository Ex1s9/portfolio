import styles from './MainPage.module.scss';
import {AnimatedTopArcIcon, AnimatedLowArcIconn} from "@/shared/icons";

export const MainPage = () => {
    return (
        <div className={styles.MainPage}>
            <AnimatedTopArcIcon 
                className={styles.topArc} 
                waveIntensity={4}
                waveSpeed={3}
                staticZone={120}
            />
            <AnimatedLowArcIconn 
                className={styles.lowArc} 
                waveIntensity={4}
                waveSpeed={3}
                staticZone={0}
            />
        </div>
    );
};