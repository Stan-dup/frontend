export const downloadImage = (imageUrl: string, filename: string) => {
  const link = document.createElement("a");
  link.href = imageUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const fileToBase64 = (
  file: File
): Promise<{ base64: string; mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const [, base64] = result.split(",");
      if (!base64) {
        reject(new Error("Base64 변환에 유효하지 않은 파일 형식입니다."));
        return;
      }
      resolve({ base64, mimeType: file.type });
    };
    reader.onerror = (error) => reject(error);
  });
};
