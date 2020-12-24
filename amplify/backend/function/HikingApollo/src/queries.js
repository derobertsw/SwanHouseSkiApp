// /* eslint-disable */
// // this is an auto generated file. This will be overwritten

// const { gql } = require('apollo-server-lambda');

// export const listTrails = `
//   query ListTrails {
//     listTrails {
//       trailID
//       name
//       summary
//       difficulty
//       rating
//       num_of_ratings
//       length
//       ascent
//       descent
//     }
//   }
// `;
// export const listTrail = /* GraphQL */ `
//   query ListTrail($trail_id: ID!) {
//     listTrail(trail_id: $trail_id) {
//       trailID
//       name
//       summary
//       difficulty
//       rating
//       num_of_ratings
//       length
//       ascent
//       descent
//     }
//   }
// `;
// export const listUsersInGroup = /* GraphQL */ `
//   query ListUsersInGroup($group_id: ID!) {
//     listUsersInGroup(group_id: $group_id) {
//       id
//       name
//       lat
//       long
//       favorites {
//         trailID
//         name
//         summary
//         difficulty
//         rating
//         num_of_ratings
//         length
//         ascent
//         descent
//       }
//       groups {
//         groupID
//         name
//       }
//     }
//   }
// `;
// export const updateUserLocation = /* GraphQL */ `
//   query UpdateUserLocation($user_id: ID!, $lat: Float!, $long: Float!) {
//     updateUserLocation(user_id: $user_id, lat: $lat, long: $long) {
//       id
//       name
//       lat
//       long
//       favorites {
//         trailID
//         name
//         summary
//         difficulty
//         rating
//         num_of_ratings
//         length
//         ascent
//         descent
//       }
//       groups {
//         groupID
//         name
//       }
//     }
//   }
// `;
