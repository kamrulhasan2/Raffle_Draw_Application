const Ticket = require('../models/Tickets');

class MyDb{
    constructor(){
        this.tickets = [];
    }
    /**
     * Create and save a new ticket
     * @param {string} username
     * @param {number} price
     * @param {Ticket} return a ticket object
     * 
     */
     create(username,price){
        const ticket = new Ticket(username,price);
        this.tickets.push(ticket);
        return ticket;
     }   

     /**
     * Create multiple tickets for a single user
	 * @param {string} username
	 * @param {number} price
	 * @param {number} quantity
	 * @returns {Array<Ticket>}
     */

     bulkCreate(user,price,quantity){
        const result = [];
        for(let i=0;i<quantity;i++){
            const ticket = this.create(username,price);
            result.push(ticket);
        }
        return result;
     }

     /**
	 * returns all available tickets
	 */

     find(){
        return this.tickets;
     }

     /**
	 * find ticket by ticket id
	 * @param {string} ticketId
	 * @returns {Ticket}
	 */

     findById(ticketId){
        const ticket = this.tickets.find((ticket)=> ticket.id === ticketId);
        return ticket;
     }

     /**
	 * find all tickets for a given user
	 * @param {string} username
	 * @returns {Array<Ticket>}
	 */

     findByUser(username){
        const tickets = this.tickets.filter((ticket)=> ticket.username === username);
        return tickets;
     }
     /**
     * update ticket by username
     * @param {string} username
     * @param {{username:string, price: number}} ticketBody
     * @returns {Array<Ticket>}
     */

     updateByUserName(username,ticketBody){
        const tickets = this.findByUser(username);
        tickets.forEach((ticket)=>{
            ticket.username = ticketBody.username ?? ticket.username;
            ticket.price = ticketBody.price ?? ticket.price;
            ticket.updatedAt = new Date();
        });
        return tickets;
     }

     /**
	 * update ticket by id
	 * @param {string} ticketId
	 * @param {{username: string, price: number}} ticketBody
	 * @returns {Ticket}
	 */

     updateById(ticketId,ticketBody){
        const ticket = this.findById(ticketId);
        ticket.username = ticketBody.username ?? ticket.username;
        ticket.price = ticketBody.price ?? ticket.price;
        ticket.updatedAt = new Date();

        return ticket;
     }

     /**
	 * delete ticket from db by id
	 * @param {string} ticketId
	 */

     deleteById(ticketId){
        const index = this.tickets.findIndex((ticket)=> ticket.id === ticketId);
        if(index !== -1){
            this.tickets.splice(index,1);
            return true;
        }
        else{
            return false;
        }
     }

   /**
   *  delete ticket by username
   * @param {string} username
   * @returns {Array<Ticket>}
   */

   deleteByUserName(username){
    const tickets = this.findByUser(username);
    this.tickets.forEach((ticket)=>{
        this.deleteById(ticket.id);
    });
    return tickets;
   }

    /**
	 * find winners
	 * @param {number} winnerCount
	 * @returns {Array<Ticket>}
	 */
    
    draw(winnerCount){
        const winnerIndexes = new Array(winnerCount);
        let index = 0;
        while(index < winnerCount){
            let winnerIndex = Math.floor(Math.random()* this.tickets.length);
            if(!winnerIndexes.includes(winnerIndex)){
                winnerIndexes[index++] = winnerIndex;
                continue;
            }
        }

        const winners = winnerIndexes.map((index) => this.tickets[index];
        
        return winners;
    }


}

const myDb = new MyDb();
module.exports = myDb;