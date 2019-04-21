/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */

function ConvertHandler() {
  this.units = ["gal", "l", "mi", "km", "lbs", "kg"];
  this.convertUnits = ["l", "gal", "km", "mi", "kg", "lbs"];
  this.spelledUnits = [
    "gallons",
    "liters",
    "miles",
    "kilometers",
    "pounds",
    "kilograms"
  ];
  this.convertValues = {
    l: 3.78541,
    kg: 0.453592,
    km: 1.60934
  };

  this.getNum = function(input) {
    var result;
    var split = input.split('/')
    var regex = RegExp("/(?=.*/)|^[a-zA-Z]", "g");
    var numRegex = /\d/g

    if (!numRegex.test(input)) {
      result = 1 
    } else if (regex.test(input)) {
      result = 'invalid number'
    } else if (split.length > 1) {
      result = parseFloat(split[0], 10) / parseFloat(split[1], 10);
    } else {
      result = parseFloat(input, 10);

    }
    return result;
  };

  this.getUnit = function(input) {
    if (/\d+$/.test(input)) {
      return 'invalid unit';
    }
    var result;
    var regex = RegExp("[a-z]+", "gi")
    var unit = input.match(regex)[0].toLowerCase()
    //by default invalid unit
    result = 'invalid unit'
    //check if Valid Unit, if yes set result to unit
    for (var i = 0; i < this.units.length; i++) {
      if (this.units[i] === unit) {
        result = unit;
      }
    }

    return result;
  };

  this.getReturnUnit = function(initUnit) {
    var result;
    for (var i = 0; i < this.units.length; i++) {
      if (initUnit === this.units[i]) {
        result = this.convertUnits[i];
      }
    }

    return result;
  };

  this.spellOutUnit = function(unit) {
    var result;
    for (var i = 0; i < this.units.length; i++) {
      if (unit === this.units[i]) {
        result = this.spelledUnits[i];
      }
    }
    return result;
  };

  this.convert = function(initNum, initUnit) {
    var input = [5, "gal"];
    var returnUnit = this.getReturnUnit(initUnit);
    var convertValues = this.convertValues
    //what is the first val and then I get the returnunit as the second val
    if (convertValues[returnUnit]) {
      result = initNum * convertValues[returnUnit];
    } else {
      result = initNum / convertValues[initUnit];
    }

    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;
    var spellOutInitUnit = this.spellOutUnit(initUnit)
    var spellOutReturnUnit = this.spellOutUnit(returnUnit)
    result = `${initNum} ${spellOutInitUnit} converts to ${returnNum} ${spellOutReturnUnit}`
    return result;
  };
}
module.exports = ConvertHandler;
