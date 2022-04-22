import React from 'react';
import * as S from './button.styled';

interface ButtonProps {
  children: string;
}

const Button: React.FC <ButtonProps> = ({ children, ...props }) => (
  <S.Button {...props}>{children}</S.Button>
);

export default Button;
