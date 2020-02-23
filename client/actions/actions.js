/**
 * ************************************
 *
 * @module  actions.js
 * @author team snapdesk
 * @date 02/22/2020
 * @description Action Creators
 *
 * ************************************
 */

// import actionType constants
import * as types from '../constants/actionTypes';

export const postTicket = () => {
  return {
      type: types.POST_TICKET,
    }
};

export const updateMessage = data => ({
  type: types.UPDATE_MESSAGE,
  payload: data
});

export const updateRating = data => ({
  type: types.UPDATE_RATING,
  payload: data
});
// export const acceptTicket = event => (dispatch, getState) => {
//   event.preventDefault();
//   dispatch({
//     type: types.ACCEPT_TICKET,
//     payload: ticket,
//   })
// }