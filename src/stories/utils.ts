export const debounce = (func: () => void, delay: number) => {
  let timerId: NodeJS.Timeout; // keep track of current timer

  // return the function
  return (...args: never[]) => {
    const boundFunc = func.bind(this, ...args);
    clearTimeout(timerId);
    timerId = setTimeout(boundFunc, delay); // start the timer
  };
};
