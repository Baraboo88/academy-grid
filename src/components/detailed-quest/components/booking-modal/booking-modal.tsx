import * as S from './booking-modal.styled';
import { ReactComponent as IconClose } from 'assets/img/icon-close.svg';
import React from 'react';
import { AlertMsg } from '../../../home/home.styled';

interface BookingModalProps {
  name: string;
  peopleCount: string;
  phone: string;
  isLegal: boolean;
  modalError: string;
  onNameChange: (name: string) => void;
  onPeopleCountChange: (peopleCount: string) => void;
  onPhoneChange: (phone: string) => void;
  onIsLegalChange: () => void;
  onBookingModalClose: () => void;
  onFormSubmit: () => void;

}

const BookingModal: React.FC<BookingModalProps> = (props) => {
  const {
    onBookingModalClose, name,
    peopleCount,
    phone,
    isLegal,
    modalError,
    onNameChange,
    onPeopleCountChange,
    onPhoneChange,
    onIsLegalChange,
    onFormSubmit
  } = props;

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
          data-test='test-submit'
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
                onNameChange(evt.target.value);
              }
              }
              data-test='test-name-changed'
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
                onPhoneChange(evt.target.value);

              }
              }
              data-test='test-phone-changed'
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
                onPeopleCountChange(evt.target.value);
              }}
              data-test='test-people-count-changed'
            />
          </S.BookingField>
          {modalError && (
            <AlertMsg>
              {modalError}
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
              onChange={onIsLegalChange}
              data-test='test-is-legal-changed'
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


export default BookingModal;
