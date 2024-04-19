import { ArrowRightIcon, CheckIcon, InfoCircledIcon, MinusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { getServerSession } from 'next-auth';

export const PricingSection = async () => {
  const session = await getServerSession();

  return (
    <>
      <section className="overflow-hidden scroll-m-16 bg-slate-100" id="pricing">
        <div className="py-24 px-8 max-w-5xl mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="max-w-xl font-bold text-3xl lg:text-5xl tracking-tight mb-8 mx-auto ">Beat the algorithm</h2>
            <div className="opacity-70 max-w-md mx-auto">
              You have only few impressions that may decide the fate of your video. Publish with confidence of knowing
              that your thumbnail is the best it can be.
            </div>
          </div>
          <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
            <div className="relative w-full max-w-lg">
              <div className="relative flex flex-col h-full gap-5 lg:gap-8 z-10 bg-white p-8 rounded-lg">
                <div className="flex flex-wrap gap-2">
                  <div className="flex flex-col justify-end mb-[4px] text-4xl sm:text-5xl ">FREE</div>
                </div>
                <TooltipProvider delayDuration={500}>
                  <ul className="space-y-2.5 leading-relaxed text-base flex-1">
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-green-500" />
                      <span>A/B testing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-green-500" />
                      <span>Comments</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <MinusIcon className="w-5 h-5" />
                      <span className="inline">3 Tests</span>
                      <Tooltip>
                        <TooltipTrigger aria-label="more info" className="cursor-default">
                          <InfoCircledIcon className="w-3 h-3 text-primary" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>You will be able to create only 3 A/B thumbnail tests</p>
                        </TooltipContent>
                      </Tooltip>
                    </li>
                    <li className="flex items-center gap-2">
                      <MinusIcon className="w-5 h-5" />
                      <span>5 Reviews</span>
                      <Tooltip>
                        <TooltipTrigger aria-label="more info" className="cursor-default">
                          <InfoCircledIcon className="w-3 h-3 text-primary" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>You will be able to get only 5 reviews per test</p>
                        </TooltipContent>
                      </Tooltip>
                    </li>
                  </ul>
                </TooltipProvider>
                <div className="space-y-2">
                  <Link href="/sign-up" className={buttonVariants({ size: 'lg' })}>
                    Okay, I&apos;ll try it
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative w-full max-w-lg shadow-xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <span className="inline-flex px-2 rounded-full text-white text-xs font-medium border-0 bg-primary whitespace-nowrap">
                  Professional&apos; s choice
                </span>
              </div>
              <div className="absolute -inset-[1px] rounded-[9px] bg-primary z-10"></div>
              <div className="relative flex flex-col h-full gap-5 lg:gap-8 z-10 bg-white p-8 rounded-lg">
                <div className="flex flex-wrap gap-2">
                  <div className="flex flex-col justify-end mb-[4px] text-lg ">
                    <p className="relative">
                      <span className="absolute bg-slate-900 h-[1.5px] inset-x-0 top-[50%]"></span>
                      <span className="opacity-80">$50</span>
                    </p>
                  </div>
                  <div className="flex flex-col justify-end mb-[4px] text-4xl sm:text-5xl">$9.99</div>
                  <div className="flex flex-col justify-center">
                    <span className="bg-emerald-400 text-slate-700 rounded-full px-3 py-1 ml-5">Save 80%</span>
                  </div>
                  <div>
                    <p className="italic">One time payment</p>
                  </div>
                </div>
                <ul className="space-y-2.5 leading-relaxed text-base flex-1">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 text-green-500" />
                    <span>A/B testing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 text-green-500" />
                    <span>Comments</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 text-green-500" />
                    <span>Unlimited tests</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 text-green-500" />
                    <span>Unlimited reviews</span>
                  </li>
                </ul>
                <div className="space-y-2">
                  {session ? (
                    <Link href="/dashboard" className={buttonVariants({ size: 'lg' })}>
                      I don&apos;t want limits
                      <ArrowRightIcon className="w-5 h-5 ml-2" />
                    </Link>
                  ) : (
                    <Link href="/sign-up?plan=premium" className={buttonVariants({ size: 'lg' })}>
                      I don&apos;t want limits
                      <ArrowRightIcon className="w-5 h-5 ml-2" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
