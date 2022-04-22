
export enum QuestType {
  HORROR="horror",
  MYSTIC='mystic',
  DETECTIVE='detective',
  ADVENTURES='adventures'
}

export enum QuestLevel{
  EASY='easy',
  MEDIUM='medium',
  HARD='hard'
}

export enum QuestDuration{
  'SIXTY' = 60,
  NINETY=90,
  ONE_TWO_ZERO = 120
}

export interface QuestModel {
  id: number,
  title: string,
  description:string,
  previewImg: string,
  coverImg: string,
  type: QuestType,
  level: QuestLevel,
  peopleCount: number [],
  duration: QuestDuration
}
