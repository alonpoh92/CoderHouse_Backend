class MessageDto{
    constructor(id, email, message, date){
        this.id = id,
        this.email = email,
        this.message = message,
        this.date = date
    }
}

module.exports = MessageDto;