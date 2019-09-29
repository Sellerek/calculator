import React, { Component } from "react";
import "./App.css";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { Result } from "./components/Result";
import * as math from "mathjs";

class Calculator extends Component {
  state = {
    input: "",
    result: ""
  };

  // Adding number, operator to "Input" section

  addToInput = val => {
    const { input } = this.state;

    this.setState({
      input: input === "0" ? String(val) : input + val
    });
  };

  // Making calculation

  handleEqual = () => {
    this.setState({ result: math.evaluate(this.state.input) });
  };

  // clear last character

  clearLastChar = () => {
    const { input } = this.state;

    this.setState({
      input: input.substring(0, input.length - 1) || "0"
    });
  };

  // Clear all from input/result

  clearDisplay = () => {
    this.setState({ input: "", result: "" });
  };

  // Switch between positive and negative number

  toggleSign = () => {
    const { input } = this.state;

    this.setState({
      input: input.charAt(0) === "-" ? input.substr(1) : "-" + input
    });
  };

  // Percentage

  inputPercent = () => {
    const { input } = this.state;
    const value = parseFloat(input);

    this.setState({
      input: String(value / 100)
    });
  };

  inputDot = () => {
    const { input } = this.state;

    if (!/\./.test(input)) {
      this.setState({
        input: input + "."
      });
    }
  };

  handleKeyDown = event => {
    const CalculatorOperators = {
      "*": "*",
      "/": "/",
      "-": "-",
      "+": "+"
    };

    let { key } = event;

    if (key === "Enter") key = "=";

    if (/\d/.test(key)) {
      event.preventDefault();
      this.addToInput(parseInt(key, 10));
    } else if (key in CalculatorOperators) {
      event.preventDefault();
      this.addToInput(key);
    } else if (key === "=") {
      event.preventDefault();
      this.handleEqual();
    } else if (key === ".") {
      event.preventDefault();
      this.inputDot();
    } else if (key === "%") {
      event.preventDefault();
      this.inputPercent();
    } else if (key === "Backspace") {
      event.preventDefault();
      this.clearLastChar();
    } else if (key === "Delete") {
      event.preventDefault();
      this.clearDisplay();
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    return (
      <div className="app">
        <div className="calc-wrapper">
          <Input input={this.state.input} />
          <Result result={this.state.result} />
          <div className="row">
            <Button handleClick={this.clearLastChar}>C</Button>
            <Button handleClick={this.toggleSign}>+/-</Button>
            <Button handleClick={this.inputPercent}>%</Button>
            <Button handleClick={() => this.addToInput("/")}>÷</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>1</Button>
            <Button handleClick={this.addToInput}>2</Button>
            <Button handleClick={this.addToInput}>3</Button>
            <Button handleClick={() => this.addToInput("*")}>x</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>4</Button>
            <Button handleClick={this.addToInput}>5</Button>
            <Button handleClick={this.addToInput}>6</Button>
            <Button handleClick={this.addToInput}>-</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>7</Button>
            <Button handleClick={this.addToInput}>8</Button>
            <Button handleClick={this.addToInput}>9</Button>
            <Button handleClick={this.addToInput}>+</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>0</Button>
            <Button handleClick={() => this.addToInput(".")}>,</Button>
            <Button handleClick={this.clearDisplay}>DEL</Button>
            <Button handleClick={this.handleEqual}>=</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
