import { QuestLevel, QuestModel, QuestType } from './utils';
import { createApi } from '../api';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';


export const mockQuests: QuestModel[]  = [
    {
      id: 1,
      "title": "Склеп",
      "description": "Средневековое кладбище таит в себе много страшных тайн. Местные жители говорят, что в склепе похоронен граф вампир, который по ночам выходит на охоту, чтобы испить человеческой крови. Через час солнце опустится за горизонт, успеете ли вы убить вампира и выбраться из склепа?",
      "previewImg": "img/preview-sklep.jpg",
      "coverImg": "img/cover-sklep.jpg",
      type: "horror" as QuestType,
      level: "hard" as QuestLevel,
      peopleCount: [2, 5],
      duration: 120
    },
    {
      "id": 2,
      "title": "Маньяк",
      "description": "В комнате с приглушённым светом несколько человек, незнакомых друг с другом, приходят в себя. Никто не помнит, что произошло прошлым вечером. Руки и ноги связаны, но одному из вас получилось освободиться. На стене висит пугающий таймер и запущен отсчёт 60 минут. Сможете ли вы разобраться в стрессовой ситуации, помочь другим, разобраться что произошло и выбраться из комнаты?",
      "previewImg": "img/preview-maniac.jpg",
      "coverImg": "img/cover-maniac.jpg",
      "type": "horror" as QuestType,
      "level": "medium" as QuestLevel,
      "peopleCount": [3, 6],
      "duration": 90
    },
    {
      "id": 3,
      "title": "Ритуал",
      "description": "Тяжелый воздух угнетает, в ночи вы оказываетесь запертыми в сыром помещении вместе с другими ничего не понимающими жертвами. Сквозь щель в двери вы видите, как некто в капюшоне готовит площадку как будто для проведения мистического обряда. Удастся ли вам выбраться, пока вы не станете жертвой ритуала?",
      "previewImg": "img/preview-ritual.jpg",
      "coverImg": "img/cover-ritual.jpg",
      "type": "mystic" as QuestType,
      "level": "hard" as QuestLevel,
      "peopleCount": [3, 5],
      "duration": 120
    },
    {
      "id": 4,
      "title": "Тайны старого особняка",
      "description": "Погрузитесь в атмосферу служебных помещений закулисья, которые хранят множество тайн и загадок. Вы окажитесь в старом особняке и увидите все, что скрывают его запутанные коридоры.",
      "previewImg": "img/preview-final-frontier.jpg",
      "coverImg": "img/cover-final-frontier.jpg",
      "type": "detective" as QuestType,
      "level": "easy" as QuestLevel,
      "peopleCount": [2, 5],
      "duration": 60
    },
    {
      "id": 5,
      "title": "Хижина в лесу",
      "description": "Вы с друзьями оказались в заброшенной хижине. Какую тайну она скрывает и как из неё выбраться? На эти вопросы вам предстоит найти ответ, чтобы вернуться домой.",
      "previewImg": "img/preview-house-in-the-woods.jpg",
      "coverImg": "img/cover-house-in-the-woods.jpg",
      "type": "mystic" as QuestType,
      "level": "medium" as QuestLevel,
      "peopleCount": [4, 7],
      "duration": 90
    },
    {
      "id": 6,
      "title": "Фатальный эксперимент",
      "description": "Вы стоите на пороге нового научного открытия, которое перевернет судьбу человечества. Но что-то идёт не так, и ядерный реактор, который работает на полную мощность, сигнализирует о скорой поломке. Удастся ли вам починить его в отведенное время и предотвратить гибель людей в этом фатальном эксперименте?",
      "previewImg": "img/preview-fatal-exp.jpg",
      "coverImg": "img/cover-fatal-exp.jpg",
      "type": "adventures" as QuestType,
      "level": "hard" as QuestLevel,
      "peopleCount": [5, 8],
      "duration": 120
    },

  ]
;


export const getTestStore = () => {
  const initialState = {
    quests: mockQuests,
    currentQuest: mockQuests[1],
    errorMsg: ''
  };
  const reducer = (state = initialState) => {
    return state;
  };
  const api = createApi();

  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(api)));
};
