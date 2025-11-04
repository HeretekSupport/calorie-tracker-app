import { Meal, Workout } from './Item.js';
import { CalorieTracker } from './calorietracker.js';


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
    document
      .querySelector('#meal-items')
      .addEventListener('click', this.#removeItem.bind(this, 'meal'));
    document
      .querySelector('#workout-items')
      .addEventListener('click', this.#removeItem.bind(this, 'workout'));

    document
      .querySelector('#filter-meals')
      .addEventListener('keyup', this.#filterItems.bind(this, 'meal'));
    document
      .querySelector('#filter-workouts')
      .addEventListener('keyup', this.#filterItems.bind(this, 'workout'));
    document
      .querySelector('#reset')
      .addEventListener('click', this.#reset.bind(this));
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
  #removeItem(type, e) {
    if (
      e.target.classList.contains('fa-xmark') ||
      e.target.classList.contains('delete')
    ) {
      const card = e.target.closest('.card');
      const toRemoveId = card.getAttribute('data-id');

      card.remove();

      switch (type) {
        case 'meal':
          this.#tracker.removeMeal(toRemoveId);
          break;
        case 'workout':
          this.#tracker.removeWorkout(toRemoveId);
          break;
      }
    }
  }
  #filterItems(type, e) {
    const inputText = e.target.value.toLowerCase();

    document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
      const itemName = item.querySelector('h4').textContent;
      if (inputText === '') {
        item.style.display = 'flex';
      } else if (itemName.includes(inputText)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
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
  #reset() {
    this.#tracker.resetDay();

    document.querySelector('#meal-items').innerHTML = '';
    document.querySelector('#workout-items').innerHTML = '';
    this.#resetFormInputs();
  }
}

const app = new App();
