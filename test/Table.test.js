import R from 'ramda'
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import Table from '../app/components/Table';


describe('<Table/>', ()=> {
    const mockX = 5
    const mockY = 6
    it(`Table should have ${mockX} coloums and ${mockY} rows when property data has value`, ()=> {

        const mockRow = R.repeat('', mockX)
        const mockData = R.repeat(mockRow, mockY)
        const table = shallow( < Table / > );
        table.setProps({
            data: mockData
        })
        expect(table.find('tr').length).to.equal(mockY);
        expect(table.find('tr').find('td').length).to.equal(mockX * mockY);
    });

    it(`Table should have no table when property data has no value`, ()=> {
        const table = shallow( < Table / > );
        expect(table.find('table').length).to.equal(0);

    });
});