import * as S from './container.styled';


interface ContainerProps {
   children: JSX.Element[] | JSX.Element;
}

const Container: React.FC <ContainerProps> = ({ children, ...props }) => (
  <S.Container {...props}>{children}</S.Container>
);

export default Container;
