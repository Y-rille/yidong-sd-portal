import { expect } from 'chai';
import configureStore from 'redux-mock-store'
import reduxThunk from 'redux-thunk';
import { getConfig } from '../getConfig'
import actionTypes from '../../constants/actionTypes'
const middlewares = [reduxThunk];
const mockStore = configureStore(middlewares)

declare const sinon;

// describe('getConfig', () => {
//     // before(function () {
//     // });
//     // after(function () {
//     // });

//     it('should execute fetch data', (done) => {
//         const store = mockStore({});
//         const expectedAction = {
//             type: actionTypes.LOGIN_SAY_HELLO,
//             config: 'expectedMembers'
//         }
//         store.dispatch(getConfig()).then(() => {
//             const actions = store.getActions()
//             expect(actions[0].type).to.be.equal((expectedAction.type));
//             done()
//         })
//     })
// });