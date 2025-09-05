import React from "react";
import styled from "@emotion/styled";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      className={className}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  variant: ButtonProps["variant"];
  size: ButtonProps["size"];
}>(
  ({
    variant = "primary",
    size = "md",
  }: {
    variant: ButtonProps["variant"];
    size: ButtonProps["size"];
  }) => {
    const variantStyles = {
      primary: {
        background:
          "linear-gradient(90deg, var(--color-main), var(--color-side))",
        color: "#fff",
        boxShadow: "0 8px 24px rgba(190,24,93,0.12)",
      },
      secondary: {
        background: "var(--color-gray2)",
        color: "var(--color-black)",
      },
      ghost: {
        background: "transparent",
        color: "var(--color-black)",
      },
      destructive: {
        background: "#dc2626",
        color: "#fff",
      },
    };

    const sizeStyles = {
      sm: { height: 36, padding: "0 12px" },
      md: { height: 40, padding: "6px 16px" },
      lg: { height: 44, padding: "6px 24px" },
      icon: { width: 40, height: 40, padding: 0 },
    };

    return {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.15s ease",
      outline: "none",
      border: "none",
      ...(variantStyles[variant] ?? variantStyles.primary),
      ...(sizeStyles[size] ?? sizeStyles.md),
      "&:disabled": {
        opacity: 0.5,
        pointerEvents: "none" as const,
      },
    };
  }
);
