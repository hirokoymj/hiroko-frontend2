import { ICategory, IPageInfo } from "../api/Category";

// subCategories(limit: Int, cursor: String, filter: [String]): SubCategoryFeed!
// subCategoryById(id: ID!): SubCategory
// subCategoryByCategory(categoryId: ID): [SubCategory!]
export interface ISubCategoriesVars {
  limit: number;
  cursor: string;
  filter?: any;
}

export interface ISubCategoryFeed {
  subCategoryFeed: [ISubCategory];
  totalCount: number;
  pageInfo: IPageInfo;
}

export interface ISubCategoryByIdVars {
  id: string;
}

export interface ISubCategory {
  id: string;
  name: string;
  order?: number;
  category: ICategory;
  createdAt: string;
  updatedAt: string;
}

export interface ISubCategoryByCategoryVars {
  categoryId: string;
}
// createSubCategory(input: createSubCategoryInput): SubCategory
// updateSubCategory(id: ID!, input: updateSubCategoryInput!): SubCategory
// deleteSubCategory(id: ID!): SubCategory

export interface ICreateSubCategoryVars {
  input: ICreateSubCategoryInput;
}

export interface ICreateSubCategoryInput {
  name: string;
  category: string;
  order?: number;
  categoryOrder?: number;
}

export interface IUpdateSubCategoryVars {
  id: string;
  input: IUpdateSubCategoryInput;
}

interface IUpdateSubCategoryInput {
  name: string;
  order?: number;
  category: string;
}

export interface IDeleteSubCategoryVars {
  id: string;
}
