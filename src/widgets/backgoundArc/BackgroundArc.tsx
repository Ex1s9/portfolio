import { AnimatedLowArcIconn, AnimatedTopArcIcon } from "@/shared/ui/icons";
import styles from "./BackgroundArc.module.scss";

export const BackgroundArc = () => {
     return (
          <div>
               <AnimatedTopArcIcon
                    className={styles.topArc}
                    waveIntensity={4}
                    waveSpeed={3}
                    staticZone={55}
               />
               <AnimatedLowArcIconn
                    className={styles.lowArc}
                    waveIntensity={4}
                    waveSpeed={3}
                    staticZone={0}
               />
          </div>
     )
}

