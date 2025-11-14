"use client";
import { useState } from "react";
import { X } from "lucide-react";
import ShopBanner from "@/components/Shop/ShopBanner";

export default function ApplyModal() {
  const [file, setFile] = useState<File | null>(null);
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <section className="w-full">
      <ShopBanner
        title="Apply Your Job"
        desc="Search and find your best items for buy or rent"
        path="/job-service.png"
      />
      <div className="flex justify-center items-center h-[80vh] mx-4">
        <div className="w-full max-w-lg bg-white rounded-xl shadow border p-6 ">
          {/* Modal Header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold">Apply to (Company name)</h2>
            <X className="w-6 h-6 text-red-500 cursor-pointer" />
          </div>

          {/* File Preview (Shown After Upload) */}
          {file && (
            <div className="border rounded-lg p-3 flex items-center gap-3 mb-5">
              <div className="bg-red-500 text-white text-sm px-3 py-1 rounded-md">
                PDF
              </div>
              <div>
                <p className="font-medium text-sm">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / (1024 * 1024)).toFixed(1)} MB • Uploaded on 19
                  Oct 2025
                </p>
              </div>
            </div>
          )}

          {/* Upload Button */}
          <label
            htmlFor="resume-upload"
            className="cursor-pointer block w-fit bg-blue-100 text-blue-600 px-4 py-2 rounded-lg font-medium"
          >
            Upload resume
          </label>
          <input
            id="resume-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileUpload}
          />

          <p className="text-xs text-gray-500 mt-2 mb-8">
            DOC, DOCX, PDF (2 MB)
          </p>

          {/* Submit Button */}
          <button
            disabled={!file}
            className={`w-full py-3 rounded-lg text-white font-medium transition ${
              file
                ? "bg-red-600 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Submit Now
          </button>
        </div>
      </div>
    </section>
  );
}
