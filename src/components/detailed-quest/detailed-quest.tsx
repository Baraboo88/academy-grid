import React, { useEffect, useState } from 'react';
import { MainLayout } from 'components/common/common';
import { ReactComponent as IconClock } from 'assets/img/icon-clock.svg';
import { ReactComponent as IconPerson } from 'assets/img/icon-person.svg';
import { ReactComponent as IconPuzzle } from 'assets/img/icon-puzzle.svg';
import * as S from './detailed-quest.styled';
import { BookingModal } from './components/components';
import { connect } from 'react-redux';
import { getCyrillicLevel, getCyrillicType, QuestModel, StateModel } from '../../utils/utils';
import { getCurrentQuest, getErrorMsg} from '../../reducer/selectors';
import { ActionCreator, ActiveTab, ErrorMsg, Operation } from '../../reducer/reducer';
import { RouteComponentProps } from 'react-router-dom';
import{AlertMsg} from '../home/home.styled';
import useActiveTab from '../../hooks/use-active-tab';

interface MatchParams {
  id: string;
}

interface DetailedQuestProps {
  currentQuest?: QuestModel | null;
  errorMsg?: string;
  onMount?: (id: number) => void;
  resetCurrentQuest: () => void;
}


const DetailedQuest: React.FC<DetailedQuestProps & RouteComponentProps<MatchParams>> = (props) => {

  const { currentQuest, errorMsg, onMount, resetCurrentQuest,history } = props;

  useEffect(() => {

      // @ts-ignore
      onMount(Number(props.match.params.id));

    return () => {
      resetCurrentQuest();
    };

  }, [props.match.params.id, onMount, resetCurrentQuest, history]);

  useEffect(() => {
    if(errorMsg === ErrorMsg.NotFound){
      history.push(`/not-found`);
    }
  }, [errorMsg, history])

  useActiveTab(ActiveTab.Main);

  const [isBookingModalOpened, setIsBookingModalOpened] = useState(false);


  if (!currentQuest) {
    return null;
  }

  const bookingModalCloseHandler = () => {
    setIsBookingModalOpened(false);
  };

  const bookingBtnClickHandler = () => {
    setIsBookingModalOpened(true);
  };

  return (
    <MainLayout>

      {currentQuest && <S.Main>

        {errorMsg && (
          <AlertMsg>
            {errorMsg}
          </AlertMsg>
        )}
        <S.PageImage
          src={`/${currentQuest.coverImg}`}
          alt={`Квест ${currentQuest.title}`}
          width='1366'
          height='768'
        />
        <S.PageContentWrapper>
          {errorMsg && (
            <AlertMsg>
              {errorMsg}
            </AlertMsg>
          )}
          <S.PageHeading>
            <S.PageTitle>{currentQuest.title}</S.PageTitle>
            <S.PageSubtitle>{getCyrillicType(currentQuest.type)}</S.PageSubtitle>
          </S.PageHeading>

          <S.PageDescription>
            <S.Features>
              <S.FeaturesItem>
                <IconClock width='20' height='20' />
                <S.FeatureTitle>90 мин</S.FeatureTitle>
              </S.FeaturesItem>
              <S.FeaturesItem>
                <IconPerson width='19' height='24' />
                <S.FeatureTitle>{currentQuest.peopleCount && currentQuest.peopleCount.length > 1 ? `${currentQuest.peopleCount[0]}–${currentQuest.peopleCount[1]} чел` : ''}</S.FeatureTitle>
              </S.FeaturesItem>
              <S.FeaturesItem>
                <IconPuzzle width='24' height='24' />
                <S.FeatureTitle>{getCyrillicLevel(currentQuest.level)}</S.FeatureTitle>
              </S.FeaturesItem>
            </S.Features>

            <S.QuestDescription>
              {currentQuest.description}
            </S.QuestDescription>

            <S.QuestBookingBtn onClick={bookingBtnClickHandler}>
              Забронировать
            </S.QuestBookingBtn>
          </S.PageDescription>
        </S.PageContentWrapper>

        {isBookingModalOpened && <BookingModal onBookingModalClose={bookingModalCloseHandler} />}
      </S.Main>}
    </MainLayout>
  );
};

const mapStateToProps = (state: StateModel) => {
  return {
    currentQuest: getCurrentQuest(state),
    errorMsg: getErrorMsg(state),
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  onMount(id: number) {
    dispatch(Operation.getQuest(id));
  },
  resetCurrentQuest() {
    dispatch(ActionCreator.resetQuest());
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(DetailedQuest);
export {DetailedQuest};
