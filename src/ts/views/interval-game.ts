import { PIANO_SOUND } from '../constants/constants';
import Sound from '../controllers/sound';
import NodeBuilder from '../helpers/node-builder';
import { SequenceDirection } from '../types/game-types';
import IntervalComparisonView from './game-categories/interval/games/interval-comparison';

class IntervalGameView extends NodeBuilder {
  game: IntervalComparisonView;

  constructor() {
    super({ parentNode: null, className: 'interval-game-field' });

    const sound = new Sound(PIANO_SOUND);

    this.game = new IntervalComparisonView(
      this.node,
      {
        game: {
          category: {
            categoryId: 'intervals',
            categoryName: 'Intervals',
          },
          gameId: 'interval-comparison',
          gameName: 'Сравнение интервалов',
        },
        quizId: 'interval-comp-6',
        quizName: 'Чистые кварта и квинта',
        quizStartDescription: [
          '',
        ],
        direction: SequenceDirection.Ascending,
        score: 150,
        rounds: 10,
        bonus: 60000,
        condition: 'Выберите больший интервал',
        answers: [
          'первый',
          'второй',
        ],
        terms: [
          'чистая кварта',
          'чистая квинта',
        ],
        intervals: [
          4,
          5,
        ],
      },
      sound,
    );

    this.game.onQuit = (): void => {
      window.location.hash = '#';
    };
  }
}

export default IntervalGameView;
