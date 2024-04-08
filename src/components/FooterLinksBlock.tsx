import { NavItem } from '@/types/nav';

export const FooterLinksBlock = ({ header, children }: { header: string; children: React.ReactNode }) => {
  return (
    <div className="lg:w-1/3 md:w-1/2 w-full px-4">
      <div className="opacity-50 uppercase font-semibold text-base-content tracking-widest text-sm md:text-left mb-3">
        {header}
      </div>
      <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">{children}</div>
    </div>
  );
};
