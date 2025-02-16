import { LangEmitter, TempoEmitter, VolumeEmitter } from '../emitters/lang-emitter';
import UserConfig from '../../models/user-config';
import UserProfile from '../../models/user-profile';
import {
  IDate,
  IGameResult,
  IUserConfig,
  IUserProfileType,
  Languages,
} from '../../types/data-types';
import { achievementsArr } from '../../constants/constants';

class UserDataHandler {
  userProfile: UserProfile;

  userConfig: UserConfig;

  constructor() { // TODO: после добавления сервера,
    // добавить метод получения данных и получать данные
    // в зависимости от него
    const guestUserProfile = this.getProfileDataFromLocalStorage();
    if (guestUserProfile) {
      let dayScore = 0;
      if (guestUserProfile.dayScore) {
        dayScore = guestUserProfile.dayScore;
      }
      let dayTime = 0;
      if (guestUserProfile.dayTime) {
        dayTime = guestUserProfile.dayTime;
      }
      let dayTimeHR = '0 мин 0.0 сек.';
      if (guestUserProfile.dayTimeHR) {
        dayTimeHR = guestUserProfile.dayTimeHR;
      }
      let dayExercises = 0;
      if (guestUserProfile.dayExercises) {
        dayExercises = guestUserProfile.dayExercises;
      }
      let profileDate = this.getCurrentDate();
      if (guestUserProfile.profileDate) {
        profileDate = guestUserProfile.profileDate;
      }
      let totalScore = 0;
      if (guestUserProfile.totalScore) {
        totalScore = guestUserProfile.totalScore;
      }
      let totalTime = 0;
      if (guestUserProfile.totalTime) {
        totalTime = guestUserProfile.totalTime;
      }
      let totalTimeHR = '0 мин 0.0 сек.';
      if (guestUserProfile.totalTimeHR) {
        totalTimeHR = guestUserProfile.totalTimeHR;
      }
      let totalExercises = 0;
      if (guestUserProfile.totalExercises) {
        totalExercises = guestUserProfile.totalExercises;
      }
      let intervalGameScore = 0;
      if (guestUserProfile.intervalGameScore) {
        intervalGameScore = guestUserProfile.intervalGameScore;
      }
      let scaleGameScore = 0;
      if (guestUserProfile.scaleGameScore) {
        scaleGameScore = guestUserProfile.scaleGameScore;
      }
      let chordsGameScore = 0;
      if (guestUserProfile.chordsGameScore) {
        chordsGameScore = guestUserProfile.chordsGameScore;
      }
      let exercisesResult: [] | IUserProfileType['exercisesResult'] = [];
      if (guestUserProfile.exercisesResult) {
        exercisesResult = guestUserProfile.exercisesResult;
      }
      let achievements = [...achievementsArr];
      if (guestUserProfile.achievements) {
        achievements = guestUserProfile.achievements;
      }
      this.userProfile = new UserProfile({
        dayScore,
        dayTime,
        dayTimeHR,
        dayExercises,
        profileDate,
        totalScore,
        totalTime,
        totalTimeHR,
        totalExercises,
        intervalGameScore,
        scaleGameScore,
        chordsGameScore,
        exercisesResult,
        achievements,
      });
    } else {
      this.userProfile = new UserProfile({
        dayScore: 0,
        dayTime: 0,
        dayTimeHR: '0 мин 0.0 сек.',
        dayExercises: 0,
        profileDate: this.getCurrentDate(),
        totalScore: 0,
        totalTime: 0,
        totalTimeHR: '0 мин 0.0 сек.',
        totalExercises: 0,
        intervalGameScore: 0,
        scaleGameScore: 0,
        chordsGameScore: 0,
        exercisesResult: [],
        achievements: [...achievementsArr],
      });
    }

    const guestUserConfig = this.getConfigDataFromLocalStorage();
    if (guestUserConfig) {
      let dayExercisesGoal = 10;
      if (guestUserConfig.dayGoals.dayExercisesGoal) {
        dayExercisesGoal = guestUserConfig.dayGoals.dayExercisesGoal;
      }
      let dayScoreGoal = 25000;
      if (guestUserConfig.dayGoals.dayScoreGoal) {
        dayScoreGoal = guestUserConfig.dayGoals.dayScoreGoal;
      }
      let dayTimeGoal = 30;
      if (guestUserConfig.dayGoals.dayTimeGoal) {
        dayTimeGoal = guestUserConfig.dayGoals.dayTimeGoal;
      }
      let language = Languages.RUS;
      if (guestUserConfig.language) {
        language = guestUserConfig.language;
      }
      let volume = 0;
      if (guestUserConfig.volume) {
        volume = Number.parseFloat(guestUserConfig.volume);
      }
      let tempo = 80;
      if (guestUserConfig.tempo) {
        tempo = guestUserConfig.tempo;
      }
      this.userConfig = new UserConfig(
        {
          dayExercisesGoal,
          dayScoreGoal,
          dayTimeGoal,
        },
        language,
        volume,
        tempo,
      );
    } else {
      this.userConfig = new UserConfig(
        {
          dayExercisesGoal: 10,
          dayScoreGoal: 25000,
          dayTimeGoal: 30,
        },
        Languages.RUS,
        0,
        80,
      );
    }
    this.addPageCloseEvent();
    this.addGameEndEvent();
    this.setDayCheckInterval();

    LangEmitter.add((data) => {
      const key = Languages[data];
      this.userConfig.setLanguge(key);
    });

    VolumeEmitter.add((data) => {
      const key = data;
      this.userConfig.setVolume(key);
    });

    TempoEmitter.add((data) => {
      const key = data;
      this.userConfig.setTempo(key);
    });
  }

