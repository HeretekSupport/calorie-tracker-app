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
    <div class="card my-2">
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
    <div class="card my-2">
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
    this.#totalCalories -= this.#workouts.find(
      (workout) => workout.id === workoutID
    ).calories;
    this.#workouts = this.#workouts.filter((x) => x.id !== workoutID);
    this.#renderStats();
  }

  resetDay() {
    //check for in-memory limit value
  }

  setLimit(limitNum) {
    limitNum ? (this.#calorieLimit = limitNum) : null;
    this.#displayCalorieLimit();
  }
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

class App {
  #tracker;

  constructor() {
    this.#tracker = new CalorieTracker();

    //Add all event listeners here
    document
      .querySelector('#meal-form')
      .addEventListener('submit', this.#newItem.bind(this, 'meal')); //Remember, if we don't bind the THIS object, it'll belong to the callback's context
    document
      .querySelector('#workout-form')
      .addEventListener('submit', this.#newItem.bind(this, 'workout'));
  }

  #newItem(type, e) {
    e.preventDefault();

    let itemForm = document.querySelector(`#${type}-form`);
    let itemName = itemForm.querySelector(`#${type}-name`);
    let itemCals = itemForm.querySelector(`#${type}-calories`);

    if (itemName.value === '' || itemCals.value === '') {
      alert(`Please fill in all the fields for your ${type}`);
      return;
    }

    switch (type) {
      case 'meal':
        //+ is shorthand to turn the string into a number; Otherwise it'll just concat the value to the placeholder '0' and you end up with '0abc' value
        const newMeal = new Meal(itemName.value, +itemCals.value);
        this.#tracker.addMeal(newMeal);
        this.#resetFormInputs(`${type}-form`, type);
        break;
      case 'workout':
        const newWorkout = new Workout(itemName.value, +itemCals.value);
        this.#tracker.addWorkout(newWorkout);
        this.#resetFormInputs(`${type}-form`, type);
        break;
    }
  }

  //HELPERS
  #resetFormInputs(formId, inputItemType) {
    const form = document.querySelector(`#${formId}`);
    form.reset();
    if (formId.includes('meal') || formId.includes('workout')) {
      const collapseItem = document.querySelector(`#collapse-${inputItemType}`);
      const bootstrapCollapse = new bootstrap.Collapse(collapseItem, {
        toggle: true,
      });
    }
  }
}

const app = new App();
