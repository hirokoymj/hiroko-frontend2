import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@material-ui/core";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import FormDropdown from "Components/Inputs/FormDropdown";
import { CATEGORIES } from "Queries/Category";
import { ICategoryFeed, ICategoriesVars } from "Types/api/Category";
import { useQuery } from "@apollo/react-hooks";
import { makeDropdownOptions } from "Components/FormController/common";
import { useLazyQuery } from "@apollo/react-hooks";
import { SUB_CATEGORY_BY_CATEGORY } from "Queries/SubCategory";
import {
  ISubCategory,
  ISubCategoryByCategoryVars,
} from "Types/api/SubCategory";

const formSchema = yup.object().shape({
  category: yup.string().required(),
  subCategory: yup.string().required(),
});

interface ITopicFormField {
  category: string;
  subCategory: string;
}

export const TopicFormDemo = () => {
  const methods = useForm<ITopicFormField>({
    resolver: yupResolver(formSchema),
  });
  // Category Query.
  const { data, loading } = useQuery<ICategoryFeed, ICategoriesVars>(
    CATEGORIES
  );
  // Create Category dropdown.
  const category_options = makeDropdownOptions(
    data,
    "categories.categoryFeed",
    loading
  );
  // SubCategory
  const [
    getSubCategoryByCategory,
    { data: subCategoryData, loading: subCategoryLoading },
  ] = useLazyQuery<ISubCategory, ISubCategoryByCategoryVars>(
    SUB_CATEGORY_BY_CATEGORY
  );
  // SubCategory dropdown!!
  const subCategory_options = makeDropdownOptions(
    subCategoryData,
    "subCategoryByCategory",
    subCategoryLoading
  );

  const handleCategoryChange = async (
    e: React.ChangeEvent<{ value: unknown }>
  ) => {
    const newVal = e.target.value as string;
    console.log(newVal);
    methods.setValue("category", newVal); // IMPORTANT since getValues("category") won't work.
    await getSubCategoryByCategory({
      variables: { categoryId: newVal },
    });
  };

  const onSubmit = (data: ITopicFormField) => {
    console.log("onSubmit");
  };

  return (
    <>
      <Grid container>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            style={{ width: "100%" }}>
            <Grid item>
              <FormDropdown
                name="category"
                label="Category"
                options={category_options}
                onChange={handleCategoryChange}
                disabled={loading || subCategoryLoading}
              />
            </Grid>
            <Grid item>
              <FormDropdown
                name="subCategory"
                label="Sub Category"
                disabled={loading || subCategoryLoading}
                options={subCategory_options}
              />
            </Grid>
          </form>
        </FormProvider>
      </Grid>
    </>
  );
};
