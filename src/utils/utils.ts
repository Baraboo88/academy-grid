import { ActiveTab } from '../reducer/reducer';

export enum QuestType {
  ADVENTURES = 'adventures',
  HORROR = 'horror',
  MYSTIC = 'mystic',
  DETECTIVE = 'detective'
}

export enum QuestLevel {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

export enum QuestDuration {
  'SIXTY' = 60,
  NINETY = 90,
  ONE_TWO_ZERO = 120
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
  peopleCount: number;
  phone: string;
  isLegal: boolean
}

export interface StateModel {
  quests: QuestModel [];
  currentQuest?: QuestModel;
  isOrderSent?: boolean;
  isResponseReceived: boolean;
  errorMsg: string;
  activeTab: ActiveTab;
}


export interface FilterModel {
  name: string;
  title: string;
}

export const Filters = {};

export const getCyrillicLevel = (level: QuestLevel) => {
  switch (level) {
    case QuestLevel.EASY:
      return 'простой';
    case QuestLevel.MEDIUM:
      return 'средний';
    case QuestLevel.HARD:
      return 'сложный';
  }
  return '';
};

export const getCyrillicType = (questType: QuestType) => {
  switch (questType) {
    case QuestType.ADVENTURES:
      return 'Приключения';
    case QuestType.HORROR:
      return 'Ужасы';
    case QuestType.MYSTIC:
      return 'Sci-fi';
    case QuestType.DETECTIVE:
      return 'Детектив';
  }
  return '';
};


export const applyFilter = (quests: QuestModel[], filter: QuestType) => quests.filter((quest) => quest.type === filter);
