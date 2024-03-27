import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";



const Form2 = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
  
    const handleFormSubmit = (values) => {
      console.log("Deleting user:", values.name, values.email);
      // Add logic here to delete the user based on the provided name and email
    };
  
    return (
      <Box m="20px">
        <Header title="DELETE USER" subtitle="Delete User Profile" />
  
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
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
  
              <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr)">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    padding: "18px 32px",
                    marginTop: "40px",
                    backgroundColor: "#ff0000", // Change button color to red for deletion
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#cc0000", // Darker shade of red on hover
                    },
                  }}
                >
                  Delete User
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    );
  };
  
  // Remove the password validation and schema for companyID and companyName
  
  const checkoutSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
  });
  
  const initialValues = {
    email: "",
  };
  
  export default Form2;
  