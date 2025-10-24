import { ReactNode } from 'react'

import clsx from 'clsx'

import s from './Typography.module.scss'

export const Typography = ({
     children,
     as = 'span',
     fontSize = 16,
     fontWeight = 'regular',
     fontFamily = 'inter',
     className,
     buttonText = false,
}: TypographyProps) => {
     const Text = as || 'span'

     return (
          <Text
               className={clsx(
                    s[`fontSize-${fontSize}`],
                    s[`fontWeight-${fontWeight}`],
                    s[`fontFamily-${fontFamily}`],
                    s.color,
                    buttonText && s.buttonText,
                    className
               )}
          >
               {children}
          </Text>
     )
}

interface TypographyProps {
     children: ReactNode
     as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div'
     fontSize?: 10 | 12 | 14 | 16 | 18 | 22 | 28
     fontWeight?: 'bold' | 'regular'
     fontFamily?: 'inter' | 'italiana'
     color?: 'white' | 'black' | 'dark'
     buttonText?: boolean
     className?: string
}
