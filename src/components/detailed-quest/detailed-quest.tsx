import React, { useEffect, useState } from 'react';
import { MainLayout } from 'components/common/common';
import { ReactComponent as IconClock } from 'assets/img/icon-clock.svg';
import { ReactComponent as IconPerson } from 'assets/img/icon-person.svg';
import { ReactComponent as IconPuzzle } from 'assets/img/icon-puzzle.svg';
import * as S from './detailed-quest.styled';
import { BookingModal } from './components/components';
import { connect } from 'react-redux';
import { getCyrillicLevel, getCyrillicType, OrderModel, QuestModel, StateModel } from '../../utils/utils';
import { getCurrentQuest, getErrorMsg, getIsOrderSent } from '../../reducer/selectors';
import { ActionCreator, ActiveTab, ErrorMsg, Operation } from '../../reducer/reducer';
import { RouteComponentProps } from 'react-router-dom';
import { AlertMsg } from '../home/home.styled';
import useActiveTab from '../../hooks/use-active-tab';

interface MatchParams {
  id: string;
}

interface DetailedQuestProps {
  currentQuest?: QuestModel | null;
  errorMsg?: string;
  isOrderSent: boolean;
  onMount?: (id: number) => void;
  resetCurrentQuest: () => void;
  setIsOrderSent: (isOrderSent: boolean) => void;
  sendOrder: (order: OrderModel) => void;
}


const DetailedQuest: React.FC<DetailedQuestProps & RouteComponentProps<MatchParams>> = (props) => {

    const { currentQuest, errorMsg, onMount, resetCurrentQuest, history, isOrderSent, setIsOrderSent, sendOrder } = props;

    useEffect(() => {
      // @ts-ignore
      onMount(Number(props.match.params.id));
      return () => {
        resetCurrentQuest();
      };

    }, [props.match.params.id, onMount, resetCurrentQuest, history]);

    useEffect(() => {
      if (errorMsg === ErrorMsg.NotFound) {
        history.push(`/not-found`);
      }
    }, [errorMsg, history]);





    useEffect(() => {
      if (isOrderSent) {
        onBookingModalClose();
        setIsOrderSent(false);
        setIsOrderSending(false);
      }
      if (errorMsg && isOrderSending) {
        setModalError(errorMsg);
      }

    }, [isOrderSent, errorMsg, setIsOrderSent]);

    const onFormSubmit = () => {
      setIsOrderSending(true);
      sendOrder({ peopleCount: Number(peopleCount), isLegal, phone, name });
    };


    useActiveTab(ActiveTab.Main);

    const [isBookingModalOpened, setIsBookingModalOpened] = useState(false);
    const [modalError, setModalError] = useState('');
    const [name, setName] = useState<string>('');
    const [peopleCount, setPeopleCount] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [isLegal, setIsLegal] = useState<boolean>(false);
    const [isOrderSending, setIsOrderSending] = useState(false);

    if (!currentQuest) {
      return null;
    }

    const onBookingModalClose = () => {
      setIsBookingModalOpened(false);
      setModalError('');
      setName('');
      setPeopleCount('');
      setPhone('');
      setIsLegal(false);
    };

    const onBookingBtnClick = () => {
      setIsBookingModalOpened(true);
    };


    const onNameChange = (name: string) => {
      setName(name);
      setModalError('');
    };

    const onPeopleCountChange = (peopleCount: string) => {
      setPeopleCount(peopleCount);
      setModalError('');
    };

    const onPhoneChange = (phone: string) => {
      setPhone(phone);
      setModalError('');
    };

    const onIsLegalChange = () => {
      setIsLegal(!isLegal);
      setModalError('');
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

          {isBookingModalOpened &&
          <BookingModal onBookingModalClose={onBookingModalClose} name={name} modalError={modalError} isLegal={isLegal}
                        onIsLegalChange={onIsLegalChange} onFormSubmit={onFormSubmit} onNameChange={onNameChange}
                        onPeopleCountChange={onPeopleCountChange} peopleCount={peopleCount} onPhoneChange={onPhoneChange}
                        phone={phone} />}
        </S.Main>}
      </MainLayout>
    );
  }
;

const mapStateToProps = (state: StateModel) => {
    return {
      currentQuest: getCurrentQuest(state),
      errorMsg: getErrorMsg(state),
      isOrderSent: getIsOrderSent(state),
    };
  }
;

const mapDispatchToProps = (dispatch: any) => (
  {
    onMount(id: number) {
      dispatch(Operation.getQuest(id));
    },
    resetCurrentQuest() {
      dispatch(ActionCreator.resetQuest());
    },
    sendOrder(order: OrderModel) {
      dispatch(Operation.sendOrder(order));
    },
    setIsOrderSent(isOrderSent: boolean,
    ) {
      dispatch(ActionCreator.setIsOrderSent(isOrderSent));
    },
  }
);


export default connect(mapStateToProps, mapDispatchToProps)(DetailedQuest);
export { DetailedQuest };
