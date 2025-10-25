export const TelegramIcon = () => (
     <svg
          width={84}
          height={84}
          viewBox="0 0 84 84"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
     >
          <ellipse cx={42} cy={37.752} rx={30} ry={29.752} fill="#202020" />
          <g filter="url(#a)">
               <path
                    d="M42 8C25.44 8 12 21.44 12 38s13.44 30 30 30 30-13.44 30-30S58.56 8 42 8m13.92 20.4c-.45 4.74-2.4 16.26-3.39 21.57-.42 2.25-1.26 3-2.04 3.09-1.74.15-3.06-1.14-4.74-2.25-2.64-1.74-4.14-2.82-6.69-4.5-2.97-1.95-1.05-3.03.66-4.77.45-.45 8.13-7.44 8.28-8.07a.6.6 0 0 0-.15-.54c-.18-.15-.42-.09-.63-.06-.27.06-4.47 2.85-12.66 8.37-1.2.81-2.28 1.23-3.24 1.2-1.08-.03-3.12-.6-4.65-1.11-1.89-.6-3.36-.93-3.24-1.98.06-.54.81-1.08 2.22-1.65 8.76-3.81 14.58-6.33 17.49-7.53 8.34-3.48 10.05-4.08 11.19-4.08.24 0 .81.06 1.17.36.3.24.39.57.42.81-.03.18.03.72 0 1.14"
                    fill="#D4D0C8"
               />
          </g>
          <defs>
               <filter
                    id="a"
                    x={0}
                    y={0}
                    width={84}
                    height={84}
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
               >
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feColorMatrix
                         in="SourceAlpha"
                         values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                         result="hardAlpha"
                    />
                    <feOffset dy={4} />
                    <feGaussianBlur stdDeviation={6} />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.79 0" />
                    <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_107_85" />
                    <feBlend
                         in="SourceGraphic"
                         in2="effect1_dropShadow_107_85"
                         result="shape"
                    />
               </filter>
          </defs>
     </svg>
);
