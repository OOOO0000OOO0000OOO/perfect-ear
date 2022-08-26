import ButtonBuilder from '../../helpers/button-builder';
import NodeBuilder from '../../helpers/node-builder';
import { IGameResult, IQuestion } from '../../types/game-types';

class GameRoundEndScreen extends NodeBuilder {
  public onQuit!: () => void;

  public onRepeat!: () => void;

  public onContinue!: () => void;

  constructor(
    parentNode: HTMLElement,
    {
      gameScore,
      rightAnswersScore,
      timeBonusScore,
      finesScore,
      rightAnswersCountToRoundCount,
      averageTimeHR,
    }: IGameResult,
    nextGame?: IQuestion['quizName'],
  ) {
    super({
      parentNode,
      className: 'quiz__quiz-end-screen quiz-end-screen',
      content: `
                <p class="indicators__indicator-title">Очки: <span class="indicators__indicator-score">${rightAnswersScore}</span></p>
                <p class="indicators__indicator-title">Бонус за время: <span class="indicators__indicator-score">${timeBonusScore}</span></p>
                <p class="indicators__indicator-title">Пропущенных вопросов: <span class="indicators__indicator-score"> - ${finesScore}</span></p>
                <p class="indicators__indicator-title"><span class="indicators__indicator-score">${gameScore}</span></p>
                <p class="indicators__indicator-title indicators__indicator-title_labeled">Верных ответов
                  <span class="indicators__indicator-score indicators__indicator-score_labeled">${rightAnswersCountToRoundCount}</span>
                </p>
                <p class="indicators__indicator-title indicators__indicator-title_labeled">Среднее время ответа
                  <span class="indicators__indicator-score indicators__indicator-score_labeled">${averageTimeHR}</span>
                </p>
                `,
    });

    const header = new NodeBuilder({ parentNode: null, className: 'quiz-end-screen__header' }).node;
    this.node.prepend(header);

    const quitControl = new ButtonBuilder({
      parentNode: header,
      className: 'quiz-end-screen__quit-btn',
    });
    quitControl.node.onclick = () => this.onQuit();

    const footer = new NodeBuilder({ parentNode: this.node, className: 'quiz-controls' }).node;

    const repeatControl = new ButtonBuilder({
      parentNode: footer,
      className: 'quiz-end-screen__repeat',
      content: 'повторить',
    });
    repeatControl.node.onclick = () => this.onRepeat();

    const continueControl = new ButtonBuilder({
      parentNode: footer,
      className: 'quiz-end-screen__continue continue',
      content: `${nextGame ? `<span>продолжить</span><span continue__game-title>${nextGame}</span>` : 'меню'}`,
    });
    continueControl.node.onclick = () => this.onContinue();
  }
}

export default GameRoundEndScreen;
