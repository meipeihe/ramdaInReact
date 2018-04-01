import R from "ramda";
import React from "react";
import ErrorMessage from "./ErrorMessage.jsx";
import Command from "./Command.jsx";
import Table from "./Table.jsx";
import {
  SAVE_VALUE_MISS_ERROR,
  OUT_OF_TABLE_ERROR_MESSAGE,
  EMPTY_TABLE_ERROR_MESSAGE,
  VALID_CODE,
  CREATE_KEY,
  INSERT_KEY,
  SAVE_KEY,
  EXIT_KEY
} from "../constant/template.js";

import { createTable, updateTable, saveTable } from "../util/table-helper.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.during = 5;
    this.state = {
      errorMessage: "",
      data: [],
      tableX: 0,
      tableY: 0
    };
  }

  onKeyPress(result) {
    if (result.code){
      this.setState({ errorMessage: result.message });
      return 
    }

    this.setState({ errorMessage: "" });
    this.operateTable(result.data);
    
  }

  operateTable(data) {
    if (data[0] === CREATE_KEY) {
      this.createTable(...R.tail(data));
    } else if (data[0] === INSERT_KEY) {
      this.insertTable(...R.tail(data));
    } else if (data[0] === SAVE_KEY) {
      this.saveTable(...R.tail(data));
    } else if (data[0] === EXIT_KEY) {
      this.exit();
    }
  }

  exit() {
    this.setState({
      errorMessage: "",
      data: [],
      tableX: 0,
      tableY: 0
    });
  }

  saveTable(x, y, x1, y1, x2, y2) {
    if (
      !this.checkTable(x, y) ||
      !this.checkTable(x1, y1) ||
      !this.checkTable(x2, y2)
    )
      return;

    const data = saveTable(x - 1, y - 1, x1 - 1, y1 - 1, x2 - 1, y2 - 1,this.state.data)
    if(data){
      this.setState({
        data: data
      });
    }else {
      this.setState({ errorMessage: SAVE_VALUE_MISS_ERROR });
    }
  }

  insertTable(x, y, value) {
    if (!this.checkTable(x, y)) return;
    const data = updateTable(x-1,y-1,this.state.data,value)
    this.setState({
      data: data
    });
  }

  createTable(x, y) {
    this.setState({
      tableX: x,
      tableY: y
    });
    const data = createTable(x,y)
    this.setState({
      data: data
    });
  }

  checkTable(x, y) {
    if (this.state.tableX === 0 || this.state.tableY === 0) {
      this.setState({ errorMessage: EMPTY_TABLE_ERROR_MESSAGE });
      return false;
    }
    if (x > this.state.tableX || x === 0 || y > this.state.tableY || y === 0) {
      this.setState({ errorMessage: OUT_OF_TABLE_ERROR_MESSAGE });
      return false;
    }
    return true;
  }

  render() {
    return (
      <div className="root">
        <h1>React Table Commander</h1>
        <ErrorMessage message={this.state.errorMessage} during={this.during} />
        <Command onKeyPress={this.onKeyPress.bind(this)} />
        <Table data={this.state.data} />
      </div>
    );
  }
}
