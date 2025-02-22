import FullImagePageView from "~/app/components/full-image-page";

export default async function PhotoPage({
    params,
  }: {
    params: Promise<{ id: string }>;
  }) {
    
    const id = (await params).id;
    return <FullImagePageView id={Number(id)} />
  }