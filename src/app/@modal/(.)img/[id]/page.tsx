import { getSingleImage } from "~/server/queries";

export default async function PhotoPage({
    params,
  }: {
    params: Promise<{ id: string }>;
  }) {
    
    const id = (await params).id;
    const imgUrl = await getSingleImage(Number(id))
    return (
      <div className="
      w-full
      h-full
      ">
        <img src={imgUrl} alt="img" className="
        w-96
        " />
      </div>
    );
  }