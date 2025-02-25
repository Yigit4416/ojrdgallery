import { clerkClient } from "@clerk/nextjs/server";
import { Button } from "~/components/ui/button";
import { getSingleImage } from "~/server/queries";
import { deleteImage } from "~/server/queries";

export default async function FullImagePageView(props: { id: number }) {
  const image = await getSingleImage(props.id);
  const clerk = await clerkClient();
  const uploaderInfo = await clerk.users.getUser(image.userId);

  return (
    <div className="flex h-full w-full flex-col md:flex-row">
      <div className="flex flex-1 items-center justify-center p-4">
        <img
          src={image.url}
          alt={image.name}
          className="max-h-[90vh] w-auto max-w-full object-contain"
        />
      </div>

      <div className="flex w-full border-t md:w-64 md:border-l md:border-t-0">
        <div className="w-full">
          <h1 className="break-words border-b p-4 text-center text-lg font-medium">
            {image.name}
          </h1>

          <div className="felx-col flex px-2 pt-2">
            Uploaded by:{" "}
            {uploaderInfo.username === null
              ? uploaderInfo.fullName
              : uploaderInfo.username}
          </div>

          <div className="felx-col flex px-2 pt-2">
            Uploaded on:{" "}
            {
              new Date(
                image.createdAt,
              ).toLocaleDateString() /* Locale yerine Local kullanırsan en ince ayrıntısana kadar verir.*/
            }
          </div>
          <div className="p-2">
            <form
              action={async () => {
                "use server";
                await deleteImage(image.id);
              }}
            >
              <Button variant="destructive">Delete</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
