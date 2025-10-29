class CalorieTracker {
  #calorieLimit = 2000;
  #totalCalories = 0;
  #meals = [];
  #workouts = [];

  constructor() {}

  //PRIVATE METHODS
  #displayCaloriesTotal() {}
  #displayCalorieLimit() {}
  #displayCaloriesConsumed() {}
  #displayCaloriesBurned() {}
  #displayCaloriesRemaining() {}
  #displayNewMeal() {}
  #displayNewWorkout() {}
  #renderStats() {}
  //PUBLIC METHODS

  //GETTERS
  get calorieLimit() {
    return this.#calorieLimit;
  }
  get totalCalories() {
    return this.#totalCalories;
  }
  get meals() {
    return this.#meals;
  }
  get workouts() {
    return this.#workouts;
  }
  addMeal(meal) {
    this.#meals.push(meal);
    this.#totalCalories += meal.calories;
  }

  addWorkout(workout) {
    this.#workouts.push(workout);
    this.#totalCalories -= workout.calories;
  }

  removeMeal(mealID) {
    this.#totalCalories -= this.#meals.find((meal) => meal.id === mealID);
    this.#meals = this.#meals.filter((x) => x.id !== mealID);
  }

  removeWorkout(workoutID) {
    this.#totalCalories -= this.#workouts.find(
      (workout) => workout.id === workoutID
    );
    this.#workouts = this.#workouts.filter((x) => x.id !== workoutID);
  }

  resetDay() {}

  setLimit() {}
}

class Meal {
  constructor(name, calories) {
    //Since this is a front-end only app, we'll use this to generate a hexadecimal ID and skip the first 2 characters
    //which are always "0.".
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}
class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

const tracker = new CalorieTracker();

const breakfast = new Meal('Breakfast', 400);
const patheticAttemptAtPushUps = new Workout('Sad Push-Ups', 2);

tracker.addMeal(breakfast);
tracker.addWorkout(patheticAttemptAtPushUps);
