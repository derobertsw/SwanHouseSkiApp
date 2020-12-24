const { gql } = require('apollo-server-lambda');

const typeDefs = gql`
	type Query {
		listTrails(lat: Float!, long: Float!): [Trail]
		getTrailsById(trailId: [ID]!): [Trail]
		getUser(userId: ID!): User
		listUsersInGroup(groupId: ID!): [User]
		getGroup(id: ID!): Group
		getAllGroups: [Group]
	}
	type Mutation {
		addFavorite(userId: ID!, newFavorite: ID!): User
		deleteFavorite(userId: ID!, oldFavorite: ID!): User
		addUserToGroup(groupId: ID!, userId: ID!): User
		removeUserFromGroup(groupId: ID!, userId: ID!): User
		addComment(trailId: ID!, username: String!, text: String!): Comment
		createUser(id: ID!, name: String!): User
		createGroup(
			name: String!
			members: [ID]
			ownerId: ID
			description: String
		): Group
		deleteGroup(groupId: ID!): Group
		addRating(userId: ID!, trailId: ID!, rating: Float!): Rating
	}
	type Comment {
		id: ID!
		trailId: ID!
		username: String!
		text: String!
	}
	type Group {
		id: ID!
		ownerId: ID
		name: String
		members: [ID]
		description: String
	}
	type Trail {
		id: ID!
		name: String!
		summary: String
		difficulty: String
		length: Float
		ascent: Int
		descent: Int
		img: String
		comments: [Comment]
		lat: Float
		long: Float
		conditionStatus: String
		conditionDetails: String
		conditionDate: String
		ratings: [Rating]
	}
	type Rating {
		userId: ID!
		trailId: ID!
		rating: Float!
	}
	type User {
		id: ID!
		name: String
		favorites: [ID]
		groups: [ID]
	}
	enum difficulty {
		Easy
		Medium
		Hard
	}
`;

// const typeDefs = gql`
//   input AddUser {
//     id: ID!
//     name: String
//     lat: Float
//     long: Float
//   }
// type Mutation {
// 	addFavorite(userId: ID!, newFavorite: ID!): Trail
// 	deleteFavorite(user_id: ID!, new_favorite: ID!): Trail
// 	addUserToGroup(group_id: ID!, user_id: ID!): [User]
//   addComment(trail_id: ID!, username: string): [Comment]
// }
// `;

module.exports = { typeDefs };
