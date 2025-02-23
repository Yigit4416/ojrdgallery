import { getSingleImage } from "~/server/queries";

export default async function FullImagePageView(props:{ id: number}) {
    const image = await getSingleImage(props.id)
    return (
        <div className="flex w-full h-full min-w-0">
            <div className="flex-shrink flex justify-center items-center">
                <img src={image.url} alt="image" className="object-contain flex-shrink" />
            </div>

            <div className="flex w-48 flex-col flex-shrink-0 border-l">
                <div className="font-bold text-xl">
                    {image.name}
                </div>
            </div>
        </div>
    )
}