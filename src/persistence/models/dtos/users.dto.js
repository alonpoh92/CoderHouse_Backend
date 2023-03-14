class UserDto{
    constructor(id, email, password, createdAt, updatedAt){
        this.id = id,
        this.email = email,
        this.password = password,
        this.createdAt = createdAt,
        this.updatedAt = updatedAt
    }
}

module.exports = UserDto;