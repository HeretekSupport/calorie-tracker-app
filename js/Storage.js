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

  static getMealList() {
    let meals;

    localStorage.getItem('meals') === null
      ? (meals = [])
      : (meals = JSON.parse(localStorage.getItem('meals')));

    return meals;
  }
  static getWorkoutList() {
    let workouts;

    localStorage.getItem('workouts') === null
      ? (workouts = [])
      : (workouts = JSON.parse(localStorage.getItem('workouts')));

    return workouts;
  }
  static storeMeal(meal) {
    const meals = this.getMealList();
    meals.push(meal);

    localStorage.setItem('meals', JSON.stringify(meals));
  }
  static storeWorkout(workout) {
    const workouts = this.getWorkoutList();
    workouts.push(workout);

    localStorage.setItem('workouts', JSON.stringify(workouts));
  }
  static removeMeal(mealID) {
    let meals = this.getMealList();
    meals = meals.filter((x) => x.id !== mealID);
    localStorage.setItem('meals', JSON.stringify(meals));
  }
  static removeWorkout(workoutID) {
    let workouts = this.getWorkoutList();
    workouts = workouts.filter((x) => x.id !== workoutID);
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }
}

export { Storage };
