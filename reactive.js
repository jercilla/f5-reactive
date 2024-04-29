class Observable {

  constructor(value) {
    this._listeners = [];
    this._value = value;
  }

  notify() {
    this._listeners.forEach(listener => listener(this._value));
  }

  subscribe(listener) {
    this._listeners.push(listener);
  }

  get value() {
    return this._value;
  }

  set value(val) {
    if (val !== this._value) {
      this._value = val;
      this.notify();
    }
  }
}

const value = (variable) => new Observable(variable);

const app = (data) => {
  Object.keys(data).forEach((key) => {
    const input = document.getElementById(key);
    const observable = data[key];

    input.value = observable.value;
    observable.subscribe(() => (input.value = observable.value));
    input.oninput = () => (observable.value = input.valueAsNumber);
    const debug = document.getElementById("debug");
    if (debug) {
      debugData(data);
      observable.subscribe(() => debugData(data));
    }
  });
};

const debugData = (data) => {
  let debug_data = "";
        Object.keys(data).forEach(key => {
          debug_data += key + ": " + data[key].value + "\n";
        })
        debug.innerHTML = debug_data;      
}
