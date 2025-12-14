import { AnimatedLowArcIconn, AnimatedTopArcIcon } from "@/shared/ui/icons";
import s from "./BackgroundArc.module.scss";

export const BackgroundArc = () => {
     return (
          <div>
               <AnimatedTopArcIcon
                    className={s.topArc}
                    waveIntensity={4}
                    waveSpeed={3}
                    staticZone={55}
               />
               <AnimatedLowArcIconn
                    className={s.lowArc}
                    waveIntensity={4}
                    waveSpeed={3}
                    staticZone={0}
               />
          </div>
     )
}

