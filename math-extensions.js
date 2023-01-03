//Math Object Extensions

Math.randomDec = function(low, high) {
    return Math.random() * (high - low) + low
  }
  
  Math.randomInt = function(low, high) {
    return Math.floor(Math.randomDec(low, high)) 
  }
  
  Math.randomElement = function(anArray) {
    //Randomly select and return an elemnet from an array
    return anArray[Math.randomInt(0, anArray.length)];
  }