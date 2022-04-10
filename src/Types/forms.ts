import { ISubCategory } from "Types/api/SubCategory";
import { ITopic } from "Types/api/Topic";
import { ICoord } from "Types/api/DailyForcast";

export interface ICategoryFormFields {
  name: string;
  abbr: string;
}

export interface ISubCategoryFormFields {
  categoryId: string;
  name: string;
  order: string;
}

export type TTopicFormData = Pick<ITopic, "url" | "title"> & {
  category: string;
  subCategory: string;
  order: string; // order param is string.
};

export type TDailyForecasetFormData = Pick<ICoord, "lat" | "lon"> & {
  myCity: string;
};

export interface IFormSelectOptions {
  value: string;
  label: string;
}
