const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const { withFilter } = require("apollo-server-express");

const Reservation = require("../../models/Reservation");
const Rev_hours = require("../../models/Rev_hours");
const checkAuth = require("../../util/check-auth");

const avaliable_hours = [
  { value: "2-1 م", label: "2-1 م" },
  { value: "3-2 م", label: "3-2 م" },
  { value: "4-3 م", label: "4-3 م" },
  { value: "5-4 م", label: "5-4 م" },
  { value: "6-5 م", label: "6-5 م" },
  { value: "7-6 م", label: "7-6 م" },
  { value: "8-7 م", label: "8-7 م" },
  { value: "9-8 م", label: "9-8 م" },
  { value: "10-9 م", label: "10-9 م" },
  { value: "11-10 م", label: "11-10م" },
  { value: "12-11 م", label: "12-11 م" },
];

module.exports = {
  Query: {
    async getReservations(_,__,context) {
      const user = checkAuth(context);
      // console.log({user})
      try {

        const reservations = await Reservation.find({
          // senderID:user.id,
          // recipentID :user.id,
        }).sort({
          createdAt: -1,
        }).populate("senderID").populate("playgroundID").populate("recipentID") ;
        // console.log({reservations})

        return reservations;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getLastReservation(_, { data,playgroundID }) {
      try {
        const lastReservation = await Reservation.find({
          data,
          playgroundID
        })
          .sort({
            createdAt: -1,
          })
          .limit(1);
          // console.log(lastReservation)
        return lastReservation[0];
      } catch (err) {
        throw new Error(err);
      }
    },
    async getReservationHours(_, { date,playgroundID }) {
      try {
        const reservationHours = await Rev_hours.find({
          date,
          playgroundID
        });
          console.log(reservationHours)
        return reservationHours[0];
      } catch (err) {
        throw new Error(err);
      }
    },
    // async getReservation(_, { userId }) {
    //   try {
    //     const reservation = await Post.findOne({
    //       userId,
    //     });
    //     if (reservation) {
    //       return reservation;
    //     } else {
    //       throw new Error("reservation not found");
    //     }
      // } catch (err) {
      //   throw new Error(err);
      // }
    // },
  },
  Mutation: {
    async createReservation(_, { reservationInput }, context) {
          try {
        const user = checkAuth(context);
        // console.log({reservationInput})

      const  rev_hours = await Rev_hours.find({
        playgroundID:reservationInput.playgroundID,
        date:reservationInput.date
      })
      console.log({rev_hours})
      // console.log({reservationInput})
      if(rev_hours.length === 0){
        
        if (reservationInput.date.trim() === "") {
          throw new Error("date body must not be empty");
        }
        if (reservationInput.time.length === 0 ) {
          throw new Error("time body must not be empty");
        }
      
        const res = new Rev_hours({
                date:reservationInput.date,
                playgroundID:reservationInput.playgroundID,
                rev_hours:reservationInput.time,
                createdAt: new Date().toISOString(),
              });
              newRes = await res.save();
              console.log({newRes})
      }
      if(rev_hours.length > 0){
        let newhours = await Rev_hours.findOneAndUpdate(
          { playgroundID:reservationInput.playgroundID,
            date:reservationInput.date
           },
          {rev_hours:[...rev_hours[0].rev_hours,...reservationInput.time]}
        );
        console.log({newhours})
      }

      const newReservation = new Reservation({
        ...reservationInput,
        createdAt: new Date().toISOString(),
      });
      const reservation = await newReservation.save();
      // console.log({reservation})

      
      return reservation;
    } catch (err) {
      throw new Error(err);
    }
    },

    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
