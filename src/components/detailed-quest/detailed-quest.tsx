import React, { useEffect, useState } from 'react';
import { MainLayout } from 'components/common/common';
import { ReactComponent as IconClock } from 'assets/img/icon-clock.svg';
import { ReactComponent as IconPerson } from 'assets/img/icon-person.svg';
import { ReactComponent as IconPuzzle } from 'assets/img/icon-puzzle.svg';
import * as S from './detailed-quest.styled';
import { BookingModal } from './components/components';
import { connect } from 'react-redux';
import { getCyrillicLevel, getCyrillicType, QuestModel, StateModel } from '../../utils/utils';
import { getCurrentQuest, getErrorMsg, getIsResponseReceived, getQuests } from '../../reducer/selectors';
import { ActionCreator, Operation } from '../../reducer/reducer';
import { RouteComponentProps } from 'react-router-dom';
import{AlertMsg} from '../home/home.styled';

interface MatchParams {
  id: string;
}

interface DetailedQuestProps {
  currentQuest?: QuestModel | null;
  errorMsg?: string;
  getQuest?: (id: number) => void;
  resetCurrentQuest: () => void;
}


const DetailedQuest: React.FC<DetailedQuestProps & RouteComponentProps<MatchParams>> = (props) => {

  const { currentQuest, errorMsg, getQuest, resetCurrentQuest } = props;
  const [error, setError] = useState('');
  useEffect(() => {
    if (props.match.params.id) {
      // @ts-ignore
      getQuest(Number(props.match.params.id));
    }
    return () => {
      resetCurrentQuest();
    };
  }, [props.match.params.id, getQuest]);
  const [isBookingModalOpened, setIsBookingModalOpened] = useState(false);

  if (!currentQuest) {
    return null;
  }

  const bookingModalCloseHandler = () => {
    setIsBookingModalOpened(false);
  };

  const onBookingBtnClick = () => {
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

            <S.QuestBookingBtn onClick={onBookingBtnClick}>
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
  getQuest(id: number) {
    dispatch(Operation.getQuest(id));
  },
  resetCurrentQuest() {
    dispatch(ActionCreator.setQuest(null));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(DetailedQuest);
