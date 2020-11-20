const Person = require('./Person')
const app = require('express')()
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const users = require('./userTable')
const Answer = require('./Answer')


 app.use((req, res, next) => {
     console.log(`new request made: ${Date.now()} at ${req.url}`)
     next()
 })

app.get('/', (req, res) => {
    console.log("eae")
    res.statusCode = 200
    let response = Answer.createOkResponse()
    res.send(response)
})

app.get('/users', (req, res) => {
    users.getAllUsers((rows) => {
        //console.log(rows)
        res.statusCode = 200
        let response = Answer.createOkResponse()
        response.users = rows
        res.send(response)
    })

    
})

app.get('/users/:id', (req, res) => {
    let id = req.params.id
    users.getUserById(id, (rows, err) => {
        //console.log(rows)
        if(err){
            let response = Answer.createFailResponse()
            response.error = err
            console.log(response)
            res.send('Usuario nao encontrado')
            return
        }
        
        res.statusCode = 200
        let response = Answer.createOkResponse()
        response.users = rows
        res.send(response)
    })

    
})


app.post('/users', (req, res) => {
    let body = req.body
    let usr = body.user
    let pwrd = body.password
    let params = [usr, pwrd]

    users.insertUser(params, (err) => {
        if(err){
            console.log("failed")
            let response = Answer.createFailResponse()
            response.reason = 'Failed to create User!'
            response.detailedReason = err
            res.send(response)
            return
        }
        let response = Answer.createOkResponse()
        response.reason = 'User Created!'
        res.send(response)
        console.log(`user inserted`)

    })

    
})

app.put('/users/:id', (req, res) => {
    let body = req.body
    let usr = body.user
    let pwrd = body.password
    let params = [usr, pwrd]
    const person = new Person()
    person.id = req.params.id

    users.editUser(person, params,(err) => {
        if(err){
            console.log("failed to edit")
            let response = Answer.createFailResponse()
            response.reason = 'Failed to edit user!'
            response.detailedReason = err
            res.send(response)
            return
        }
        let response = Answer.createOkResponse()
        response.reason = 'User edited!'
        res.send(response)
        console.log(`user edited`)
    })

})

app.delete('/users/:id', (req, res) => {
    let id = req.params.id   
    users.deleteUserById(id, (err) => {
        if(err){
            res.statusCode = 501
            let response = Answer.createFailResponse()
            response.reason = 'Failed to delete!'
            response.detailedReason = err
            res.send(response)
            return
        }
        let response = Answer.createOkResponse()
        response.reason = 'User deleted!'
        res.send(response)
      
    })
})



app.listen(3000)