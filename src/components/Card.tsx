import React from "react";
import styled from "@emotion/styled";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return <StyledCard className={className}>{children}</StyledCard>;
};

export const CardHeader: React.FC<CardProps> = ({ children, className }) => (
  <Header className={className}>{children}</Header>
);

export const CardTitle: React.FC<CardProps> = ({ children, className }) => (
  <Title className={className}>{children}</Title>
);

export const CardContent: React.FC<CardProps> = ({ children, className }) => (
  <Content className={className}>{children}</Content>
);

export const CardFooter: React.FC<CardProps> = ({ children, className }) => (
  <Footer className={className}>{children}</Footer>
);

const StyledCard = styled.div({
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  padding: 24,
  marginTop: 10,
});

const Header = styled.div({ paddingBottom: 8 });
const Title = styled.h3({
  fontSize: "18px",
  fontWeight: 700,
  color: "var(--color-black)",
  margin: 0,
  marginBottom: 10,
});
const Content = styled.div({ paddingTop: 0 });
const Footer = styled.div({
  display: "flex",
  alignItems: "center",
  paddingTop: 0,
});
