import { clsx } from 'clsx';

export function TypographyH1({ children, classname }: { children: React.ReactNode; classname?: string }) {
  return <h1 className={clsx('text-4xl font-extrabold tracking-tight lg:text-7xl', classname)}>{children}</h1>;
}
