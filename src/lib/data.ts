import { getServerSession } from 'next-auth';
import { db } from './db';
import { authOptions } from './auth';

export const fetchTestItems = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  const result = await db.test.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
      test_name: true,
      test_duration: true,
      video_description: true,
      thumbnails: {
        select: {
          id: true,
          title: true,
          thumbnail_url: true,
        },
      },
    },
  });

  return result;
};
