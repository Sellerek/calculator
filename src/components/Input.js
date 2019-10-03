import React from "react";
import "./Input.css";
import PropTypes from "prop-types";

export const Input = props => <div className="input">{props.input}</div>;

Input.propTypes = {
  input: PropTypes.string.isRequired
};
