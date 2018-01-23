// tslint:disable
import { expect } from 'chai';
import * as deepFreeze from 'deep-freeze';
import { LoginState, loginReducer } from '../index';

describe('loginReducer', () => {
    it(`should return new LoginState with default values when passing 
    initialState equals undefined and action equals {}`, () => {
            let initialState = undefined;
            let action = {};

            let finalState = loginReducer(initialState, action);
            expect(finalState).not.to.be.undefined;
            expect(finalState.name).to.be.equal('LOGIN');
        });
})