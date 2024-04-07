import { clsx } from 'clsx';

export function TypographyH1({ children, classname }: { children: React.ReactNode; classname?: string }) {
  return (
    <h1
      className={clsx(
        'font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4 flex flex-col gap-3 items-center lg:items-start',
        classname
      )}
    >
      {children}
    </h1>
  );
}
