/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

var chai = require("chai");
var assert = chai.assert;
var ConvertHandler = require("../controllers/convertHandler.js");

var convertHandler = new ConvertHandler();

suite("Unit Tests", function() {
  suite("Function convertHandler.getNum(input)", function() {
    test("Whole number input", function(done) {
      var input = "32L";
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test("Decimal Input", function(done) {
      var input = '32.1km'
      assert.equal(convertHandler.getNum(input), 32.1)
      done()
    });

    test("Fractional Input", function(done) {
      var input = '1/2km'
      assert.equal(convertHandler.getNum(input), 0.5)
      done();
    });

    test("Fractional Input w/ Decimal", function(done) {
      var input = '5.4/3lbs'
      assert.equal(convertHandler.getNum(input), 1.8)
      done();

    });

    test("Invalid Input (double fraction)", function(done) {
      var input = '5.5/31lbs/32'
      assert.equal(convertHandler.getNum(input), 'invalid number')
      done();
    });

    test("No Numerical Input", function(done) {
      var input = 'a5.5'
      assert.equal(convertHandler.getNum(input), 'invalid number')
      done();
    });
  });

  suite("Function convertHandler.getUnit(input)", function() {
    test("For Each Valid Unit Inputs", function(done) {
      var input = [
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "L",
        "MI",
        "KM",
        "LBS",
        "KG"
      ];
      input.forEach(function(ele) {
        assert.equal(convertHandler.getUnit(ele), ele.toLowerCase())
      });
      done();
    });

    test("Unknown Unit Input", function(done) {
      var input = [
        "galbero",
        "beters",
        "adsfasdf",
      ];
      input.forEach(function(ele) {
        assert.equal(convertHandler.getUnit(ele), 'invalid unit')
      })
      done();
    });
  });

  suite("Function convertHandler.getReturnUnit(initUnit)", function() {
    test("For Each Valid Unit Inputs", function(done) {
      var input = ["gal", "l", "mi", "km", "lbs", "kg"];
      var expect = ["l", "gal", "km", "mi", "kg", "lbs"];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.spellOutUnit(unit)", function() {
    test("For Each Valid Unit Inputs", function(done) {
      var input = ["gal", "l", "mi", "km", "lbs", "kg"];
      var expect = ["gallons", "liters", "miles", "kilometers", "pounds", "kilograms"]
      input.forEach(function(el, i) {
        assert.equal(convertHandler.spellOutUnit(el), expect[i])
      })
      done();
    });
  });

  suite("Function convertHandler.convert(num, unit)", function() {
    test("Gal to L", function(done) {
      var input = [5, "gal"];
      var expected = 18.9271;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("L to Gal", function(done) {
      var input = [1, 'l']
      var expected = 0.2641720524
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      )
      done();
    });

    test("Mi to Km", function(done) {
      var input = [3.1, 'mi']
      var expected = 4.98895
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      )
      done();
    });

    test("Km to Mi", function(done) {
      var input = [4.98895, 'km']
      var expected = 3.1
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      )
      done();
    });

    test("Lbs to Kg", function(done) {
      var input = [1, 'lbs']
      var expected = 0.45359237
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1 
      )
      done();
    });

    test("Kg to Lbs", function(done) {
      var input = [1, 'kg']
      var expected = 2.2046226218
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1 
      )
      done();
    });
  });
});
