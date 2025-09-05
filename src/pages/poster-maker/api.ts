import { getImageDimensions } from "@/utils/image_tool";

export const fetchGeneratedPosterInfo = async (
  setResult: (result?: GeneratedPosterInfo) => void
) => {
  // TODO: storage에서 가져와서 생성 요청
  const result = {
    img: "https://d2afncas1tel3t.cloudfront.net/wp-content/uploads/%EC%A0%95%ED%86%B5%EC%97%90%EA%B7%B8%ED%83%80%EB%A5%B4%ED%8A%B8_%EC%8D%B8%EB%84%A4%EC%9D%BC1.jpg",
    textFeature: [
      {
        fontFamily: "cursive",
        fontSize: 50,
        textContent: "Sample Text 1",
        position: {
          xMin: 200.0,
          yMin: 1000.0,
          xMax: 0.0,
          yMax: 0.0,
        },
      },
      {
        fontFamily: "sans-serif",
        fontSize: 32,
        textContent: "Sample Text 1",
        position: {
          xMin: 0.0,
          yMin: 0.0,
          xMax: 0.0,
          yMax: 0.0,
        },
      },
    ],
  };
  const { width, height } = await getImageDimensions(result.img);
  const resizeRatio = Math.min(1100 / width, 615 / height);
  setTimeout(() => setResult({ ...result, width, height, resizeRatio }), 1000);
};

export type GeneratedPosterInfo = {
  img: string;
  width: number;
  height: number;
  resizeRatio: number;
  textFeature: {
    fontFamily: string;
    fontSize: number;
    textContent: string;
    position: {
      xMin: number;
      yMin: number;
      xMax: number;
      yMax: number;
    };
  }[];
};
