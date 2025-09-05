import React from "react";
import styled from "@emotion/styled";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  isRequired?: boolean;
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({
  label,
  id,
  children,
  isRequired,
  className,
  ...props
}) => {
  return (
    <Wrapper>
      {label && (
        <Label htmlFor={id}>
          {label}
          {isRequired && <RequiredSpan> * 필수</RequiredSpan>}
        </Label>
      )}
      <Border>
        <StyledSelect id={id} className={className} {...props}>
          {children}
        </StyledSelect>
      </Border>
    </Wrapper>
  );
};

const Wrapper = styled.div({
  width: "100%",
});
const Label = styled.label({
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  color: "var(--color-gray)",
  marginBottom: 6,
});
const Border = styled.div({
  borderRadius: 8,
  padding: "3px 8px 3px 5px",
  border: "1px solid var(--color-gray2)",
});
const StyledSelect = styled.select({
  height: 40,
  width: "100%",
  border: "none",
  fontSize: "14px",
  "&:focus": {
    outline: "none",
    boxShadow: "0 0 0 3px rgba(137,160,107,0.12)",
    borderColor: "var(--color-main)",
  },
});

const RequiredSpan = styled.span({
  color: "var(--color-red)",
  marginLeft: 4,
});
