"use client";

import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { toast } from "sonner";
import { useUploadThing } from "~/utils/uploadthing";

// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.routeConfig?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

export function UploadSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
      />
    </svg>
  );
}
// TODO: Make it avaliable for multiple uploads
export default function SimpleUploadButton() {
  const posthog = usePostHog();

  // select next/navigation BE CAREFUL
  const router = useRouter();

  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onUploadBegin() {
      // Captures upload button press
      posthog.capture("uplaod_begin");
      toast.success("Upload begins", {
        id: "upload-begin",
      });
    },
    onUploadProgress(progress) {
      if (progress !== 0)
        toast.info(`%${progress}`, {
          id: "upload-progres",
        });
    },
    onClientUploadComplete() {
      toast.success("Upload finished", { id: "upload-finish" });
      router.refresh();
    },
    onUploadError(error) {
      console.log(error)
      toast.dismiss("upload-begin")
      posthog.capture("upload rate limiter hit")
    }
  });

  return (
    <div>
      <button>
        <label htmlFor="upload-button" className="cursor-pointer">
          <UploadSVG />
        </label>
        <input
          id="upload-button"
          type="file"
          className="sr-only"
          {...inputProps}
        />
      </button>
    </div>
  );
}
