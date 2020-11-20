const OK = 'OK'
const FAIL = 'FAIL'

class Answer {
    constructor(){       
        this.code = 0
    }

}

function createOkResponse(){
    let response = new Answer()
    response.code = OK
    return response
}

function createFailResponse(){
    let response = new Answer()
    response.code = FAIL
    return response
}

module.exports = {
    Answer,
    OK,
    FAIL,
    createOkResponse,
    createFailResponse
}