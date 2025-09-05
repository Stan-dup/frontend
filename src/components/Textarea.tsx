import React from "react";
import styled from "@emotion/styled";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, id, ...props }) => {
  return (
    <Wrapper>
      {label && <Label htmlFor={id}>{label}</Label>}
      <StyledTextarea id={id} {...props} />
    </Wrapper>
  );
};

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});
const Label = styled.label({
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  color: "var(--color-gray)",
  marginBottom: 6,
});
const StyledTextarea = styled.textarea({
  minHeight: 120,
  border: "1px solid var(--color-gray2)",
  borderRadius: 8,
  padding: "8px 12px",
  fontSize: "14px",
  "&:focus": {
    outline: "none",
    boxShadow: "0 0 0 3px rgba(137,160,107,0.12)",
    borderColor: "var(--color-main)",
  },
});
