import React from "react";
import styled from "@emotion/styled";
import Icon from "@/components/Icon";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: string;
  isRequired?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  id,
  value,
  icon,
  isRequired = false,
  placeholder,
  onChange,
  ...props
}) => {
  return (
    <Wrapper>
      {(label || isRequired) && (
        <Label htmlFor={id}>
          {label}
          <RequiredSpan>{isRequired && " *필수"}</RequiredSpan>
        </Label>
      )}
      <InputWrapper>
        <StyledInput
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
        />
        {icon && (
          <IconWrapper>
            <Icon name={icon} color="var(--color-gray)" />
          </IconWrapper>
        )}
      </InputWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  width: "100%",
});
const Label = styled.label({
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  color: "var(--color-gray)",
  marginBottom: 6,
});
const InputWrapper = styled.div({
  position: "relative",
  display: "flex",
  flexDirection: "column",
});
const StyledInput = styled.input({
  height: 40,
  border: "1px solid var(--color-gray2)",
  borderRadius: 8,
  padding: "3px 10px",
  fontSize: "14px",
  "&:focus": {
    outline: "none",
    boxShadow: "0 0 0 3px rgba(137,160,107,0.12)",
    borderColor: "var(--color-main)",
  },
});
const IconWrapper = styled.div({
  position: "absolute",
  right: 5,
  top: "calc(50% - 14px)",
});

const RequiredSpan = styled.span({
  color: "var(--color-red)",
  marginLeft: 4,
});
