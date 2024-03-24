import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Full name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled" // Change the variant to "outlined" for a different visual style
                type="password" // Change the type to "password" for password input
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={touched.password && !!errors.password} // Simplified the error condition
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="CompanyID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.companyID}
                name="companyID"
                error={!!touched.companyID && !!errors.companyID}
                helperText={touched.companyID && errors.companyID}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Company Name "
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.companyName}
                name="companyName"
                error={!!touched.companyName && !!errors.companyName}
                helperText={touched.companyName && errors.companyName}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            
            <Box display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                padding: "18px 32px",
                marginTop: "40px",
                backgroundColor: "#644eea",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#0056b3",
                },
              }}
            >
              Create New User
            </Button>

            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const passwd =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  
  email: yup.string().email("invalid email").required("required"),
  password: yup
    .string()
    .matches(passwd, "Password is not valid")
    .required("required"),
  companyID: yup.string().required("required"),
  companyName: yup.string().required("required"),
});
const initialValues = {
  name: "",
  email: "",
  password: "",
  companyID: "",
  companyName: "",
};

export default Form;
