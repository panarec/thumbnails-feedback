'use client';

import Image from 'next/image';
import { AspectRatio } from '../ui/aspect-ratio';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { RadioGroup } from '../ui/radio-group';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn, getAlphabetByIndex } from '@/lib/utils';
import { useReview } from '@/hooks/useReview';
import { useRouter } from 'next/navigation';
import { useTestDetail } from '@/hooks/useTest';
import { useEffect, useState } from 'react';
import { getSession, useSession } from 'next-auth/react';
import { set } from 'date-fns';

const reviewSchema = z.object({
  votedThumbnailId: z.string().min(1, 'Please pick a thumbnail.'),
  comments: z.array(z.object({ thumbnailId: z.string().optional(), comment: z.string().optional() })).optional(),
});

export const ReviewForm = ({ testId }: { testId: string }) => {
  const router = useRouter();
  const session = getSession();
  const { test, error, isLoading } = useTestDetail(testId);
  const { review } = useReview(testId);
  const [reviewed, setReviewed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    session.then((session) => {
      const reviewed = test?.thumbnails.some((thumbnail) =>
        thumbnail.votes.some((vote) => vote.userId === session?.user.id)
      );
      setReviewed(reviewed || false);
    });
  }, [test, review]);

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      votedThumbnailId: '',
      comments: test?.thumbnails.map((thumbnail) => ({ thumbnailId: thumbnail.id, comment: '' })),
    },
  });

  const onSubmit = (data: z.infer<typeof reviewSchema>) => {
    fetch(`/api/review/${testId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        if(review){
            router.push(`/review/${review?.id}`);
        } else {
            router.push('/review');
        }
      })
      .catch((error) => console.error(error)).finally(() =>
        setSubmitting(false)
      );
      setSubmitting(true);
  };
  // If the user has already reviewed the test, redirect them to the review page
  if (reviewed) {
    router.push('/review');
  }
  if (test) {
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
                    {test.thumbnails.map((thumbnail, index) => (
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
              <AccordionContent>{test.video_description}</AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="flex w-full justify-end mt-5">
            <Button type="submit" disabled={submitting} >{submitting ? "Loading..." : "Next"}</Button>
          </div>
        </form>
      </Form>
    );
  }
};
