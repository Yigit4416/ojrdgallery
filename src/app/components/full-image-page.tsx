import { getSingleImage } from "~/server/queries";

export default async function FullImagePageView(props: { id: number }) {
  const image = await getSingleImage(props.id);
  
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
        <div className="w-full p-4 text-center break-words">
          {image.name}
        </div>
      </div>
    </div>
  );
}