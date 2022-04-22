import * as S from './page-subtext.styled';
import * as React from 'react';

interface PageSubtextProps {
  children: string;
}

const PageSubtext: React.FC <PageSubtextProps> = ({ children, ...props }) => (
  <S.PageSubtext {...props}>{children}</S.PageSubtext>
);

export default PageSubtext;
