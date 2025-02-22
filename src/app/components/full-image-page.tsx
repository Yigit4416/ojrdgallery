import { getSingleImage } from "~/server/queries";

export default async function FullImagePageView(props:{ id: number}) {
    const imageUrl = await getSingleImage(props.id)
    return <img src={imageUrl} alt="image" className="w-96" />
}