import { MainLayout, PageSubtext, PageTitle } from '../common/common';
import * as S from './contacts.styled';
import ContactsMap from './components/contact-map/contacts-map';
import useActiveTab from '../../hooks/use-active-tab';
import { ActiveTab } from '../../reducer/reducer';


const Contacts = () => {
  useActiveTab(ActiveTab.Contacts);
  return <MainLayout>
    <S.Main>
      <S.ContentWrapper>
        <S.PageHeading>
          <PageTitle>Контакты</PageTitle>
          <PageSubtext>квесты в Санкт-Петербурге</PageSubtext>
        </S.PageHeading>

        <S.Contacts>
          <S.ContactsList>
            <S.ContactTitle>Адрес</S.ContactTitle>
            <S.ContactValue>
              <S.ContactAddress>
                Санкт-Петербург,
                <br />
                Набережная реки Карповка, д 5
              </S.ContactAddress>
            </S.ContactValue>

            <S.ContactTitle>Режим работы</S.ContactTitle>
            <S.ContactValue>Ежедневно, с 9:00 до 20:00</S.ContactValue>

            <S.ContactTitle>Телефон</S.ContactTitle>
            <S.ContactValue>
              <S.ContactLink href='tel:8 (800) 333-55-99'>
                8 (800) 333-55-99
              </S.ContactLink>
            </S.ContactValue>

            <S.ContactTitle>E-mail</S.ContactTitle>
            <S.ContactValue>
              <S.ContactLink href='mailto:info@escape-room.ru'>
                info@escape-room.ru
              </S.ContactLink>
            </S.ContactValue>
          </S.ContactsList>

          <S.ContactsMap>
            <ContactsMap />
          </S.ContactsMap>
        </S.Contacts>
      </S.ContentWrapper>
    </S.Main>
  </MainLayout>;
};

export default Contacts;
