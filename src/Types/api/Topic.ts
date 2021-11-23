import { ICategory, IPageInfo } from "Types/api/Category";
import { ISubCategory } from "Types/api/SubCategory";

// topics(limit: Int, cursor: String, filter: [String]): TopicFeed!
// topicById(id: ID!): Topic!
// topicByCategory(categoryId: ID!): [Topic!]
// topicByCategoryAbbr(abbr: String!): [Topic!]

// Query
export interface ITopicsVars {
  limit?: number;
  cursor?: string | null;
  filter?: any;
}
export interface ITopicFeed {
  topicFeed: [ITopic];
  totalCount: number;
  pageInfo: IPageInfo;
}
export interface ITopicByIdVars {
  id: string;
}
export interface ITopic {
  id: string;
  title: string;
  url: string;
  category: ICategory;
  subCategory: ISubCategory;
  createdAt: string;
  updatedAt: string;
}

export interface ITopicByCategoryVars {
  categoryId: string;
}
export interface ITopicByCategoryAbbrVars {
  abbr: string;
}
// Mutation
// createTopic(input: createTopicInput): Topic
// deleteTopic(id: ID!): Topic
// updateTopic(id: ID!, input: updateTopicInput!): Topic
export interface ICreateTopicVars {
  input: ICreateTopicInput;
}
export interface ICreateTopicInput {
  title: string;
  url: string;
  category: string;
  subCategory: string;
}
export interface IDeleteTopicVars {
  id: string;
}
export interface IUpdateTopicVars {
  id: string;
  input: IUpdateTopicInput;
}
export interface IUpdateTopicInput {
  title: string;
  url: string;
  category: string;
  subCategory: string;
}
