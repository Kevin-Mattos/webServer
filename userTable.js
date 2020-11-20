
const sql = require('sqlite3').verbose()
let db = new sql.Database('./dbs/server.db', sql.OPEN_READWRITE | sql.OPEN_CREATE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the users database.');
  })

db.run('CREATE TABLE IF NOT EXISTS users(id integer PRIMARY KEY AUTOINCREMENT, userName text NOT NULL, password text, UNIQUE(userName) ON CONFLICT FAIL)')

function getAllUsers(callback){
    
    db.all('SELECT * FROM users', (err,rows) =>{
        if(err){
            console.log(`erro: ${err}`)
            callback(null)
            return
        }
            callback(rows)  
    })

}

function insertUser(params, callback){
    console.log(`user ${params[0]}, pass ${params[1]}}`)
    db.run('INSERT INTO users(userName, password) VALUES(?, ?)', params, (err,rows) =>{
        if(err)
            console.log(`erro: ${err}`)            
        
            callback(err)  
    })
    
}

function editUser(person, params, callback){
    db.run(`UPDATE users as u SET userName = ?, password = ? WHERE ${person.id} = u.id`, params, function(err){
        if(this.changes == 0 && !err){
            callback({'erro': 'usuario nao encontrado'})
            console.log(`erro: ${err}`)
        }else
            callback(err)  
    })
}

function getUserById(id, callback){
    db.all(`SELECT * FROM users WHERE users.id = ${id}`, (err, rows)=>{
        if(err){
            callback({}, err)
            return
        }
        if(rows.length != 1){
            callback({}, "usuario nao encontrado")
            return
        }

        callback(rows)
    })
}

function deleteUserById(id, callback){
    db.run(`DELETE FROM users WHERE users.id = ${id}`, function(err){  
        console.log(`Row(s) deleted ${this.changes}`)
        if(this.changes == 0 && !err)
            callback({'erro': 'usuario nao encontrado'})
        else
            callback(err)

    })
}

module.exports = {
    getAllUsers,
    insertUser,
    editUser,
    getUserById,
    deleteUserById
}