import clsx from 'clsx';
import { FC, ReactNode } from 'react';

interface TypographyH3Props {
  children: ReactNode;
  classname?: string;
}

export const TypographyH3: FC<TypographyH3Props> = ({ children, classname }) => {
  const classes = clsx('scroll-m-20 text-2xl font-semibold tracking-tight', classname);
  return <h3 className={classes}>{children}</h3>;
};
