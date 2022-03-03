export interface ICategoriesVars {
  limit: number;
  cursor?: string | null;
  filter?: any;
}
export interface ICategoryFeed {
  categoryFeed: [ICategory];
  totalCount: number;
  pageInfo: IPageInfo;
}
export interface IPageInfo {
  endCursor: string;
  hasNextPage: boolean;
}
export interface ICategory {
  id: string;
  name: string;
  abbr: string;
  order?: number;
  createdAt: string;
  updatedAt: string;
}
export interface ICategoryByIdVars {
  id: string;
}

export interface ICreateCategoryVars {
  input: ICreateCategoryInput;
}

interface ICreateCategoryInput {
  name: string;
  abbr: string;
  order?: number;
}
export interface IUpdateCategoryVars {
  id: string;
  input: IUpdateCategoryInput;
}

interface IUpdateCategoryInput {
  name: string;
  abbr: string;
  order?: number;
}
export interface IDeleteCategoryVars {
  id: string;
}
