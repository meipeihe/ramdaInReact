import R from "ramda";
import React from "react";
import {
  COMMAND_KEYS,
  ENTER_CHARCODE,
  CREATE_ERROR_CODE,
  INSERT_ERROR_CODE,
  SAVE_ERROR_CODE,
  INVALID_ERROR_CODE,
  VALID_CODE,
  CREATE,
  INSERT,
  SAVE,
  EXIT,
  INVALID,
  SAVE_ERROR_MESSAGE,
  INSERT_ERROR_MESSAGE,
  CREATE_ERROR_MESSAGE,
  INVALID_ERROR_MESSAGE
} from "../constant/template.js";

const errorMap = {
  [CREATE]: {
    code: CREATE_ERROR_CODE,
    message: CREATE_ERROR_MESSAGE
  },
  [INSERT]: {
    code: INSERT_ERROR_CODE,
    message: INSERT_ERROR_MESSAGE
  },
  [SAVE]: {
    code: SAVE_ERROR_CODE,
    message: SAVE_ERROR_MESSAGE
  },
  [INVALID]: {
    code: INVALID_ERROR_CODE,
    message: INVALID_ERROR_MESSAGE
  }
}

const invalidData = {
  type: INVALID
}

const commandMap = {
  C: {
    type: CREATE,
    checkRegexp: /^(C)\s([1-9]\d?)\s([1-9]\d?)$/,
  },
  N: {
    checkRegexp: /^(N)\s(\d+)\s(\d+)\s(\d{1,3})$/,
    type: INSERT,
  },
  S: {
    checkRegexp: /^(S)\s(\d+)\s(\d+)\s(\d+)\s(\d+)\s(\d+)\s(\d+)$/,
    type: SAVE,
  },
  Q: {
    type: EXIT,
    checkRegexp: /^(Q)$/
  }
};


const commandCreator = (key) => commandMap[key] || invalidData
const errorCreator = (errorCode) => errorMap[errorCode] || errorMap[INVALID]
const parseInt = (value) => value.length ? R.converge(R.concat, [
  R.take(1),
  R.pipe(
    R.tail,
    R.map(Number)
  )
])(value) : value
const dataCreator = (value) =>
  R.applySpec({
    type: R.prop('type'),
    data: R.pipe(
      R.prop('checkRegexp'),
      R.match(R.__, value),
      R.tail,
      parseInt
    )
  })

const applyError = (result) => result.data.length ? result :
  R.merge(result, errorCreator(result.type))


export default class Command extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }
  onKeyPress(e) {
    if (e.charCode === ENTER_CHARCODE) {
      const value = R.path(['currentTarget','value'])(e)
      const result = R.pipe(
        R.slice(0,1),
        commandCreator,
        dataCreator(value),
        applyError
      )(value)
      
      this.props.onKeyPress && this.props.onKeyPress(result)
    }
  }

  onChange(e) {
    this.setState({ value: e.currentTarget.value });
  }

  render() {
    return (
      <div className="command-wrapper">
        <input
          value={this.state.value}
          onChange={this.onChange.bind(this)}
          onKeyPress={this.onKeyPress.bind(this)}
        />
      </div>
    );
  }
}
