import { url } from "inspector";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

const mockData = [
    "https://ij4eipjgdx.ufs.sh/f/7DMPrD3VFYSJS9TXkjRFf9ekPiadgN6c8yTLvmKD3qIHYuWO",
    "https://ij4eipjgdx.ufs.sh/f/7DMPrD3VFYSJdf5b7whLkAD2yGsYFaTK0pCtdSwglLE5hOxn",
    "https://ij4eipjgdx.ufs.sh/f/7DMPrD3VFYSJG9QKru7Kou7ncfBe5wXkALNJSzy02ahDVMlR"
]

const mockImages = mockData.map((url, index) => ({
    id: index + 1,
    url,
}))

export default function HomePage() {
    return (
      <main>
        <div className="flex flex-wrap gap-4">
            {mockImages.map((image) => (
              <div key={image.id} className="w-48">
                <img src={image.url} />
              </div>
            ))}
        </div>
      </main>
    );
}
