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
              <AccordionTrigger>Lorem ipsum</AccordionTrigger>
              <AccordionContent>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat placeat maiores ipsa dignissimos, ad
                consectetur corporis reprehenderit suscipit error illo praesentium! Atque eligendi totam officiis
                corrupti, quae veritatis aliquam sit.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Lorem ipsum</AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad repudiandae explicabo odit quisquam
                architecto aspernatur, deserunt temporibus quod laudantium recusandae sint, aliquid illum dolore
                suscipit consequatur tenetur, doloremque enim sunt.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Lorem ipsum</AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores nemo repudiandae enim ullam minima,
                sint ipsa accusantium laborum unde animi eum quas, illum, quaerat ab ducimus blanditiis amet repellat
                totam?
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};
