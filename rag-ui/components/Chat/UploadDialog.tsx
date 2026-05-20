"use client";

import { Button } from "@/components/ui/button";

type Props = {
  onUpload: (file: File) => void;
};

export default function UploadDialog({ onUpload }: Props) {
  return (
    <div>
      <label>
        
        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];

            console.log("📄 FILE SELECTED:", file);

            if (!file) return;

            onUpload(file);
          }}
        />

        <Button
          type="button"
          className="bg-[#191919] text-[#FEF1D0] rounded-2xl"
          asChild
        >
          <span>Upload PDF</span>
        </Button>

      </label>
    </div>
  );
}