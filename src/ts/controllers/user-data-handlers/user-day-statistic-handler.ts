import UserProfile from '../../models/user-profile';
import { IUserDayStatisticCounters } from '../../types/data-types';

class UserDayStatisticHandler {
  private userProfile: UserProfile;

  private exercisesCounter: HTMLElement;

  private scoreCounter: HTMLElement;

  private timeCounter: HTMLElement;

  private exercisesIndicator: HTMLElement;

  private scoreIndicator: HTMLElement;

  private timeIndicator: HTMLElement;

  constructor(userProfile: UserProfile, userDayStatisticCounters: IUserDayStatisticCounters) {
    this.userProfile = userProfile;
    this.exercisesCounter = userDayStatisticCounters.exercisesCounter;
    this.scoreCounter = userDayStatisticCounters.scoreCounter;
    this.timeCounter = userDayStatisticCounters.timeCounter;
    this.exercisesIndicator = userDayStatisticCounters.exercisesIndicator;
    this.scoreIndicator = userDayStatisticCounters.scoreIndicator;
    this.timeIndicator = userDayStatisticCounters.timeIndicator;
  }

  private refreshExercisesCounter() {
    this.exercisesCounter.innerHTML = this.userProfile.getDayExercises().toString();
  }

  private refreshScoreCounter() {
    this.scoreCounter.innerHTML = this.userProfile.getDayScore().toString();
  }

  private refreshTimeCounter() {
    this.timeCounter.innerHTML = this.userProfile.getDayTimeHR();
  }

  private refreshExercisesIndicator(dayGoal: number): void {
    const complete = this.userProfile.getDayExercises();
    const completePercentage = (complete / dayGoal) * 100;
    this.exercisesIndicator.setAttribute('value', completePercentage.toString());
  }

  private refreshScoreIndicator(dayGoal: number): void {
    const complete = this.userProfile.getDayScore();
    const completePercentage = (complete / dayGoal) * 100;
    this.scoreIndicator.setAttribute('value', completePercentage.toString());
  }

  private refreshTimeIndicator(dayGoal: number): void {
    const complete = this.userProfile.getDayTime();
    const millisecsInMinute = 60000;
    const completePercentage = (complete / (dayGoal * millisecsInMinute)) * 100;
    this.timeIndicator.setAttribute('value', completePercentage.toString());
  }

  public refreshCounters(
    exercisesDayGoal: number,
    scoreDayGoal: number,
    timeDayGoal: number,
  ) {
    this.refreshExercisesCounter();
    this.refreshExercisesIndicator(exercisesDayGoal);
    this.refreshScoreCounter();
    this.refreshScoreIndicator(scoreDayGoal);
    this.refreshTimeCounter();
    this.refreshTimeIndicator(timeDayGoal);
  }
}

export default UserDayStatisticHandler;
