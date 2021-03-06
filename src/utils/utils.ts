import { ActiveTab } from '../reducer/data/data-reducer';


export enum QuestType {
  Adventures = 'adventures',
  Horror = 'horror',
  Mystic = 'mystic',
  Detective = 'detective',
  SciFi='sci-fi'
}

export enum QuestLevel {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard'
}

export enum QuestDuration {
  Sixty = 60,
  Ninety = 90,
  OneTwoZero = 120
}

export interface QuestModel {
  id: number;
  title: string;
  description: string;
  previewImg: string;
  coverImg: string;
  type: QuestType;
  level: QuestLevel;
  peopleCount: number [];
  duration: QuestDuration;
}

export interface OrderModel {
  name: string;
  peopleCount: any;
  phone: string;
  isLegal: boolean
}

export interface DataStateModel {
  quests: QuestModel [];
  currentQuest?: QuestModel;
  isOrderSent?: boolean;
  isResponseReceived: boolean;
  errorMsg: string;
  activeTab: ActiveTab;
}

export interface StateModel{
  data: DataStateModel
}


export const getCyrillicLevel = (level: QuestLevel) => {
  switch (level) {
    case QuestLevel.Easy:
      return 'простой';
    case QuestLevel.Medium:
      return 'средний';
    case QuestLevel.Hard:
      return 'сложный';
  }
  return '';
};

export const getCyrillicType = (questType: QuestType) => {
  switch (questType) {
    case QuestType.Adventures:
      return 'Приключения';
    case QuestType.Horror:
      return 'Ужасы';
    case QuestType.Mystic:
      return 'Мистика';
    case QuestType.Detective:
      return 'Детектив';
    case QuestType.SciFi:
      return 'Sci-fi';
  }
  return '';
};


