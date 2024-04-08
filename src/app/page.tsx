import { FAQSection } from '@/components/FAQSection';
import { HIWSection } from '@/components/HIWSection';
import { PricingSection } from '@/components/PricingSection';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TypographyH1 } from '@/components/ui/h1';
import { TypographyH3 } from '@/components/ui/h3';
import { CheckIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 lg:items-center px-8 py-8 lg:py-20">
        <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
          <TypographyH1>
            <span className="relative">Get feedback</span>
            <span className="whitespace-nowrap relative ">
              <span className="mr-3 sm:mr-4 md:mr-3">before going</span>
              <span className="relative whitespace-nowrap">
                <span className="bg-white w-2.5 h-2.5 lg:w-3 lg:h-3 absolute lg:left-[1.175rem] lg:top-[0.9rem] left-[0.65rem] top-[0.5rem] rounded-full"></span>
                <span className="bg-primary w-2 h-2 lg:w-3 lg:h-3 absolute lg:left-[1.175rem] lg:top-[0.9rem] left-[0.68rem] top-[0.5rem] rounded-full animate-pulse"></span>
                <span className="text-primary">live</span>
              </span>
            </span>
          </TypographyH1>
          <p className="text-lg opacity-80 leading-relaxed">
            Get feedback before publishing your content and avoid mistakes that could cost you views.
          </p>
          <Link href="/sign-up" className={buttonVariants({ size: 'lg' })}>
            Get Started
          </Link>
        </div>
        <div className="relative max-md:-m-4 lg:w-full">
          <Image src="/landing2.png" alt="Hero" width={1080} height={1080} className="w-full max-w-xl ml-auto" />
        </div>
      </section>
      <HIWSection />
      <PricingSection />
      <FAQSection />
    </>
  );
}
