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

export const base64ToFile = (
  base64: string,
  filename: string,
  exceptPrefix?: boolean
): File => {
  if (!exceptPrefix) {
    base64 = `data:image/png;base64,${base64}`;
    const arr = base64.split(",");
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) {
      throw new Error("Base64 형식이 올바르지 않습니다.");
    }
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);

    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  } else {
    base64 = atob(base64);
    const arr = base64.split(",");
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) {
      throw new Error("Base64 형식이 올바르지 않습니다.");
    }
    const mime = mimeMatch[1];
    const bstr = arr[1];

    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
};

export const getImageDimensions = (
  imageSrc: string
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = () => {
      reject(new Error("이미지 로드에 실패했습니다."));
    };
  });
};

export const getFileImageDimensions = (
  file: File
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = () => {
        reject(new Error("이미지 로드에 실패했습니다."));
      };
    };
    reader.onerror = () => {
      reject(new Error("파일을 읽는 데 실패했습니다."));
    };
  });
};
