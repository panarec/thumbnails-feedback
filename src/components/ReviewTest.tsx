'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
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
import { RadioGroup } from './ui/radio-group';
import { cn, getAlphabetByIndex } from '@/lib/utils';

const reviewSchema = z.object({
  votedThumbnailId: z.string().min(1, 'Please pick a thumbnail.'),
  comments: z.array(z.object({ thumbnailId: z.string().optional(), comment: z.string().optional() })).optional(),
});

const ReviewTest = () => {
  const { review, error, isLoading } = useReview();
  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      votedThumbnailId: '',
      comments: review?.thumbnails.map((thumbnail) => ({ thumbnailId: thumbnail.id, comment: '' })),
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
          <FormField
            control={form.control}
            name={`votedThumbnailId`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-2 gap-5"
                  >
                    {review.thumbnails.map((thumbnail, index) => (
                      <div key={thumbnail.id} className="flex flex-col gap-3">
                        <FormLabel className="text-3xl mx-auto">{getAlphabetByIndex(index)}</FormLabel>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <AspectRatio ratio={16 / 9}>
                              <Image
                                src={thumbnail.thumbnail_url}
                                alt="thumbnail-preview-image"
                                fill
                                className="rounded-md object-cover"
                              />
                              <RadioGroupPrimitive.Item
                                value={thumbnail.id}
                                className={cn('w-full h-full flex items-center justify-center absolute')}
                              >
                                <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
                                  <Image
                                    src={thumbnail.thumbnail_url}
                                    alt="thumbnail-preview-image"
                                    fill
                                    className="rounded-md object-cover border-8 border-green-500"
                                  />
                                </RadioGroupPrimitive.Indicator>
                              </RadioGroupPrimitive.Item>
                            </AspectRatio>
                          </FormControl>
                        </FormItem>

                        <h3 className="text-xl">{thumbnail.title}</h3>

                        <Accordion type="single" collapsible className="col-span-2">
                          <AccordionItem value="item-1">
                            <AccordionTrigger>Comment &#40;optional&#41;:</AccordionTrigger>
                            <AccordionContent>
                              <FormField
                                control={form.control}
                                name={`comments.${index}.comment`}
                                render={({ field }) => (
                                  <FormItem className="mt-5">
                                    <FormControl>
                                      <Textarea
                                        placeholder="Leave your thoughts..."
                                        {...field}
                                        onChange={(e) =>
                                          form.setValue(`comments.${index}`, {
                                            comment: e.target.value,
                                            thumbnailId: thumbnail.id,
                                          })
                                        }
                                      ></Textarea>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
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
          <div className="flex w-full justify-end mt-5">
            <Button type="submit">Submit</Button>
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
