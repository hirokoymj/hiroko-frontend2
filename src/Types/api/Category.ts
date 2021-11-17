export interface ICategory {
  id: string;
  name: string;
  abbr: string;
  order?: number;
  createdAt: string;
  updatedAt: string;
}

// categories(limit: Int, cursor: String, filter: [String]): CategoryFeed!

export interface ICategories {
  limit: number;
  cursor: string;
  filter: [string];
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

export interface ICategoryById {
  id: string;
}

export interface ICreateCategory {
  input: ICreateCategoryInput;
}

interface ICreateCategoryInput {
  name: string;
  abbr: string;
  order?: number;
}

export interface IUpdateCategory {
  id: string;
  input: IUpdateCategoryInput;
}

interface IUpdateCategoryInput {
  name: string;
  abbr: string;
  order?: number;
}

export interface IDeleteCategory {
  id: string;
}

// export type TCategoryDropdown = Pick<ICategory, "id" | "name">;
