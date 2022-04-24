import React from 'react';
import { MainLayout } from 'components/common/common';
import * as S from './not-found.styled';
import useActiveTab from '../../hooks/use-active-tab';
import { ActiveTab } from '../../reducer/reducer';


const NotFound = () => {
  useActiveTab(ActiveTab.OTHER);

  return (
   <MainLayout>
      <S.CenteredBlock>
        <S.PageTitle>
          404 Not found
        </S.PageTitle>
        <S.LinkToTheMain to="/">На главную</S.LinkToTheMain>
      </S.CenteredBlock>
   </MainLayout>
  );
};


export default NotFound;

