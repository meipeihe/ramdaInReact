import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import ErrorMessage from '../app/components/ErrorMessage';


describe('<ErrorMessage/>', ()=> {
    it('ErrorMessage should has error message when property message has value', ()=> {
        const mockMessage = 'error message'
        const errorMessage = shallow( < ErrorMessage / > );
        errorMessage.setProps({
            message: mockMessage
        })
        expect(errorMessage.find('p').text()).to.equal(mockMessage);
    });

    it('ErrorMessage should has no error message when property message has no value', ()=> {
        const mockMessage = ''
        const errorMessage = shallow( < ErrorMessage / > );
        errorMessage.setProps({
            message: mockMessage
        })
        expect(errorMessage.find('p').text()).to.equal(mockMessage);
    });
});