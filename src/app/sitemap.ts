import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/sign-in`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/sign-up`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/how-to-choose-the-best-thumbnail-for-maximum-views`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/leaderboard`,
    },
  ];
}
