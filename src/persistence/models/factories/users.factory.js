const UserDto = require('../dtos/users.dto');
const { UsersDao } = require('../daos/app.dao');

class UserFactory{
    constructor(){
        try{
            if(UserFactory._instance){
                throw new Error('UserFactory already has an instance!!!');
            }
            this.userDao = new UsersDao();
            UserFactory._instance = this;
        }catch(error){
            this.userDao = UserFactory._instance.userDao;
        }
    }

    async createUser(userObj){
        const newUser = new UserDto("undefined", userObj.email, userObj.password, new Date(), new Date());
        const user = await this.userDao.createUser(newUser);
        return user;
    }

    async getUserById(id){
        let user = await this.userDao.getUserById(id);
        return new UserDto(user.id, user.email, user.password, user.createdAt, user.updatedAt);
    }
    
    async getUserByEmail(email){
        let user = await this.userDao.getUserByEmail(email);
        user = user[0];
        return new UserDto(user.id, user.email, user.password, user.createdAt, user.updatedAt);
    }
}

module.exports = UserFactory;