const myDb = require('../db/db');

const user1 = myDb.create('user 1',10);
myDb.create('user 2',10);
myDb.create('user 3',10);
myDb.create('user 4',10);
myDb.create('user 5',10);
myDb.create('user 6',10);
myDb.create('user 7',10);
myDb.create('user 8',10);
console.log(user1);
