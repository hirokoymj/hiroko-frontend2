// import React from "react";
// import { Field, reduxForm, formValueSelector } from "redux-form";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";
// import { connect } from "react-redux";
// import { useParams } from "react-router-dom";

// import { TopicEditFormController } from "../FormController/TopicEditFormController";
// import { FormSelect } from "../Forms/FormSelect";
// import { FormTextField } from "../Forms/FormTextField";
// import { useCategorySubcategoryOptions } from "../../Queries/hooks/useCategorySubcategory";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   // form: {
//   //   width: "100%", // Fix IE 11 issue.
//   //   marginTop: theme.spacing(1),
//   // },
// }));

// const TopicEditFormFields = connect((state) => ({
//   categoryId: formValueSelector("Topic_Edit_Form")(state, "categoryId"),
// }))(({ onSubmit, submitting, categoryId }) => {
//   const classes = useStyles();
//   const {
//     category_options,
//     subcategory_options,
//   } = useCategorySubcategoryOptions();
//   console.log(category_options);
//   console.log(subcategory_options);
//   return (
//     <Container component="main" maxWidth="xs">
//       <Field
//         name="categoryId"
//         component={FormSelect}
//         fullWidth
//         variant="outlined"
//         label="Category"
//         options={category_options}
//       />
//       <Field
//         name="subcategoryId"
//         component={FormSelect}
//         fullWidth
//         variant="outlined"
//         label="Sub Category"
//         options={subcategory_options.filter(
//           (option) => option.categoryId === categoryId
//         )}
//       />
//       <Field
//         name="title"
//         component={FormTextField}
//         type="text"
//         label="Title"
//         variant="outlined"
//         fullWidth
//       />
//       <Field
//         name="url"
//         component={FormTextField}
//         type="url"
//         label="URL"
//         variant="outlined"
//         fullWidth
//       />
//       <Button
//         type="submit"
//         variant="contained"
//         color="primary"
//         fullWidth
//         disabled={submitting}
//         onClick={onSubmit}
//       >
//         Submit
//       </Button>
//     </Container>
//   );
// });

// const TopicEditForm = reduxForm({
//   form: "Topic_Edit_Form",
// })(({ handleSubmit, submitting, loading }) => {
//   return (
//     <>
//       {!loading && (
//         <TopicEditFormFields onSubmit={handleSubmit} submitting={submitting} />
//       )}
//     </>
//   );
// });

// export const TopicEditFormPage = () => {
//   const { id } = useParams();

//   return (
//     <>
//       <h1>Top Edit Form</h1>
//       <TopicEditFormController id={id}>
//         {(props) => <TopicEditForm {...props} />}
//       </TopicEditFormController>
//     </>
//   );
// };
