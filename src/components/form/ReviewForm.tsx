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
import { use, useEffect, useState } from 'react';
import { useReviews } from '@/hooks/useReviews';
import { useSWRConfig } from 'swr';

const reviewSchema = z.object({
  votedThumbnailId: z.string().min(1, 'Please pick a thumbnail.'),
  comments: z
    .array(
      z
        .object({
          thumbnailId: z.string().optional(),
          comment: z
            .string()
            .max(500, {
              message: 'Comment must be at most 500 characters.',
            })
            .optional(),
        })
        .optional()
    )
    .optional(),
});

export const ReviewForm = () => {
  const { reviews } = useReviews();
  const { mutate } = useSWRConfig();
  const [currentReview, setCurrentReview] = useState<{
    id: string;
    createdAt: Date;
    expiresAt: Date;
    video_description: string;
    user: {
      id: string;
      tier: string;
    };
    thumbnails: {
      id: string;
      thumbnail_url: string;
      title: string;
      votes: {
        createdAt: Date;
        userId: string;
      }[];
    }[];
  }>();

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      votedThumbnailId: '',
      comments: [],
    },
  });

  useEffect(() => {
    setCurrentReview(reviews?.[0]);
  }, [reviews]);

  const onSubmit = (data: z.infer<typeof reviewSchema>) => {
    // try {
    //   reviewSchema.parse(data);
    // } catch (error) {
    //   console.error(error);
    //   return;
    // }

    const newTests = reviews?.filter((review) => review.id !== currentReview?.id);
    mutate('/api/reviews', newTests);
    fetch(`/api/review/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        mutate('/api/reviews');
      })
      .catch((error) => console.error(error));
  };

  if (currentReview) {
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
                    className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                  >
                    {currentReview.thumbnails.map((thumbnail, index) => (
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
              <AccordionContent>
                {currentReview.video_description ? currentReview.video_description : 'No description'}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="flex w-full justify-end mt-5">
            <div className="flex flex-col justify-center gap-2">
              <Button type="submit">Next</Button>
              {reviews && reviews.length > 1 && <div className="font-sans italic">{reviews.length - 1} more left</div>}
            </div>
          </div>
        </form>
      </Form>
    );
  }
};
