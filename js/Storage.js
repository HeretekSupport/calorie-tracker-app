//All methods here will be static; We don't need to instantiate this class;

class Storage {
  static getCalorieLimit(defaultLimit = 2000) {
    let calorieLimit;

    localStorage.getItem('calorieLimit') === null
      ? (calorieLimit = defaultLimit)
      : (calorieLimit = +localStorage.getItem('calorieLimit'));

    return calorieLimit;
  }

  static storeCalorieLimit(calorieLimit) {
    localStorage.setItem('calorieLimit', calorieLimit);
  }

  static getTotalCalories(defaultCalories = 0) {
    let totalCalories;
    localStorage.getItem('totalCalories') === null
      ? (totalCalories = defaultCalories)
      : (totalCalories = +localStorage.getItem('totalCalories'));

    return totalCalories;
  }
  static storeTotalCalories(totalCalories) {
    localStorage.setItem('totalCalories', totalCalories);
  }

  static getMealList() {}
  static storeMeal() {}
  static getWorkoutList() {}
  static storeWorkout() {}
}

export { Storage };
