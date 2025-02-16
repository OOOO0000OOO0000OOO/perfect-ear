import * as Tone from 'tone';
import {
  Frequency,
  Subdivision,
} from 'tone/build/esm/core/type/Units';
import {
  PianoNotations as Notations,
} from '../../../types/note-types';
import {
  IChordRound,
  Chords,
  IQuestion,
  SequenceDirection as Direction,
} from '../../../types/game-types';
import AbstractGameQuiz from '../../game-cycle/abstract-game-quiz';
import Random from '../../../helpers/generator';

class ChordIdentification extends AbstractGameQuiz<IChordRound> {
  public generateQuestion(
    quiz: IChordRound,
  ): IQuestion<IChordRound> {
    const { direction, answers } = { ...quiz, direction: quiz.direction.RUS };

    const [min, max] = [
      Tone.Frequency(Notations.C1).toNote(),
      Tone.Frequency(Notations.C5).transpose(-9).toNote(),
    ];

    const baseNote = Random.generateRandomNote(min, max);
    const value = Random.generateRandomNumber(
      0,
      answers.length - 1,
    );

    const sequence: [
      Frequency | Frequency[],
      Subdivision,
    ][] = direction !== Direction.Harmonic
      ? Tone.Frequency(baseNote)
        .harmonize(Chords[answers[value].RUS])
        .map((note) => [note.toNote(), '4n'])
      : [[Tone.Frequency(baseNote)
        .harmonize(Chords[answers[value].RUS])
        .map((note) => note.toNote()), '2n']];

    if (direction === Direction.Descending) sequence.reverse();

    return {
      round: quiz,
      value,
      sequence,
      baseNote: Tone.Frequency(baseNote).transpose(0).toNote(),
      labels: answers.map((answer) => Tone.Frequency(baseNote)
        .harmonize(Chords[answer.RUS])
        .map((note) => note.toNote())),
    };
  }
}

export default ChordIdentification;
