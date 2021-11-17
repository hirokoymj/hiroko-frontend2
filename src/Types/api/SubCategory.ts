import { ICategory, IPageInfo } from "../api/Category";

export interface ISubCategory {
  id: string;
  name: string;
  order?: number;
  category: ICategory;
  createdAt: string;
  updatedAt: string;
}

export interface ISubCategories {
  limit: number;
  cursor: string;
  filter: [string];
}

export interface ISubCategoryFeed {
  subCategoryFeed: [ISubCategory];
  totalCount: number;
  pageInfo: IPageInfo;
}

export interface ISubCategoryById {
  id: string;
}

export interface ISubCategoryByCategory {
  id: string;
}
// createSubCategory(input: createSubCategoryInput): SubCategory
// updateSubCategory(id: ID!, input: updateSubCategoryInput!): SubCategory
// deleteSubCategory(id: ID!): SubCategory

export interface ICreateSubCategory {
  input: ICreateSubCategoryInput;
}

export interface ICreateSubCategoryInput {
  name: string;
  category: string;
  order?: number;
  categoryOrder?: number;
}
export interface IUpdateSubCategory {
  id: string;
  input: IUpdateSubCategoryInput;
}

interface IUpdateSubCategoryInput {
  name: string;
  order?: number;
  category: string;
}
