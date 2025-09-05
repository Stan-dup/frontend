import { useEffect, useState } from "react";

import { base64ToFile } from "@/utils/image_tool";
import { posterSetting } from "@/utils/storage";

import base64 from "./base64.json";

const Test = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  useEffect(() => {
    const request = posterSetting.get();
    if (!request || !request.base64) return;
    console.log(base64.data.slice(0, 23));
    setImageFile(base64ToFile(base64.data, "upload_image.png", false));
  }, []);

  if (!imageFile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {imageFile && <img src={URL.createObjectURL(imageFile)} alt="Poster" />}
    </div>
  );
};

export default Test;
