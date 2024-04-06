import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Adminpage/Header";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [formValues, setFormValues] = useState(initialValues);

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch(`http://127.0.0.1:9000/add_employee/?eid=${values.email}&ename=${values.name}&pwd=${values.password}&department=${values.department}&aid=${localStorage.getItem("username")}`, {
        method: 'POST'
      });
      if (!response.ok) {
        throw new Error('Failed to add employee');
      }
      const data = await response.json();
      if (data.message === 'Employee added successfully.') {
        alert('Employee added successfully');
        resetForm(); // Reset form values
      } else {
        console.error('Failed to add employee:', data.message);
      }
    } catch (error) {
      alert('Failed to add employee: Employee with the provided email already exists');
      console.error('Error adding employee:', error);
    }
  };

  return (
    <Box m="20px">
  <Header title="CREATE USER" subtitle="Create a New User Profile" />

  <Formik
    onSubmit={handleFormSubmit}
    initialValues={formValues}
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
          gap="30px" gridTemplateColumns="repeat(2, minmax(0, 1fr))" sx={{ "& > div": { gridColumn: "span 1" } }}// Add marginBottom to each div
        >
        </Box>
        <Box display="grid" gap="30px" gridTemplateColumns="repeat(2, minmax(0, 1fr))" sx={{ "& > div": { gridColumn: "span 1",marginBottom: "30px" } }}>
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
          />
        </Box>

        <Box display="grid" gap="30px" gridTemplateColumns="repeat(2, minmax(0, 1fr))" sx={{ "& > div": { gridColumn: "span 1",marginBottom: "30px" } }}>
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
          />
        </Box>
        <Box display="grid" gap="30px" gridTemplateColumns="repeat(2, minmax(0, 1fr))" sx={{ "& > div": { gridColumn: "span 1" ,marginBottom: "30px"} }}>
        <TextField
            fullWidth
            variant="filled"
            type="password"
            label="Password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            name="password"
            error={touched.password && !!errors.password}
            helperText={touched.password && errors.password}
          />
        </Box>
                
        <Box display="grid" gap="30px" gridTemplateColumns="repeat(2, minmax(0, 1fr))" sx={{ "& > div": { gridColumn: "span 1" ,marginBottom: "30px"} }}>
        <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Department"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.department}
            name="department"
            error={!!touched.department && !!errors.department}
            helperText={touched.department && errors.department}
          />
        </Box>
        <Box display="grid" gap="30px" gridTemplateColumns="repeat(2, minmax(0, 1fr))" sx={{ "& > div": { gridColumn: "span 1",marginBottom: "30px" } }}>
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
  password: yup.string().matches(passwd, "Password is not valid").required("required"),
  department: yup.string().required("required"),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
  department: "",
};

export default Form;
