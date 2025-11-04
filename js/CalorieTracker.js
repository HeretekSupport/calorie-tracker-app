class CalorieTracker {
  #calorieLimit = 2000;
  #totalCalories = 0;
  #meals = [];
  #workouts = [];

  constructor() {
    this.#displayCaloriesTotal();
    this.#displayCalorieLimit();
    this.#displayCaloriesConsumed();
    this.#displayCaloriesBurned();
    this.#displayCaloriesRemaining();
    this.#renderProgressBar();
  }

  //PRIVATE METHODS
  #displayCaloriesTotal() {
    const totalCaloriesEl = document.querySelector('#calories-total');
    totalCaloriesEl.textContent = this.#totalCalories;
  }
  #displayCalorieLimit() {
    const calorieLimitEl = document.querySelector('#calories-limit');
    calorieLimitEl.textContent = this.#calorieLimit;

    const remainingCalElBox = document.querySelector(
      '#calories-remaining'
    ).parentElement;

    this.#calorieLimit < this.#totalCalories
      ? this.#setWarningClass(remainingCalElBox, true)
      : this.#setWarningClass(remainingCalElBox, false);
  }
  #displayCaloriesConsumed() {
    const caloriesConsumedEl = document.querySelector('#calories-consumed');
    const totalConsumed = this.#meals.reduce(
      (acc, meal) => acc + meal.calories,
      0
    );
    caloriesConsumedEl.textContent = totalConsumed;
  }
  #displayCaloriesBurned() {
    const caloriesBurnedEl = document.querySelector('#calories-burned');
    const totalBurned = this.#workouts.reduce(
      (acc, workout) => acc + workout.calories,
      0
    );
    caloriesBurnedEl.textContent = totalBurned;
  }
  #displayCaloriesRemaining() {
    const caloriesRemainingEl = document.querySelector('#calories-remaining');
    caloriesRemainingEl.textContent = `${
      this.calorieLimit - this.totalCalories
    }`;
  }
  #displayNewMeal(meal) {
    const mealList = document.querySelector('#meal-items');
    const newMeal = document.createElement('div');
    newMeal.innerHTML = `
    <div class="card my-2" data-id="${meal.id}">
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${meal.name}</h4>
          <div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">
            ${meal.calories}
          </div>
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </div>
    `;
    mealList.appendChild(newMeal);
  }
  #displayNewWorkout(workout) {
    const workoutList = document.querySelector('#workout-items');
    const newWorkout = document.createElement('div');

    newWorkout.innerHTML = `
    <div class="card my-2" data-id="${workout.id}">
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${workout.name}</h4>
          <div class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5">
            ${workout.calories}
          </div>
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </div>
    `;
    workoutList.appendChild(newWorkout);
  }
  #renderProgressBar() {
    const barEl = document.querySelector('.progress-bar');
    const progressPercent = (this.#totalCalories / this.#calorieLimit) * 100;
    const width = Math.min(progressPercent, 100); //Make sure we never show more than 100%

    barEl.style.width = `${width}%`;
  }
  #renderStats() {
    this.#displayCalorieLimit();
    this.#displayCaloriesTotal();
    this.#displayCaloriesConsumed();
    this.#displayCaloriesBurned();
    this.#displayCaloriesRemaining();
    this.#renderProgressBar();
  }

  //HELPERS
  #setWarningClass(element, truthy) {
    if (element && truthy) {
      element.classList.contains('bg-danger')
        ? null
        : element.classList.add('bg-danger');
    } else if (element && !truthy) {
      element.classList.contains('bg-danger')
        ? element.classList.remove('bg-danger')
        : null;
    }
  }

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
  //SETTERS
  set calorieLimit(limitNum) {
    limitNum ? (this.#calorieLimit = limitNum) : null;
    this.#displayCalorieLimit();
  }
  addMeal(meal) {
    this.#meals.push(meal);
    this.#totalCalories += meal.calories;
    this.#displayNewMeal(meal);
    this.#renderStats();
  }

  addWorkout(workout) {
    this.#workouts.push(workout);
    this.#totalCalories -= workout.calories;
    this.#displayNewWorkout(workout);
    this.#renderStats();
  }

  removeMeal(mealID) {
    this.#totalCalories -= this.#meals.find(
      (meal) => meal.id === mealID
    ).calories;
    this.#meals = this.#meals.filter((x) => x.id !== mealID);
    this.#renderStats();
  }

  removeWorkout(workoutID) {
    this.#totalCalories += this.#workouts.find(
      (workout) => workout.id === workoutID
    ).calories;
    this.#workouts = this.#workouts.filter((x) => x.id !== workoutID);
    this.#renderStats();
  }

  resetDay() {
    this.#meals.length = 0;
    this.#workouts.length = 0;
    this.#totalCalories = 0;
    this.#renderStats();
  }


}

export { CalorieTracker };
