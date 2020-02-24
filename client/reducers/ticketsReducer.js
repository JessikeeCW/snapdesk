/**
 * ************************************
 *
 * @module  ticketsReducer
 * @author
 * @date
 * @description reducer for ticket data
 *
 * ************************************
 */

import * as types from '../constants/actionTypes';

const ticketState = {
  totalSnaps: 0,
  messageInput: '',
  messageRating: '',
  activeTickets: [],
  ticketsCount: 0,
  messageTopic: '',
  nextTicketId: 10000,
};

const ticketsReducer = (state = ticketState, action) => {
  switch (action.type) {
    // case types.USER_LOGIN:
    //   console.log(action);
    //   const isLoggedIn = action.payload.isLoggedIn;
    //   return {
    //     ...state,
    //     isLoggedIn
    //   };

    case types.POST_TICKET:
      // build new ticket object to be inserted into activeTickets array (use props from FeedContainer)
      const newTicket = {
        messageInput: state.messageInput,
        messageRating: state.messageRating,
        messageId: state.nextTicketId,
        status: 'active'
      };
      // make a shallow copy of existing array and push new ticket to it
      let updatedTickets = state.activeTickets.slice();
      updatedTickets.push(newTicket);
      // return updated state and reset message input/ratings to blank
      return {
        ...state,
        activeTickets: updatedTickets,
        ticketsCount: state.ticketsCount + 1,
        nextTicketId: state.nextTicketId + 1,
        messageInput: '',
        messageRating: '',
      };

    case types.ACCEPT_TICKET:
      return { ...state };

    case types.CANCEL_ACCEPT:
      return { ...state };

    case types.DELETE_TICKET:
        let idx;
        updatedTickets = state.activeTickets.map((ticket, index) => {
          if (ticket.messageId === action.payload) {
            idx = index
            return ticket;
          }
          return ticket;
        })
        updatedTickets.splice(idx, 1)
      
      return { 
        ...state,
        activeTickets: updatedTickets,
        ticketsCount: state.ticketsCount - 1
      };

    case types.RESOLVE_TICKET:
        idx;
        updatedTickets = state.activeTickets.map((ticket, index) => {
          if (ticket.messageId === action.payload) {
            idx = index
            return ticket;
          }
          return ticket;
        })
        updatedTickets.splice(idx, 1)
      
      return { 
        ...state,
        activeTickets: updatedTickets,
        ticketsCount: state.ticketsCount - 1
      };

    case types.UPDATE_MESSAGE:
      return { ...state, messageInput: action.payload };

    case types.UPDATE_RATING:
      return { ...state, messageRating: action.payload };

    default:
      return state;
  }
};

export default ticketsReducer;
