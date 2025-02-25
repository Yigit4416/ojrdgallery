// This code WILL ONLY work on server side
import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { images } from "./db/schema";
import { eq, and } from "drizzle-orm";
import { redirect } from "next/navigation";
import analyticsServerClient from "./analytics";
import PostHogClient from "./analytics";

export async function getMyImages() {
  const user = await auth();

  if (!user.userId) throw new Error("Unauthorized");

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });
  return images;
}

export async function getSingleImage(photoId: number) {
  const user = await auth();

  if (!user.userId) throw new Error("Unauthorized");
  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, photoId),
  });

  if (!image) throw new Error("İmage not found");
  if (image.userId !== user.userId) throw new Error("Unauthorized");

  return image;
}

export async function deleteImage(id: number) {
  const user = await auth();
  if (!user.userId) throw new Error("Unauthorized");

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

  const posthog = PostHogClient();
  posthog.capture({
    distinctId: user.userId,
    event: "delete_image",
    properties: {
      // buraya başka başka bilgiler koyabilirsin senin keyfine kalmış
      imageId: id,
    },
  });
  redirect("/");
}
