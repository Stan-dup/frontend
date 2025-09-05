import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/Card";
import { Select } from "../../components/Select";
import { Textarea } from "../../components/Textarea";
import styled from "@emotion/styled";
import Icon from "../../components/Icon_my";
import LogoImage from "../../assets/logo.png";
import { SearchBox } from "../../components/SearchBox";
import { Input } from "../../components/Input";
import { posterSetting } from "../../utils/storage";
import { fileToBase64 } from "../../utils/image_tool";

type StoreInfo = {
  phone: string;
  address: string;
  name: string;
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

const PURPOSE = ["가게소개", "신메뉴/제품", "이벤트", "공지사항"];
const MOOD = [
  "전문적이고 신뢰성 있는 분위기",
  "현대적이고 미니멀한 분위기",
  "따뜻하고 편안한 분위기",
  "활기차고 역동적인 분위기",
  "신비롭고 몽환적인 분위기",
  "독특하고 창의적인 분위기",
];

export const Home = () => {
  const [promptText, setPromptText] = useState("");
  const [storeInfo, setStoreInfo] = useState<StoreInfo>();
  const [industry, setIndustry] = useState("");
  const [purpose, setPurpose] = useState("");
  const [sizePreset, setSizePreset] = useState<SizePreset | "">("instagram");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [mainColor, setMainColor] = useState("#1976d2");
  const [mood, setMood] = useState("");
  const [imageFile, setImageFile] = useState<File>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        // 4MB limit
        alert("이미지 크기는 4MB를 초과할 수 없습니다.");
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
    setImageFile(undefined);
    setImagePreview(null);
    // reset file input
    const fileInput = document.getElementById(
      "image-upload"
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleCreatePoster = async () => {
    if (!storeInfo || !industry) {
      alert("해킹하지 마세요ㅜㅜ");
      return;
    }

    const changedImage = await fileToBase64(imageFile!)
      .then((res) => res)
      .catch(() => null);

    posterSetting.set({
      purpose,
      facilityType: industry,
      prompt: promptText,
      mainColor,
      mood,
      size: sizePreset,
      startDate,
      endDate,
      base64: changedImage ? changedImage.base64 : "",
      mimeType: changedImage ? changedImage.mimeType : "",
      storeInfo: storeInfo,
    });
    navigate("/poster-maker");
  };

  return (
    <GridRoot>
      <Card>
        <CardHeader>
          <CardTitle>내용 설정</CardTitle>
        </CardHeader>
        <CardContent>
          <Stack gap={16}>
            <SearchBox
              label="가게 이름 검색"
              isRequired
              placeholder="가게 이름 검색"
              searchUrl="/store/info"
              displayKey="address"
              selected={storeInfo}
              onSelected={setStoreInfo}
            />
            <Select
              id="industry"
              label="업종"
              isRequired
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              {INDUSTRY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </Select>
            <RowStack gap={8}>
              <Select
                id="purpose"
                label="포스터 용도"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              >
                <option value="">선택 안함</option>
                {PURPOSE.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </Select>
              {(purpose === "이벤트" || purpose === "공지사항") && (
                <Input
                  id="startDate"
                  label="시작일"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              )}
              {(purpose === "이벤트" || purpose === "공지사항") && (
                <Input
                  id="endDate"
                  label="종료일"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              )}
            </RowStack>
            <Textarea
              id="prompt"
              label="프롬프트"
              placeholder={
                purpose === ""
                  ? "만들고 싶은 포스터에 대해 자유롭게 설명해주세요"
                  : purpose === "가게소개"
                  ? "예) 우리 가게는 20년 전통의 맛집으로, 신선한 재료와 정성으로 요리합니다. 어린이 놀이방이 있습니다."
                  : purpose === "신메뉴/제품"
                  ? "예) 저희 가게는 이번에 새로 출시한 '트러플 크림 파스타'를 소개합니다. 고급 트러플 오일과 신선한 크림 소스로 깊은 맛을 자랑합니다."
                  : purpose === "이벤트"
                  ? "예) 이번 주말, 저희 가게에서는 '봄맞이 할인 이벤트'를 진행합니다. 모든 메뉴 20% 할인과 함께, 선착순 50명에게 무료 음료 쿠폰을 드립니다."
                  : purpose === "공지사항"
                  ? "예) 저희 가게는 다음 달부터 새로운 영업시간을 적용합니다. 평일은 오전 11시부터 오후 10시까지, 주말은 오전 10시부터 오후 11시까지 운영됩니다."
                  : ""
              }
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
            />
            <div>
              <UploadLabel>
                이미지 업로드 <RequiredSpan>*필수</RequiredSpan>
              </UploadLabel>
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
      <Stack gap={16}>
        <Card>
          <CardHeader>
            <CardTitle>포스터 스타일 설정</CardTitle>
          </CardHeader>
          <CardContent>
            <Stack gap={16}>
              <Select
                id="size"
                label="크기"
                value={sizePreset}
                onChange={(e) => setSizePreset(e.target.value as SizePreset)}
              >
                {SIZE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
              <RowStack gap={8}>
                <Select
                  id="mood"
                  label="디자인 분위기"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                >
                  <option value="">선택 안함</option>
                  {MOOD.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </Select>
                <Input
                  id="mainColor"
                  label="주 색상"
                  type="color"
                  value={mainColor}
                  onChange={(e) => setMainColor(e.target.value)}
                />
              </RowStack>
            </Stack>
          </CardContent>
        </Card>
        <ImageWrapper>
          <img
            src={LogoImage}
            alt="illustration"
            style={{ maxWidth: "60%", height: "auto" }}
          />
          <CreatePosterButton
            onClick={handleCreatePoster}
            disabled={!storeInfo || !industry || !imageFile}
          >
            포스터 생성{" "}
            <Icon
              name="arrow_forward"
              color="var(--color-white)"
              weight={900}
              size={32}
            />
          </CreatePosterButton>
        </ImageWrapper>
      </Stack>
    </GridRoot>
  );
};

const GridRoot = styled.div({
  position: "relative",
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
const RowStack = styled.div<{ gap?: number }>(({ gap = 12 }) => ({
  display: "flex",
  alignItems: "center",
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
const CreatePosterButton = styled(Button)({
  position: "absolute",
  bottom: 10,
  right: 10,
  fontSize: 32,
  height: "auto",
  display: "flex",
  alignItems: "center",
  gap: 8,
});

const RequiredSpan = styled.span({
  color: "var(--color-red)",
  marginLeft: 4,
});

export default Home;
