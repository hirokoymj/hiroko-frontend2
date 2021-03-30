import React from "react";
import { gql, useMutation } from "@apollo/client";

export const TestView = () => {
  return <h1>TEST</h1>;
};

// export const UploadForm = () => {
//   const classes = useStyles();
//   const [singleUpload] = useMutation(SINGLE_UPLOAD, {
//     onCompleted: (data) => {
//       const url = get(data, "singleUpload.url", "");
//       setUrl(url);
//     },
//   });
//   const [url, setUrl] = useState("http://placehold.jp/200x200.png");

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     singleUpload({ variables: { file } });
//   };

//   return (
//     <div>
//       <h1>Upload File</h1>
//       <input type="file" onChange={handleFileChange} />
//       <img src={url} alt="" className={classes.thumbnail} />
//     </div>
//   );
// };
