import { fetchInstance } from "@/utils/axios_instance";
import { base64ToFile, getFileImageDimensions } from "@/utils/image_tool";
import { posterSetting } from "@/utils/storage";

export const fetchGeneratedPosterInfo = async (
  setResult: (result?: GeneratedPosterInfo) => void
) => {
  const request = posterSetting.get();
  if (!request || !request.base64) return;
  const formData = new FormData();
  formData.append("img", base64ToFile(request.base64, "upload_image.png"));
  formData.append(
    "request",
    new Blob(
      [
        JSON.stringify({
          purpose: request.purpose,
          facilityType: request.facilityType,
          prompt: request.prompt || "",
          mainColor: request.mainColor || "",
          mood: request.mood || "",
          size: request.size,
          startDate: request.startDate,
          endDate: request.endDate,
          storeInfo: request.storeInfo,
        }),
      ],
      { type: "application/json" }
    )
  );

  fetchInstance({ headers: { "Content-Type": "multipart/form-data" } })
    .post("/proxy", formData)
    .then(async (response) => {
      const _result: _GeneratedPosterInfo = response.data;
      const result = {
        ..._result,
        img: base64ToFile(_result.img, "result_image.png"),
      };
      const { width, height } = await getFileImageDimensions(result.img);
      const resizeRatio = Math.min(1100 / width, 615 / height);
      setResult({ ...result, width, height, resizeRatio });
    })
    .catch((error) => {
      console.error("Error fetching generated poster info:", error);
      setResult(undefined);
    });
};

type _GeneratedPosterInfo = {
  img: string;
  width: number;
  height: number;
  resizeRatio: number;
  textFeature: {
    fontFamily: string;
    fontSize: number;
    color: string;
    textContent: string;
    position: {
      xMin: number;
      yMin: number;
      xMax: number;
      yMax: number;
    };
  }[];
};

export type GeneratedPosterInfo = {
  img: File;
  width: number;
  height: number;
  resizeRatio: number;
  textFeature: {
    fontFamily: string;
    fontSize: number;
    color: string;
    textContent: string;
    position: {
      xMin: number;
      yMin: number;
      xMax: number;
      yMax: number;
    };
  }[];
};
