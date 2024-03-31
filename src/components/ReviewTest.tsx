'use client';

import { useReview } from '@/hooks/useReview';
import { AspectRatio } from './ui/aspect-ratio';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Textarea } from './ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

const reviewSchema = z.object({
  votedThumbnailId: z.string(),
  comments: z.array(z.object({ thumbnailId: z.string(), comment: z.string() })),
});

const ReviewTest = () => {
  const { review, error, isLoading } = useReview();
  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      votedThumbnailId: '',
      comments: [],
    },
  });

  if (error) {
    return <div className="flex justify-center items-center">Something went wrong. Please try again later.</div>;
  }

  if (isLoading) {
    return <div>Is loading</div>;
  }

  const onSubmit = async (data: z.infer<typeof reviewSchema>) => {
    console.log(data);
  };

  if (review) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-10">
          <div className="flex w-full justify-end mb-5">
            <Button type="submit" disabled>
              Submit
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name={`votedThumbnailId`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment &#40;optional&#41;:</FormLabel>
                  <FormControl>
                    <RadioGroup>
                      {review.thumbnails.map((thumbnail, index) => (
                        <div key={thumbnail.id} className="flex flex-col gap-3">
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="all" />
                              {/* THIS */}
                              <AspectRatio ratio={16 / 9} className="hover:scale-105 transition-all cursor-pointer">
                                <Image
                                  src={thumbnail.thumbnail_url}
                                  alt="thumbnail-preview-image"
                                  fill
                                  className="rounded-md object-cover"
                                />
                              </AspectRatio>
                            </FormControl>
                            <FormLabel className="font-normal">All new messages</FormLabel>
                          </FormItem>

                          <h3 className="text-xl">{thumbnail.title}</h3>

                          <FormField
                            control={form.control}
                            name={`comments.${index}.comment`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Comment &#40;optional&#41;:</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Leave your thoughts..."></Textarea>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Accordion type="single" collapsible className="col-span-2">
              <AccordionItem value="item-1">
                <AccordionTrigger>Video description</AccordionTrigger>
                <AccordionContent>{review.video_description}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </form>
      </Form>
    );
  }

  if (!review) {
    return (
      <div className="w-full flex items-center gap-3 flex-col">
        <h3 className="text-4xl after:content-['\01F60E'] after:ml-2">No reviews needed</h3>
      </div>
    );
  }
};

export default ReviewTest;
