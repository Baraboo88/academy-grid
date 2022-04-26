import { ReactComponent as IconAllQuests } from 'assets/img/icon-all-quests.svg';
import { ReactComponent as IconAdventures } from 'assets/img/icon-adventures.svg';
import { ReactComponent as IconHorrors } from 'assets/img/icon-horrors.svg';
import { ReactComponent as IconMystic } from 'assets/img/icon-mystic.svg';
import { ReactComponent as IconDetective } from 'assets/img/icon-detective.svg';
import { ReactComponent as IconScifi } from 'assets/img/icon-scifi.svg';
import { ReactComponent as IconPerson } from 'assets/img/icon-person.svg';
import { ReactComponent as IconPuzzle } from 'assets/img/icon-puzzle.svg';
import * as S from './quests-catalog.styled';
import {
  applyFilter,
  getCyrillicLevel,
  getCyrillicType,
  QuestModel,
  QuestType,
  StateModel,
} from '../../../../utils/utils';
import { connect } from 'react-redux';
import { Operation } from '../../../../reducer/reducer';
import { getErrorMsg, getIsResponseReceived, getQuests } from '../../../../reducer/selectors';
import React, { useEffect, useState } from 'react';
import { AlertMsg } from '../../home.styled';


interface QuestsCatalogProps {
  quests: QuestModel [];
  onMount: () => void;
  isResponseReceived: boolean;
  errorMsg: string;
}

const QuestsCatalog: React.FC<QuestsCatalogProps> = (props) => {
  const { quests, onMount, isResponseReceived, errorMsg } = props;

  useEffect(() => {
    if (isResponseReceived && errorMsg) {
      setError(errorMsg);
    }
    if (!isResponseReceived) {
      onMount();
    } else {
      setIsLoading(false);
      setInnerQuests(quests);
    }
  }, [quests, getQuests, isResponseReceived, errorMsg]);

  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [innerQuests, setInnerQuests] = useState<QuestModel []>([]);
  const [activeType, setActiveType] = useState(-1);

  const getTypeIcon = (type: QuestType) => {
    switch (type) {
      case QuestType.Adventures:
        return <IconAdventures />;
      case QuestType.Detective:
        return <IconDetective />;
      case QuestType.Horror:
        return <IconHorrors />;
      case QuestType.Mystic:
        return <IconMystic />;
      case QuestType.SciFi:
        return <IconScifi />;
    }
  };


  return (
    <>
      {error && <AlertMsg>
        {error}
      </AlertMsg>}
      <S.Tabs>
        <S.TabItem>
          <S.TabBtn isActive={activeType === -1} onClick={() => {
            setActiveType(-1);
            setInnerQuests(quests);
          }}>
            <IconAllQuests />
            <S.TabTitle>Все квесты</S.TabTitle>
          </S.TabBtn>
        </S.TabItem>
        {Object.values(QuestType).map((questionType, index) => <S.TabItem key={`${index}-${questionType}`}>
          <S.TabBtn isActive={index === activeType} onClick={() => {
            setActiveType(index);
            setInnerQuests(applyFilter(quests, questionType));
          }}>
            {getTypeIcon(questionType)}
            <S.TabTitle>{getCyrillicType(questionType)}</S.TabTitle>
          </S.TabBtn>
        </S.TabItem>)}

      </S.Tabs>

      <S.QuestsList>

        {!isLoading && innerQuests.map((quest: QuestModel, index) =>
          <S.QuestItem key={`${index}-${quest.id}`}>
            <S.QuestItemLink to={`/detailed-quest/${quest.id}`}>
              <S.Quest>
                <S.QuestImage
                  src={`/${quest.coverImg}`}
                  width='344'
                  height='232'
                  alt='квест Маньяк'
                />

                <S.QuestContent>
                  <S.QuestTitle>{quest.title}</S.QuestTitle>

                  <S.QuestFeatures>
                    <S.QuestFeatureItem>
                      <IconPerson />
                      {`${quest.peopleCount[0]}–${quest.peopleCount[1]} чел`}

                    </S.QuestFeatureItem>
                    <S.QuestFeatureItem>
                      <IconPuzzle />
                      {getCyrillicLevel(quest.level)}
                    </S.QuestFeatureItem>
                  </S.QuestFeatures>
                </S.QuestContent>
              </S.Quest>
            </S.QuestItemLink>
          </S.QuestItem>,
        )}

      </S.QuestsList>
    </>);
};

const mapStateToProps = (state: StateModel) => {

  return {
    quests: getQuests(state),
    errorMsg: getErrorMsg(state),
    isResponseReceived: getIsResponseReceived(state),
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  onMount() {
    dispatch(Operation.getQuests());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestsCatalog);
export {QuestsCatalog};
