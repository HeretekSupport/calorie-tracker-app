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

export { Meal, Workout };
