function checkInput(inputValue) {
    if (inputValue ===' ' || inputValue.length === 0){
        return false; //show alert
    } else {
        return true; //show result
    }
  }

export { checkInput }