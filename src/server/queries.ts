// This code WILL ONLY work on server side
import 'server-only';
import { db } from './db';
import { auth } from '@clerk/nextjs/server';

export async function getMyImages() {
    const user = await auth()

    if(!user.userId) throw new Error("Unauthorized")

    const images = await db.query.images.findMany({
        where: (model, { eq }) => eq(model.userId, user.userId),
        orderBy: (model, { desc }) => desc(model.id)
      });
    return images;
}

export async function getSingleImage(photoId: number) {
  const user = await auth()

  if(!user.userId) throw new Error("Unauthorized")
  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, photoId),
  })

  if (!image) throw new Error("İmage not found")
  if(image.userId !== user.userId) throw new Error("Unauthorized")

  return image.url;
}