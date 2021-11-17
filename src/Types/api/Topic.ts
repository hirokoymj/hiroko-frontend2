import { ICategory, IPageInfo } from "Types/api/Category";
import { ISubCategory } from "Types/api/SubCategory";

export interface ITopic {
  id: string;
  title: string;
  url: string;
  category: ICategory;
  subCategory: ISubCategory;
  createdAt: string;
  updatedAt: string;
}
export interface ITopicFeed {
  topicFeed: [ITopic];
  totalCount: number;
  pageInfo: IPageInfo;
}
// Query
export interface ITopics {
  limit: number;
  cursor: string;
  filter: [string];
}
export interface ITopicById {
  id: string;
}
export interface ITopicByCategory {
  categoryId: string;
}
export interface topicByCategoryAbbr {
  abbr: string;
}
// Mutation
export interface ICreateTopic {
  input: ICreateTopicInput;
}
export interface ICreateTopicInput {
  title: string;
  url: string;
  category: string;
  subCategory: string;
}
export interface IDeleteTopic {
  id: string;
}
export interface IUpdateTopic {
  id: string;
  input: IUpdateTopicInput;
}
export interface IUpdateTopicInput {
  title: string;
  url: string;
  category: string;
  subCategory: string;
}
