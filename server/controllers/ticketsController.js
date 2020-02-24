/**
 * ************************************
 *
 * @author Joshua
 * @date 2/21/20
 * @description get tickets data from db middleware
 *
 * ************************************
 */

// import access to database
const db = require('../models/userModel');

const ticketsController = {};

ticketsController.addNewTicket = (req, res, next) => {
  const {  snaps_given, mentee_id, status, message } = req.body;
  const addTicket = `
    INSERT INTO tickets
    (snaps_given, mentee_id, status, message, timestamp)
    VALUES
    (${snaps_given}, ${mentee_id}, '${status}', '${message}', NOW())
    RETURNING _id, timestamp, mentee_id;
  `;
  db.query(addTicket)
    .then(ticket => {
      res.locals.ticketId = ticket.rows[0]._id;
      res.locals.timestamp = ticket.rows[0].timestamp;
      res.locals.menteeId = ticket.rows[0].mentee_id; 
      return next();
    })
    .catch(err => next({
      log: `Error in middleware ticketsController.addNewTicket: ${err}`
    }))
}

ticketsController.getActiveTickets = (req, res, next) => {
  const getActiveTickets= `
    SELECT _id, snaps_given, message, status, timestamp, mentee_id FROM tickets
    WHERE status = 'active'
    OR status = 'pending';
  `;
  db.query(getActiveTickets)
    .then(({ rows }) => {
      const formatTickets = rows.map(ticket => ({
        messageInput: ticket.message,
        messageRating: ticket.snaps_given,
        messageId: ticket._id,
        menteeId: ticket.mentee_id,
        timestamp: ticket.timpestamp,
        status: ticket.status
       }))
      res.locals.activeTickets = formatTickets;
      return next();
    })
    .catch(err => next({
      log: `Error in middleware ticketsController.addNewTicket: ${err}`
    }))
}

module.exports = ticketsController;