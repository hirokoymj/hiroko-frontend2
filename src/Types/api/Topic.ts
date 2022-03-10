import { ICategory, IPageInfo } from "Types/api/Category";
import { ISubCategory } from "Types/api/SubCategory";

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
  order: number;
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
export interface ICreateTopicVars {
  input: ICreateTopicInput;
}
export interface ICreateTopicInput {
  title: string;
  url: string;
  category: string;
  subCategory: string;
  order: number;
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
  order: number;
}
