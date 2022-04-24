import styled from 'styled-components';
import { Link as RouterLink } from 'components/common/common';
export const CenteredBlock = styled.div`
  width: 50%;
  margin: 200px auto auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const PageTitle = styled.h1`
  margin: 0;
  margin-bottom: 30px;
  padding: 0;
  align-self: stretch;
  font-size: ${({ theme }) => theme.font.large};
  line-height: 95%;
  font-weight: 900;
  color: ${({ theme }) => theme.color.white};
  text-transform: uppercase;
  overflow-wrap: anywhere;
`;


export const LinkToTheMain = styled(RouterLink)`
  display: flex;
  align-items: center;

  max-width: 100%;
  margin: 0;
  padding-top: 22px;
  padding-right: 47px;
  padding-bottom: 23px;
  padding-left: 48px;

  font-family: inherit;
  font-size: ${({ theme }) => theme.font.upperbase};
  line-height: 20px;
  letter-spacing: 0.03em;
  font-weight: 800;
  text-transform: uppercase;

  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.tangerine};
  border: none;
  border-radius: 65px;
  cursor: pointer;

  &:focus,
  &:hover {
    background-color: ${({ theme }) => theme.color.carrotOrange};
  }

  &:active {
    opacity: 0.8;
  }
`;