  private getProfileDataFromLocalStorage(): IUserProfileType {
    const guestUserProfileJSON = localStorage.getItem('guestUserProfile');
    let guestUserProfile;
    if (guestUserProfileJSON) {
      guestUserProfile = JSON.parse(guestUserProfileJSON);
    }
    return guestUserProfile;
  }

  private getConfigDataFromLocalStorage(): IUserConfig {
    const guestUserConfigJSON = localStorage.getItem('guestUserConfig');
    let guestUserConfig;
    if (guestUserConfigJSON) {
      guestUserConfig = JSON.parse(guestUserConfigJSON);
    }
    return guestUserConfig;
  }

  private saveProfileDataToLocalStorage(): void {
    const guestUserProfile: IUserProfileType = {
      dayScore: this.userProfile.getDayScore(),
      dayTime: this.userProfile.getDayTime(),
      dayTimeHR: this.userProfile.getDayTimeHR(),
      dayExercises: this.userProfile.getDayExercises(),
      profileDate: this.userProfile.getProfileDate(),
      totalScore: this.userProfile.getTotalScore(),
      totalTime: this.userProfile.getTotalTime(),
      totalTimeHR: this.userProfile.getTotalTimeHR(),
      totalExercises: this.userProfile.getTotalExercises(),
      intervalGameScore: this.userProfile.getIntervalGameScore(),
      scaleGameScore: this.userProfile.getScaleGameScore(),
      chordsGameScore: this.userProfile.getChordsGameScore(),
      exercisesResult: this.userProfile.getExercisesResult(),
      achievements: this.userProfile.getAchievements(),
    };
    localStorage.setItem('guestUserProfile', JSON.stringify(guestUserProfile));
  }

  public saveConfigDataToLocalStorage(): void {
    const guestUserConfig: IUserConfig = {
      dayGoals: {
        dayExercisesGoal: this.userConfig.getDayExercisesGoal(),
        dayScoreGoal: this.userConfig.getDayScoreGoal(),
        dayTimeGoal: this.userConfig.getDayTimeGoal(),
      },
      language: this.userConfig.getLanguage(),
      volume: `${this.userConfig.getVolume()}`,
      tempo: this.userConfig.getTempo(),
    };
    localStorage.setItem('guestUserConfig', JSON.stringify(guestUserConfig));
  }

  private addPageCloseEvent(): void {
    window.addEventListener('beforeunload', (): void => {
      this.saveProfileDataToLocalStorage();
      this.saveConfigDataToLocalStorage();
    });
  }

  private addGameEndEvent(): void {
    document.addEventListener('ongameend', (event: CustomEvent | Event): void => {
      const gameResult = (event as CustomEvent).detail;
      this.decomposeGameResult(gameResult);
      console.log('Game Result: ', gameResult);
    });
  }

  private getCurrentDate(): IDate {
    const date = new Date(Date.now());
    const currentDay = date.getDate();
    const currentYear = date.getFullYear();
    const currentDate = {
      day: currentDay,
      year: currentYear,
    };
    return currentDate;
  }

  public clearDayScore(): void {
    this.userProfile.setDayScore(0);
    this.userProfile.setDayTime(0);
    this.userProfile.setDayExercises(0);
    this.userProfile.setProfileDate(this.getCurrentDate());
  }

  public clearUserProfileData(): void {
    this.clearDayScore();
    this.userProfile.setTotalScore(0);
    this.userProfile.setTotalTime(0);
    this.userProfile.setTotalExercises(0);
    this.userProfile.setIntervalGameScore(0);
    this.userProfile.setScaleGameScore(0);
    this.userProfile.setChordsGameScore(0);
    this.userProfile.clearExercisesResult();
    this.userProfile.clearAchievements();
  }

  private decomposeGameResult(gameResult: IGameResult): void {
    this.userProfile.increaseDayScore(gameResult.gameScore);
    this.userProfile.increaseDayTime(gameResult.gameTime);
    this.userProfile.increaseDayExercises(1);
    this.userProfile.increaseTotalScore(gameResult.gameScore);
    this.userProfile.increaseTotalTime(gameResult.gameTime);
    this.userProfile.increaseTotalExercises(1);
    const gameTypeArr = gameResult.gameName.split('-');
    const gameType = gameTypeArr[0];
    console.log(gameType);
    if (gameType === 'interval') {
      this.userProfile.increaseIntervalGameScore(gameResult.gameScore);
    }
    if (gameType === 'scales') {
      this.userProfile.increaseScaleGameScore(gameResult.gameScore);
    }
    if (gameType === 'chords') {
      this.userProfile.increaseChordsGameScore(gameResult.gameScore);
    }
    const newExerciseResult = {
      exercise: gameResult.gameName,
      score: gameResult.gameScore,
    };
    this.userProfile.addExercisesResult(newExerciseResult);
    console.log('User Profile after game end: ', this.userProfile);
  }

  private setDayCheckInterval(): void {
    setInterval(() => {
      const currentDate = this.getCurrentDate();
      const userProfileDate = this.userProfile.getProfileDate();
      if (currentDate.day !== userProfileDate.day || currentDate.year !== userProfileDate.year) {
        this.clearDayScore();
        console.log('reset day progress');
      }
    }, 60000);
  }
}

export default UserDataHandler;
