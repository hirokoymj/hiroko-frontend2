import { ICategory } from "Types/api/Category";
import { ISubCategory } from "Types/api/SubCategory";
import { ITopic } from "Types/api/Topic";
import { ICoord } from "Types/api/DailyForcast";

export type ICategoryFormData = Pick<ICategory, "name" | "abbr">;

export type TSubCategoryFormData = Pick<ISubCategory, "name"> & {
  categoryId: string;
};

export type TTopicFormData = Pick<ITopic, "url" | "title"> & {
  category: string;
  subCategory: string;
};

export type TDailyForecasetFormData = Pick<ICoord, "lat" | "lon"> & {
  myCity: string;
};
