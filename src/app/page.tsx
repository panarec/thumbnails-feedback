import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import GradientShape from '@/components/ui/graphics/GradientShape';
import UndulateShape from '@/components/ui/graphics/UndulateShape';
import { TypographyH1 } from '@/components/ui/h1';
import { TypographyH3 } from '@/components/ui/h3';

export default function Home() {
  return (
    <>
      <div className="min-h-[calc(100vh-100px)] flex items-center relative w-full">
        <section className="w-1/2">
          <TypographyH1>Lorem ipsum dolor sit amet.</TypographyH1>
          <p className="mt-10">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum
          </p>
        </section>
        <div className="">
          <UndulateShape className="absolute -z-10 -top-40 right-[400px] w-[200px] rotate-6" />
          <GradientShape className="absolute -z-10 -top-28 right-[-175px] w-[1000px] rotate-6" />
        </div>
      </div>
      <div className="min-h-screen flex flex-col items-center mt-10">
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
