const AuthenticationError = require('apollo-server-express');
const {User, Game, Score} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query:{
        user: async() => {
            return await User.find({}).populate('scores');
        },
        game: async() => {
            return await Game.find({}).populate('scores');
        },
        scores: async() => {
            return await Score.find({});
        }
    },
    Mutation:{
        signUp: async(parent, {userName , email, password})=>{
           const newUser = await User.create({userName , email, password})
           const token = signToken(newUser);
           return {token, newUser};
        },

        login: async(parent, {userName , password})=>{
            const user = await User.findOne({userName})
            if (!user) {
                throw new AuthenticationError('No profile with this username/password found!');
              }
              const correctPW = await User.isCorrectPassword({password})
            if (!correctPW) {
                throw new AuthenticationError('No profile with this username/password found!');
              }
            const token = signToken(user);
            return {token, user};
         },

         updateUser: async(parent,{userName, email, password})=>{
             const updatedUser = await User.findOneAndUpdate({userName, email, password})
             const token = signToken(updatedUser);
             return {token, updatedUser};
         },

         removeUser: async(parent, {userId})=>{
             return User.findOneAndDelete({_id: userId})
         },

        //  addScore: async(parent, {score}) =>{
        //     const score = await Score.create({score});
        //     await User.findOneAndUpdate({
        //         // userid:session id (basically figure out user logged in)
        //         // {$addToSet:{scores: score._id}}
        //     })
        //  }

    }

};
// console.log(this.Mutation.login)

module.exports = resolvers;