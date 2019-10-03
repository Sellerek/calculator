import React from "react";
import "./Result.css";
import PropTypes from "prop-types";

export const Result = props => <div className="result">{props.result}</div>;

Result.propTypes = {
  result: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
