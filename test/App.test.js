import R from 'ramda'
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import App from '../app/components/App';
import { createTable, getTableValue } from '../app/util/table-helper.js'

describe('<App/>', () => {
    const app = shallow(<App />)
    const setKeyPressData = (app,code,value)=>{
        app.find('Command').shallow().find('input').simulate('keypress', {
            charCode: code,
            currentTarget: {
                value: value
            }
        })
    }

    const getMockData = (x,y)=>createTable(x,y)

    it('should show message "Invalid Input" when type in empty',()=>{
        setKeyPressData(app,13,'')
        const expectData = 'Invalid Input'
        expect(app.state().errorMessage).to.be.equal('Invalid Input')
    })

    it('should show message "Invalid Input" when type in "abc"', () => {
        setKeyPressData(app, 13, 'abc')
        const expectData = 'Invalid Input'
        expect(app.state().errorMessage).to.be.equal('Invalid Input')
    })

    describe('Create Table',()=>{
        const app = shallow(<App />)
        it('should create 5*6 table when type in "C 5 6"', () => {
            setKeyPressData(app, 13, 'C 5 6')
            const expectData = 'Invalid Input'
            expect(app.state().tableX).to.be.equal(5)
            expect(app.state().tableY).to.be.equal(6)
            expect(app.state().data).to.be.deep.equal(getMockData(5,6))
        })

        it('should show error message when type in "C 5a 6"', () => {
            setKeyPressData(app, 13, 'C 5a 6')
            const expectData = 'Invalid Create Command(eg. C 5 5)'
            expect(app.state().errorMessage).to.be.equal(expectData)
        })
    })

    describe('Insert Table',()=>{
        const app = shallow(<App />)
        it('should show error message when type in "N 1 2 3" before create table',()=>{
            setKeyPressData(app, 13, 'N 1 2 3')
            const expectData = 'Please Create Table First'
            expect(app.state().errorMessage).to.be.equal(expectData)
        })

        it('should show error message when type in incorrect command "N 1a 2 3"',()=>{
            setKeyPressData(app, 13, 'N 1a 2 3')
            const expectData = 'Invalid Insert Command(eg. N 1 2 6)'
            expect(app.state().errorMessage).to.be.equal(expectData)
        })

        it('should inert value when type in "N 1 2 3" after create table',()=>{
            setKeyPressData(app, 13, 'C 5 5')
            setKeyPressData(app, 13, 'N 1 2 3')
            getTableValue(1-1,2-1,app.state().data)
            const expectData = 3
            expect(getTableValue(1-1,2-1,app.state().data)).to.be.equal(expectData)
        })

        it('should show message "Operate Out Of Table" of error when type in "N 5 6 3"',()=>{
            setKeyPressData(app, 13, 'N 5 6 3')
            const expectData = "Operate Out Of Table"
            expect(app.state().errorMessage).to.be.equal(expectData)
        })
    })

    describe('Save Table',()=>{
        const app = shallow(<App />)
        it('should show error message when type in "S 1 2 3 4 5 6" before create table',()=>{
            setKeyPressData(app, 13, 'S 1 2 3 4 5 6')
            const expectData = 'Please Create Table First'
            expect(app.state().errorMessage).to.be.equal(expectData)
        })

        it('should show error message when type in incorrect command "S 1 2s 3 4 5 6"',()=>{
            setKeyPressData(app, 13, 'S 1 2s 3 4 5 6')
            const expectData = 'Invalid Save Command(eg. S 1 2 2 3 2 4)'
            expect(app.state().errorMessage).to.be.equal(expectData)
        })

        it('should show error message when type in "S 1 2 3 4 2 3" after create table',()=>{
            setKeyPressData(app, 13, 'C 5 5')
            setKeyPressData(app, 13, 'S 1 2 3 4 2 3')
            const expectData = 'Please type "N" command to set value at the location you type in first'
            expect(app.state().errorMessage).to.be.equal(expectData)
        })

        it('should show error message when type in "S 1 2 3 4 5 6" after create table',()=>{
            setKeyPressData(app, 13, 'S 1 2 3 4 5 6')
            const expectData = 'Operate Out Of Table'
            expect(app.state().errorMessage).to.be.equal(expectData)
        })

        it('should get value when type in "S 1 2 3 4 2 3" after set value',()=>{
            setKeyPressData(app, 13, 'N 1 2 5')
            setKeyPressData(app, 13, 'N 3 4 7')
            setKeyPressData(app, 13, 'S 1 2 3 4 2 3')
            expect(getTableValue(2-1,3-1,app.state().data)).to.be.equal(12)
        })

        it('should clear all the datas when type in "Q"',()=>{
            setKeyPressData(app,13,'Q')
            expect(app.state().errorMessage).to.be.equal("")
            expect(app.state().tableX).to.be.equal(0)
            expect(app.state().tableY).to.be.equal(0)
            expect(app.state().data).to.be.deep.equal([])
        })
    })

    
});