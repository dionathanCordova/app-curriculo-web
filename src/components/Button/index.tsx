import React, { ButtonHTMLAttributes, HTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{};

const Button: React.FC<ButtonProps> = ({type, children}: ButtonProps) => {
  return (
    <Container>
      <button type={type}>{children}</button>
    </Container>
  );
};

export default Button;
