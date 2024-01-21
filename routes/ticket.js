const router = require('express').Router();
const db = require('../db/db');



/** 
 * find , update ,delete tickets using id
 */

router.route('/t/:ticketId')
    .get((req,res)=>{
        const ticketId = req.params.ticketId;
        const ticket = db.findById(ticketId);
        res.status(200).json(ticket);
    })
    .patch((req,res)=>{
        const ticketId = req.params.ticketId;
        const updatedTicket = db.updateById(ticketId,req.body);
        console.log(updatedTicket);
        res.status(200).json({
            message:'Updated successfull',
            updatedTicket
        });
    })
    .delete((req,res)=>{
        const ticketId = req.params.ticketId;
        db.deleteById(ticketId);
        res.status(203).json('delete successfull');
    });

/** 
 * find , update ,delete tickets using username
 */

router.route('/u/:username')
    .get((req,res)=>{
        const username = req.params.username;
        const tickets = db.findByUser(username);
        res.status(200).json(tickets);
    })
    .patch((req,res)=>{
        const username = req.params.username;
        const updatedTicket = db.updateByUserName(username,req.body);
        res.status(200).json({
            massege:'Upated successfull',
            updatedTicket
        })
    })
    .delete((req,res)=>{
        const username = req.params.username;
        const deleteTickets = db.deleteByUserName(username);
        res.status(203).json({
            massege:'Deleted successfull by username',
            deleteTickets
        })
    });


/** 
 * create a single ticket
 */

router.route('/sell')
    .post((req,res)=>{
        const {username,price} = req.body;
        const ticket = db.create(username,price);
        res.status(201).json({
            massege:'Ticket created successfully',
            ticket
        });
    })
  

/** 
 * create many ticket by a single user 
 */

router.route('/bulk')
    .post((req,res)=>{
        const {username,price,quantity} = req.body;
        const tickets = db.bulkCreate(username,price,quantity);
        res.status(201).json({
            massege:'Bulk ticket created successfully',
            tickets
        });
    })

/** 
 * create draw route 
 */

router.get('/draw',(req,res)=>{
    const winnerCount = req.query.wc ?? 3;
    const winners = db.draw(winnerCount);
    res.status(200).json({
        massege:'The winner are: ',
        winners
    });
});

/** 
 * show all  tikets from default '/' route 
 */

router.get('/',(req,res)=>{
    const tickets = db.find();
    res.status(200).json(tickets);
});


module.exports = router;
