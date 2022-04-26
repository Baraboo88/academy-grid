import * as S from './booking-modal.styled';
import { ReactComponent as IconClose } from 'assets/img/icon-close.svg';
import React, { useEffect, useState } from 'react';
import { ActionCreator, Operation } from '../../../../reducer/reducer';
import { connect } from 'react-redux';
import { OrderModel, StateModel } from '../../../../utils/utils';
import { getErrorMsg, getIsOrderSent } from '../../../../reducer/selectors';
import { AlertMsg } from '../../../home/home.styled';

interface BookingModalProps {
  onBookingModalClose: () => void;
  isOrderSent: boolean;
  errorMsg: string;
  sendOrder: (order: OrderModel) => void;
  setIsOrderSent: (isOrderSent: boolean) => void;
}

const BookingModal: React.FC<BookingModalProps> = (props) => {
  const { onBookingModalClose, isOrderSent, errorMsg, sendOrder,setIsOrderSent  } = props;

  useEffect(() => {
    if (isOrderSent) {
      setName('');
      setPeopleCount('');
      setPhone('');
      setIsLegal(false);
      onBookingModalClose();
    }
    if(errorMsg) {
      setError(errorMsg);
    }
    return () => {
      setIsOrderSent(false);
    }
  }, [isOrderSent, errorMsg, onBookingModalClose, setIsOrderSent]);

  const [error, setError] = useState('');
  const [name, setName] = useState<string>('');
  const [peopleCount, setPeopleCount] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isLegal, setIsLegal] = useState<boolean>(false);

  const onFormSubmit = () => {
    sendOrder({ peopleCount: Number(peopleCount), isLegal, phone, name });
  };

  const onChangeLegal = () => {
    setIsLegal(!isLegal);
  };

  return (
    <S.BlockLayer>
      <S.Modal>
        <S.ModalCloseBtn onClick={onBookingModalClose} data-test='test-model-close'>
          <IconClose width='16' height='16' />
          <S.ModalCloseLabel>Закрыть окно</S.ModalCloseLabel>
        </S.ModalCloseBtn>
        <S.ModalTitle>Оставить заявку</S.ModalTitle>
        <S.BookingForm
          action='https://echo.htmlacademy.ru'
          method='post'
          id='booking-form'
          onSubmit={(evt) => {
            evt.preventDefault();
            onFormSubmit();
            }
          }
          data-test="test-addOrder"
        >
          <S.BookingField>
            <S.BookingLabel htmlFor='booking-name'>Ваше Имя</S.BookingLabel>
            <S.BookingInput
              type='text'
              id='booking-name'
              name='booking-name'
              placeholder='Имя'
              required
              value={name}
              onChange={(evt) => {
                setName(evt.target.value);
                setError('');
              }
              }
            />
          </S.BookingField>
          <S.BookingField>
            <S.BookingLabel htmlFor='booking-phone'>
              Контактный телефон
            </S.BookingLabel>
            <S.BookingInput
              type='tel'
              id='booking-phone'
              name='booking-phone'
              placeholder='Телефон'
              required
              value={phone}
              onChange={(evt) => {
                setPhone(evt.target.value);
                setError('');
              }
              }
            />
          </S.BookingField>
          <S.BookingField>
            <S.BookingLabel htmlFor='booking-people'>
              Количество участников
            </S.BookingLabel>
            <S.BookingInput
              type='number'
              id='booking-people'
              name='booking-people'
              placeholder='Количество участников'
              required
              value={peopleCount}
              onChange={(evt) => {
                setPeopleCount(evt.target.value);
                setError('');
              }}
            />
          </S.BookingField>
          {error && (
            <AlertMsg>
              {error}
            </AlertMsg>
          )}
          <S.BookingSubmit type='submit'>Отправить заявку</S.BookingSubmit>
          <S.BookingCheckboxWrapper>
            <S.BookingCheckboxInput
              type='checkbox'
              id='booking-legal'
              name='booking-legal'
              required
              checked={isLegal}
              onChange={onChangeLegal}
            />

            <S.BookingCheckboxLabel
              className='checkbox-label'
              htmlFor='booking-legal'
            >
              <S.BookingCheckboxText>
                Я согласен с{' '}
                <S.BookingLegalLink href='#'>
                  правилами обработки персональных данных и пользовательским
                  соглашением
                </S.BookingLegalLink>
              </S.BookingCheckboxText>
            </S.BookingCheckboxLabel>
          </S.BookingCheckboxWrapper>
        </S.BookingForm>
      </S.Modal>
    </S.BlockLayer>
  );
};


const mapStateToProps = (state: StateModel) => {
  return {
    isOrderSent: getIsOrderSent(state),
    errorMsg: getErrorMsg(state),
  };
};


const mapDispatchToProps = (dispatch: any) => ({
  sendOrder(order: OrderModel) {
    dispatch(Operation.sendOrder(order));
  },
  setIsOrderSent(isOrderSent: boolean) {
    dispatch(ActionCreator.setIsOrderSent(isOrderSent))
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
export { BookingModal };
