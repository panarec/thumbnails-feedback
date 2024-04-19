import Link from 'next/link';
import { buttonVariants } from './ui/button';

export const HIWSection = () => {
  return (
    <>
      <section
        id="how-it-works"
        className="overflow-hidden scroll-m-16 p-6 py-16 md:py-28 flex items-center bg-slate-100"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-16">
          <video
            src="/video_1.mp4"
            className="rounded-3xl aspect-video w-full sm:w-[20rem] lg:w-[30rem] border-slate-300 border-2 md:border-4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="space-y-6 md:space-y-8 max-w-lg">
            <h2 className="text-3xl md:text-5xl tracking-tight font-black leading-tight md:leading-tight">
              Start in seconds
            </h2>
            <p className="text-base-content-secondary leading-relaxed">
              In few clicks you can start getting feedback from community. Just create new test with thumbnails for your
              upcoming video and submit!
            </p>
            <Link href="/#pricing" className={buttonVariants()}>
              I&apos;m in!
            </Link>
          </div>
        </div>
      </section>
      <section id="how-it-works" className="overflow-hidden scroll-m-16 p-6 py-16 md:py-28 flex items-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="space-y-6 md:space-y-8 max-w-lg order-2 md:order-1">
            <h2 className="text-3xl md:text-5xl tracking-tight font-black leading-tight md:leading-tight">
              Get or give feedback
            </h2>
            <p className="text-base-content-secondary leading-relaxed">
              In one word - community. Every creator is also a viewer. Get feedback from other creators and give
              feedback to others. It&apos;s a win-win situation.
            </p>
            <Link href="/#pricing" className={buttonVariants()}>
              Say no more!
            </Link>
          </div>
          <video
            src="/video_3.mp4"
            className=" order-1 rounded-3xl aspect-video w-full sm:w-[20rem] lg:w-[30rem] border-slate-300 border-2 md:border-4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </section>
      <section
        id="how-it-works"
        className="overflow-hidden scroll-m-16 p-6 py-16 md:py-28 flex items-center bg-slate-200"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-16">
          <video
            src="/video_2.mp4"
            className="rounded-3xl aspect-video w-full sm:w-[20rem] lg:w-[30rem] border-slate-300 border-2 md:border-4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="space-y-6 md:space-y-8 max-w-lg">
            <h2 className="text-3xl md:text-5xl tracking-tight font-black leading-tight md:leading-tight">
              Analyze results
            </h2>
            <p className="text-base-content-secondary leading-relaxed">
              Analyze performance of your tests in dashboard. See how many people would click on your video based on
              thumbnail and title. Improve your work based on feedback.
            </p>
            <Link href="/#pricing" className={buttonVariants()}>
              I need this!
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
