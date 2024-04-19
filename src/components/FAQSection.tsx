import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

export const FAQSection = () => {
  return (
    <section className="overflow-hidden scroll-m-16 bg-white" id="faq">
      <div className="py-24 px-8 max-w-7xl mx-auto ">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex flex-col text-left basis-1/2">
            <p className="inline-block font-semibold text-primary mb-2">FAQ</p>
            <h3 className="text-3xl">Frequently Asked Questions</h3>
          </div>
          <Accordion type="single" collapsible className="basis-1/2">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I get feedback?</AccordionTrigger>
              <AccordionContent>
                Thumbnails feedback is a platform that allows you to create tests with your thumbnails and get feedback
                from the community. You can create a test by uploading your thumbnails and we will share it with rest of
                the users.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it free?</AccordionTrigger>
              <AccordionContent>
                Yes, it is free to use. You can create an account and start getting feedback on your thumbnails without
                paying anything.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What is the difference between free and premium plans?</AccordionTrigger>
              <AccordionContent>
                The free plan allows you to create 3 tests with 5 reviews each. The premium plan allows you to create
                unlimited tests with unlimited reviews.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Why do I need feedback on my thumbnails?</AccordionTrigger>
              <AccordionContent>
                Thumbnails are the first thing viewers see when they come across your video. As a creator, you want to
                make sure your thumbnails are engaging and attractive to get more views.
                <br />
                <br />
                Feedback from the community can help you improve your thumbnails and increase your chances of getting
                more views.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};
