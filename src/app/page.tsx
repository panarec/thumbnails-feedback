import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TypographyH1 } from '@/components/ui/h1';
import { TypographyH3 } from '@/components/ui/h3';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <div className="min-h-[calc(100vh-100px)] flex items-center relative w-full px-4 md:px-10 ">
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
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <Button className="w-44">Get Started</Button>
          </div>
          <div className="relative max-md:-m-4 lg:w-full">
            <Image src="/landing.png" alt="Hero" width={1080} height={1080} />
          </div>
        </section>
      </div>
      <div className="min-h-screen flex flex-col items-center mt-10 scroll-m-32" id="how-it-works">
        <TypographyH3>How it works?</TypographyH3>
        <div className="flex flex-row gap-10 mt-24">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
