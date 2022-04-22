import * as S from './page-heading.styled';
import React from 'react';

interface PageTitleProps {
  children: JSX.Element[] | JSX.Element;
}

const PageHeading: React.FC <PageTitleProps> = ({ children, ...props }) => (
  <S.PageHeading {...props}>{children}</S.PageHeading>
);

export default PageHeading;
