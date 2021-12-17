import { ICategory } from "Types/api/Category";
import { ISubCategory } from "Types/api/SubCategory";
import { ITopic } from "Types/api/Topic";
import { ICoord } from "Types/api/DailyForcast";
import { string } from "prop-types";

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

export interface ICategoryOptions {
  value: string;
  label: string;
}
export interface ISubCategoryOptions extends ICategoryOptions {
  categoryId: string;
}
