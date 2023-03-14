const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const UsersFactory = require('../../persistence/models/factories/users.factory');

const User =  new UsersFactory();

const salt = () => bcrypt.genSaltSync(10);
const createHash = (password) => bcrypt.hashSync(password, salt());
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

// Passport Local Strategy
passport.use('signup', new LocalStrategy(async(username, password, done) => {
   try{
        const userItem = {
            email: username,
            password: createHash(password)
        }
        const user = await User.createUser(userItem);
        console.log('User registration successfull');
        return done(null, user);
   }catch(error){
        console.log('Error signing user up...');
        console.log(error.message);
        return done(null, null);
   } 
}));

passport.use('signin', new LocalStrategy(async(username, password, done) => {
    try{
        const user = await User.getUserByEmail(username);
        if(!isValidPassword(user, password)){
            console.log('Invalid user or password');
            return done(null, false);
        }
        return done(null, user);
    }catch(error){
        console.log('Error signing user in...');
        console.log(error.message);
        return done(null, null);
    } 
 }));

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    try{
        const user = await User.getUserById(id);
        done(null, user);
    }catch(error){
        done(error);
    }
});

module.exports = passport;