import { MainLayout, PageHeading, PageSubtext, PageTitle } from 'components/common/common';
import { QuestsCatalog } from './components/components';
import * as S from './home.styled';
import useActiveTab from '../../hooks/use-active-tab';
import { ActiveTab } from '../../reducer/reducer';

const HomePage = () => {
  useActiveTab(ActiveTab.MAIN);

  return <MainLayout>
    <S.Main forwardedAs="main">
      <PageHeading>
        <PageTitle>Выберите тематику</PageTitle>
        <PageSubtext>квесты в Санкт-Петербурге</PageSubtext>
      </PageHeading>
      <QuestsCatalog />
    </S.Main>
  </MainLayout>
};


export default HomePage;
