import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic"

async function Images() {
  const images = await getMyImages();
  return (
    images.map((image) => (
      <div key={image.id} className="w-48 flex flex-col">
        <img src={image.url} />
        <div>{image.name}</div>
      </div>
    ))
  )
}

export default async function HomePage() {
  return (
    <main>
      <div className="flex flex-wrap gap-4">
        <SignedOut>
          <div className="w-full h-full text-2xl text-center">Please Sign In On Top Right Corner</div>
        </SignedOut>
        <SignedIn>
          <Images></Images>
        </SignedIn>
      </div>
    </main>
  );
}
