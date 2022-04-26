import logo from 'assets/img/logo.svg';
import * as S from './header.styled';
import { StateModel } from '../../../utils/utils';
import { ActionCreator, ActiveTab } from '../../../reducer/reducer';
import { connect } from 'react-redux';
import React from 'react';
import { getActiveTab } from '../../../reducer/selectors';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tabIndex: ActiveTab) => void
}

const Header: React.FC<HeaderProps> = (props) => {

    const { activeTab, setActiveTab } = props;

    const onOtherClick = () => {
      setActiveTab(ActiveTab.Other);
    };

    return <S.StyledHeader>
      <S.HeaderWrapper>
        <S.Logo>
          <S.Image src={logo} alt='Логотип Escape Room' width='134' height='50' />
        </S.Logo>

        <S.Navigation>
          <S.Links>
            <S.LinkItem>
              <S.Link $isActiveLink={activeTab === ActiveTab.Main} to='/'>
                Квесты
              </S.Link>
            </S.LinkItem>

            <S.LinkItem >
              <S.Link to='#' onClick={onOtherClick} data-test="test-header-link-click">Новичкам</S.Link>
            </S.LinkItem>

            <S.LinkItem >
              <S.Link to='#' onClick={onOtherClick} data-test="test-header-link-click">Отзывы</S.Link>
            </S.LinkItem>

            <S.LinkItem  >
              <S.Link to='#' onClick={onOtherClick} data-test="test-header-link-click">Акции</S.Link>
            </S.LinkItem>

            <S.LinkItem >
              <S.Link $isActiveLink={activeTab === ActiveTab.Contacts} to='/contacts'>Контакты</S.Link>
            </S.LinkItem>
          </S.Links>
        </S.Navigation>
        <S.Phone href='tel:88003335599'>8 (800) 333-55-99</S.Phone>
      </S.HeaderWrapper>
    </S.StyledHeader>;
  }
;

const mapStateToProps = (state: StateModel) => {
  return {
    activeTab: getActiveTab(state),
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  setActiveTab(activeTab: ActiveTab) {
    dispatch(ActionCreator.setActiveTab(activeTab));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(Header);
export {Header}
