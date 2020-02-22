/**
 * ************************************
 *
 * @module  Wrapper
 * @author team snapdesk
 * @date 02/22/2020
 * @description component that renders Navbars, FeedContainer and TicketCreator
 *
 * ************************************
 */

import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import LeftNav from '../components/LeftNav';
import RightNav from '../components/RightNav';


const mapStateToProps = ({
  tickets: totalSnaps, leaderBoard, activeTickets
}) => ({
  totalSnaps,
  leaderBoard,
  activeTickets
})

const mapDispatchToProps = dispatch => ({
  userLogOut: () => dispatch(actions.userLogOut()),
});

const Wrapper = props => {
  <LeftNav />
  <RightNav />
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);