import { useRef } from "react";
import { UploadCloud } from "lucide-react";

function UploadButton({ onFilesSelected, uploading }) {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      onFilesSelected(files);
    }

    // Allow selecting the same file again
    e.target.value = "";
  };

  return (
    <>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-3 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <UploadCloud size={20} />

        {uploading ? "Uploading..." : "Upload Photos"}
      </button>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </>
  );
}

export default UploadButton;