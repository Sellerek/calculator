import React, { useState, useEffect } from "react";
import "./App.css";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { Result } from "./components/Result";
import * as math from "mathjs";

const Calculator = () => {
  const [input, setInput] = useState("0");
  const [result, setResult] = useState("");

  // Adding number, operator to "Input" section

  const addToInput = val => {
    input === "0" ? setInput(String(val)) : setInput(input + val);
  };

  // Making calculation

  const handleEqual = () => {
    setResult(math.evaluate(input));
  };

  // clear last character

  const clearLastChar = () => {
    setInput(input.substring(0, input.length - 1) || "0");
  };

  // Clear all from input/result

  const clearDisplay = () => {
    setInput("");
    setResult("");
  };

  // Switch between positive and negative number

  const toggleSign = () => {
    input.charAt(0) === "-" ? setInput(input.substr(1)) : setInput("-" + input);
  };

  // Percentage

  const inputPercent = () => {
    const value = parseFloat(input);

    setInput(String(value / 100));
  };

  const inputDot = () => {
    if (!/\./.test(input)) {
      setInput(input + ".");
    }
  };

  const handleKeyDown = event => {
    const CalculatorOperators = {
      "*": "*",
      "/": "/",
      "-": "-",
      "+": "+"
    };

    let { key } = event;

    if (key === "Enter") {
      key = "=";
    }

    if (/\d/.test(key)) {
      event.preventDefault();
      addToInput(parseInt(key, 10));
    } else if (key in CalculatorOperators) {
      event.preventDefault();
      addToInput(key);
    } else if (key === "=") {
      event.preventDefault();
      handleEqual();
    } else if (key === ".") {
      event.preventDefault();
      inputDot();
    } else if (key === "%") {
      event.preventDefault();
      inputPercent();
    } else if (key === "Backspace") {
      event.preventDefault();
      clearLastChar();
    } else if (key === "Delete") {
      event.preventDefault();
      clearDisplay();
    }
  };

  // useEffect(() => {
  //   document.addEventListener("keydown", handleKeyDown);
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // });


  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  return (
    <div className="app">
      <div className="calc-wrapper">
        <Input input={input} />
        <Result result={result} />
        <div className="row">
          <Button handleClick={clearLastChar}>C</Button>
          <Button handleClick={toggleSign}>+/-</Button>
          <Button handleClick={inputPercent}>%</Button>
          <Button handleClick={() => addToInput("/")}>÷</Button>
        </div>
        <div className="row">
          <Button handleClick={addToInput}>1</Button>
          <Button handleClick={addToInput}>2</Button>
          <Button handleClick={addToInput}>3</Button>
          <Button handleClick={() => addToInput("*")}>x</Button>
        </div>
        <div className="row">
          <Button handleClick={addToInput}>4</Button>
          <Button handleClick={addToInput}>5</Button>
          <Button handleClick={addToInput}>6</Button>
          <Button handleClick={addToInput}>-</Button>
        </div>
        <div className="row">
          <Button handleClick={addToInput}>7</Button>
          <Button handleClick={addToInput}>8</Button>
          <Button handleClick={addToInput}>9</Button>
          <Button handleClick={addToInput}>+</Button>
        </div>
        <div className="row">
          <Button handleClick={addToInput}>0</Button>
          <Button handleClick={() => addToInput(".")}>,</Button>
          <Button handleClick={clearDisplay}>DEL</Button>
          <Button handleClick={handleEqual}>=</Button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
