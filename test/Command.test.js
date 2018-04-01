import React from "react";
import { shallow, mount, render } from "enzyme";
import {spy} from "sinon";
import { expect } from "chai";
import Command from "../app/components/Command";

describe('<Command/>',function(){
  const keyPressSpy = spy()
  const command = shallow(<Command />)
  command.setProps({
    onKeyPress: keyPressSpy
  })

  const setKeyPressData = (command,code,value)=>
     command.find('input').at(0).simulate('keypress', {
      charCode: code,
      currentTarget: {
        value: value
      }
    })
  

  it('should not call props onKeyPress when not type enter',()=>{
    setKeyPressData(command, 12, '')
    expect(keyPressSpy.notCalled).to.be.equal(true)
    
  })

  it('should return error when type in empty',()=>{
    setKeyPressData(command, 13, '')
    const expectData = {
      code:1,
      data : [],
      message :"Invalid Input",
      type : "INVALID"
    }
    expect(keyPressSpy.calledWith(expectData)).to.be.equal(true)
  })

  describe('Exit Command',()=>{
    it('should return error when type in Q1', () => {
      setKeyPressData(command, 13, 'Q1')
      const expectData = {
        type: "EXIT", data: [], code: 1, message: "Invalid Input"
      }
      expect(keyPressSpy.calledWith(expectData)).to.be.equal(true)
    })

    it('should return data when type in Q', () => {
      setKeyPressData(command, 13, 'Q')
      const expectData = {
        data: ["Q"],
        type: "EXIT"
      }
      expect(keyPressSpy.calledWith(expectData)).to.be.equal(true)
    })
  })

  describe('Create Command',()=>{
    it('should return expect data when type in C 5 5',()=>{
      setKeyPressData(command, 13, 'C 5 5')
      const expectData = {
        data: ["C", 5, 5],
        type: "CREATE"
      }
      expect(keyPressSpy.calledWith(expectData)).to.be.equal(true)
    })

    it('should return error when type in C 5a 5', () => {
      setKeyPressData(command, 13, 'C 5a 5')
      const expectData = {
        type: "CREATE", 
        data: [], 
        code: 2, 
        message: "Invalid Create Command(eg. C 5 5)"
      }
      expect(keyPressSpy.calledWith(expectData)).to.be.equal(true)
    })
  })

  describe('Insert Command',()=>{
    it('should return expect data when type in N 5 5 7', () => {
      setKeyPressData(command, 13, 'N 5 5 7')
      const expectData = {
        data: ["N", 5, 5, 7],
        type: "INSERT"
      }
      expect(keyPressSpy.calledWith(expectData)).to.be.equal(true)
    })

    it('should return error when type in N 5 5 7a', () => {
      setKeyPressData(command, 13, 'N 5 5 7a')
      const expectData = {
        type: "INSERT", 
        data: [], 
        code: 3,
        message: "Invalid Insert Command(eg. N 1 2 6)"
      }
      expect(keyPressSpy.calledWith(expectData)).to.be.equal(true)
    })
  })

  describe('Save Command', () => {
    it('should return expect data when type in S 5 5 7 2 3 5', () => {
      setKeyPressData(command, 13, 'S 5 5 7 2 3 5')
      const expectData = {
        data: ["S", 5, 5, 7, 2, 3, 5],
        type: "SAVE"
      }
      expect(keyPressSpy.calledWith(expectData)).to.be.equal(true)
    })

    it('should return error when type in S 5 5 7 2 3 5A', () => {
      setKeyPressData(command, 13, 'S 5 5 7 2 3 5A')
      const expectData = {
        type: "SAVE",
        data: [], 
        code: 4,
        message: "Invalid Save Command(eg. S 1 2 2 3 2 4)"
      }
      expect(keyPressSpy.calledWith(expectData)).to.be.equal(true)
    })
  })
})