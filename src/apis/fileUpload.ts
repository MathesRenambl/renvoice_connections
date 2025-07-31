// src/api/uploadFile.ts

import { getFromLocalStorage } from "@/components/encryption/encryption";

export const uploadFileApi = async (file: File): Promise<Response | null> => {
  if (!file) return null;

  const token = getFromLocalStorage("token");
  if (!token) return null;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/internal/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    return response;
  } catch (error) {
    console.error("Upload failed", error);
    return null;
  }
};
