import { clerkClient } from "@clerk/nextjs/server";
import { getSingleImage } from "~/server/queries";

export default async function FullImagePageView(props: { id: number }) {
  const image = await getSingleImage(props.id);
  const clerk = await clerkClient()
  const uploaderInfo = await clerk.users.getUser(image.userId)
  
  return (
    <div className="flex h-full w-full flex-col md:flex-row">
      <div className="flex-1 flex items-center justify-center p-4">
        <img 
          src={image.url} 
          alt={image.name}
          className="max-h-[90vh] w-auto max-w-full object-contain"
        />
      </div>

      <div className="flex w-full border-t md:w-64 md:border-l md:border-t-0">
        <div className="w-full">
          <h1 className="text-lg text-center font-medium p-4 border-b break-words">
            {image.name}
          </h1>

          <div className="flex felx-col px-2 pt-2">
            Uploaded by: {uploaderInfo.username}
          </div>

          <div className="flex felx-col px-2 pt-2">
            Uploaded on: {new Date(image.createdAt).toLocaleDateString()/* Locale yerine Local kullanırsan en ince ayrıntısana kadar verir.*/}
          </div>
        </div>
      </div>
    </div>
  );
}