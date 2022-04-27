import * as S from './page-title.styled';
import * as React from 'react';

interface PageTitleProps {
  children: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ children, ...props }) => (
  <S.PageTitle {...props}>{children}</S.PageTitle>
);

export default PageTitle;
