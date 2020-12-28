const { gql } = require("apollo-server-express");

module.exports = gql`
  #Types
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  type User {
    id: ID!
    token: String
    email: String!
    username: String!
    userImgUrl: String!
    phone: String!
    createdAt: String!
  }
  # new stuff
  type Avaliable_hours {
    id: ID!
    value: String!
    label: String!
    active: Boolean!
  }
  type newTime {
    label: String!
    value: String!
  }

  input newTimeInput {
    label: String!
    value: String!
  }
  type ReservationHours {
    date: String!
    playgroundID: String!
    rev_hours: [String]!
    createdAt: String!
  }
  type Reservation {
    id: ID!
    date: String!
    time: [String]!
    newTimes: [newTime]!
    createdAt: String!
    senderID: ID!
    recipentID: ID!
    playgroundID: ID!
  }
  type ReservationOne {
    id: ID!
    date: String!
    time: [String]!
    newTimes: [newTime]!
    createdAt: String!
    senderID: User!
    recipentID: User!
    playgroundID: PlayGround!
  }
  type PlayGround {
    id: ID!
    name: String!
    city: String!
    location: String!
    price: String!
    contactNumber: String!
    amenities: [String]!
    owner: String!
    ownerId: String!
    ownerPhone: String!
    ownerImgUrl: String!
    ownerCreatedAt: String!
    createdAt: String!
    avaliable_hours_start: String!
    avaliable_hours_end: String!
    playground_Images: [String]!
  }
  type amenitiesChip {
    key: String!
    label: String!
  }

  #Inputs
  input ReservationInput {
    date: String!
    time: [String]!
    newTimes: [newTimeInput]!
    senderID: ID!
    recipentID: ID!
    playgroundID: ID!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
    phone: String!
  }
  input PlayGroundInput {
    name: String!
    city: String!
    location: String!
    price: String!
    contactNumber: String!
    amenities: [String]!
    avaliable_hours_start: String!
    avaliable_hours_end: String!
    playground_Images: [String]!
  }
  input UpdatePlayGroundInput {
    name: String!
    city: String!
    location: String!
    price: String!
    contactNumber: String!
    amenities: [String]!
    avaliable_hours_start: String!
    avaliable_hours_end: String!
    playground_Images: [String]!
  }
  input NotificationInputs {
    sender: String!
    recipient: String!
    screamId: String!
    type: String!
    read: String!
    createdAt: String!
  }
  type Notification {
    sender: String!
    recipient: String!
    screamId: String!
    type: String!
    read: String!
    createdAt: String!
  }
  type Query {
    getUsers: [User]!
    getPosts: [Post]
    getPlaygrounds(limit: Int!, skip: Int!): [PlayGround]
    getUser(userId: ID!): User
    getPost(postId: ID!): Post
    getReservations: [ReservationOne]!
    getLastReservation(date: String!, playgroundID: ID!): Reservation!
    getReservationHours(date: String!, playgroundID: ID!): ReservationHours
    # getReservation(userId: ID!): Reservation!
    getPlayground(playgroundId: ID!): PlayGround
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    createPost(body: String!): Post!
    createPlayGround(playGroundInput: PlayGroundInput): PlayGround!
    updateUser(
      username: String!
      phone: String!
      bio: String
      userImgUrl: String!
    ): User!
    updatePlayGround(
      updateInput: UpdatePlayGroundInput!
      playgroundId: ID!
    ): PlayGround!
    createComment(postId: String!, body: String!): Post!
    createReservation(reservationInput: ReservationInput!): Reservation!
    createNotification(notificationInputs: NotificationInputs!): Notification!
    deletePost(postId: ID!): String!
    deletePlayGround(playgroundId: ID!): String!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
  type Subscription {
    newPost: Post!
  }
`;
