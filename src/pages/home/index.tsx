import React, { useState } from "react";

import { Button } from "@/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Select } from "@/components/Select";
import { Textarea } from "@/components/Textarea";
import styled from "@emotion/styled";
import Icon from "@/components/Icon";
import LogoImage from "@/assets/logo.png";
import { SearchBox } from "@/components/SearchBox";

type StoreInfo = {
  address: string;
  contents: string;
};

type SizePreset = "instagram" | "facebook" | "custom";
const SIZE_RATIO: Record<SizePreset, { label: string; ratio: string }> = {
  instagram: { label: "인스타그램 (1:1)", ratio: "1:1" },
  facebook: { label: "페이스북 (1.91:1)", ratio: "1.91:1" },
  custom: { label: "사용자 정의", ratio: "자유 비율" },
};
const SIZE_OPTIONS = Object.entries(SIZE_RATIO).map(([value, { label }]) => ({
  value,
  label,
}));

const INDUSTRY_OPTIONS = [
  "기타시설",
  "종교시설",
  "카페",
  "음식점",
  "숙박시설",
  "의류판매",
  "이미용업",
  "병의원",
  "공공시설",
  "실내집단운동시설",
  "호프/맥주",
  "편의점",
  "유흥주점",
  "마트",
  "관광시설",
  "약국",
  "노래연습실",
  "베이커리",
  "단란주점",
  "체육시설",
  "게임제공시설",
  "콜라텍",
  "패스트푸드",
  "목욕장업",
  "뷔페",
  "안경점",
  "행사",
  "실내체육시설",
];

export const Home = () => {
  const [promptText, setPromptText] = useState("");
  const [storeInfo, setStoreInfo] = useState<StoreInfo | null>(null);
  const [industry, setIndustry] = useState("");
  const [sizePreset, setSizePreset] = useState<SizePreset | "">("instagram");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        // 4MB limit
        setError("이미지 크기는 4MB를 초과할 수 없습니다.");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    // reset file input
    const fileInput = document.getElementById(
      "image-upload"
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  return (
    <GridRoot>
      <Card>
        <CardHeader>
          <CardTitle>새 포스터 만들기</CardTitle>
        </CardHeader>
        <CardContent>
          <Stack gap={16}>
            <SearchBox
              label="가게 이름 검색"
              placeholder="가게 이름 검색"
              searchUrl={"/search"}
              mockData={[
                {
                  address: "주소1",
                  contents: "dkwfjioe",
                },
                {
                  address: "주소2",
                  contents: "whiqghoiphqgoi",
                },
              ]}
              displayKey="address"
              selected={storeInfo}
              onSelected={setStoreInfo}
            />
            <Select
              id="industry"
              label="업종"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              disabled={isLoading}
            >
              {INDUSTRY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </Select>
            <Select
              id="size"
              label="크기"
              value={sizePreset}
              onChange={(e) => setSizePreset(e.target.value as SizePreset)}
              disabled={isLoading}
            >
              {SIZE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
            <Textarea
              id="prompt"
              label="프롬프트"
              placeholder="예: 맛있는 피자를 팔고있는 피자집,[가게 이름]브릭스피자"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              disabled={isLoading}
            />
            <div>
              <UploadLabel>이미지 업로드 (선택 사항)</UploadLabel>
              {imagePreview ? (
                <PreviewWrap>
                  <PreviewImg src={imagePreview} alt="upload preview" />
                  <PreviewRemove>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleRemoveImage}
                    >
                      제거
                    </Button>
                  </PreviewRemove>
                </PreviewWrap>
              ) : (
                <UploadBox htmlFor="image-upload">
                  <UploadInner>
                    <Icon name="upload" color="var(--color-gray)" />
                    <p
                      style={{
                        marginBottom: 8,
                        fontSize: 14,
                        color: "var(--color-gray)",
                      }}
                    >
                      <strong>클릭하여 사진을 업로드</strong>하세요
                    </p>
                    <p style={{ fontSize: 12, color: "var(--color-gray)" }}>
                      PNG, JPG, WEBP (최대 4MB)
                    </p>
                  </UploadInner>
                  <ImageInput
                    id="image-upload"
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/png, image/jpeg, image/webp"
                  />
                </UploadBox>
              )}
            </div>
          </Stack>
        </CardContent>
      </Card>
      <ImageWrapper>
        <img
          src={LogoImage}
          alt="illustration"
          style={{ maxWidth: "60%", height: "auto" }}
        />
      </ImageWrapper>
    </GridRoot>
  );
};

const GridRoot = styled.div({
  display: "grid",
  margin: "auto",
  gridTemplateColumns: "1fr 1fr",
  gap: 32,
  maxWidth: 1100,
});

const Stack = styled.div<{ gap?: number }>(({ gap = 12 }) => ({
  display: "flex",
  alignContent: "stretch",
  flexDirection: "column",
  gap,
}));

const UploadLabel = styled.label({
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  color: "var(--color-gray)",
  marginBottom: 6,
});
const PreviewWrap = styled.div({ position: "relative" });
const PreviewImg = styled.img({
  borderRadius: 12,
  width: "100%",
  height: "auto",
  maxHeight: 192,
  objectFit: "contain",
  border: "1px solid var(--color-gray2)",
});
const PreviewRemove = styled.div({ position: "absolute", top: 8, right: 8 });

const ImageInput = styled.input({
  display: "none",
});
const UploadBox = styled.label({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: 128,
  border: "2px dashed var(--color-gray2)",
  borderRadius: 12,
  background: "var(--color-gray2)",
  cursor: "pointer",
});
const UploadInner = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: 12,
  paddingBottom: 12,
});
const ImageWrapper = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export default Home;
