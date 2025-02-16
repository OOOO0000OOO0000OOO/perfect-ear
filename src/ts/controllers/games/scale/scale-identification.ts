import * as Tone from 'tone';
import {
  Frequency,
  Subdivision,
} from 'tone/build/esm/core/type/Units';
import {
  Pause,
  PianoNotations as Notations,
} from '../../../types/note-types';
import {
  IScaleRound,
  Scales,
  IQuestion,
  SequenceDirection as Direction,
} from '../../../types/game-types';
import AbstractGameQuiz from '../../game-cycle/abstract-game-quiz';
import Random from '../../../helpers/generator';

class ScaleIdentification extends AbstractGameQuiz<IScaleRound> {
  public generateQuestion(
    quiz: IScaleRound,
  ): IQuestion<IScaleRound> {
    const { direction, answers } = { ...quiz, direction: quiz.direction.RUS };

    const [min, max] = [
      Tone.Frequency(Notations.C1).toNote(),
      Tone.Frequency(Notations.C5).transpose(-12).toNote(),
    ];

    const baseNote = Random.generateRandomNote(min, max);
    const value = Random.generateRandomNumber(
      0,
      answers.length - 1,
    );

    const sequence: [
      Pause | Frequency | Frequency[],
      Subdivision,
    ][] = Tone.Frequency(baseNote)
      .harmonize(Scales[answers[value].RUS])
      .map((note) => [note.toNote(), '4n']);

    if (direction === Direction.Descending) sequence.reverse();

    return {
      round: quiz,
      value,
      sequence,
      baseNote: Tone.Frequency(baseNote).transpose(0).toNote(),
      labels: answers.map((answer) => Tone.Frequency(baseNote)
        .harmonize(Scales[answer.RUS])
        .map((note) => note.toNote())),
    };
  }
}

export default ScaleIdentification;
