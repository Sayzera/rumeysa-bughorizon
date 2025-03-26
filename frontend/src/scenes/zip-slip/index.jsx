import { Box, Button, Switch, TextField, useMediaQuery } from "@mui/material";
import { Header } from "../../components";
import { Formik, useFormikContext } from "formik";
import * as yup from "yup";
import { useEffect } from "react";

const initialValues = {
  name: "",
  address: "",
  file: null,
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  address: yup.string().required("required"),
  isOpenTestZipSlip: yup.boolean().optional(),
  file: yup
    .mixed()
    .required("A file is required")
    .test("fileSize", "File Size is too large", (value) => {
      return value && value?.size <= 1024 * 1024 * 5; // 5MB
    })
    .test("fileType", "Unsupported File Format", (value) => {
      return (
        value &&
        (value?.type === "application/zip" ||
          value?.type === "application/x-zip-compressed")
      );
    }),
});

const FormObserver = ({ getValues }) => {
  const { values } = useFormikContext();

  useEffect(() => {
    getValues(values);
  }, [values]); // values değiştikçe çalışır

  return null; // Bileşen DOM'a hiçbir şey render etmez
};

const ZipSlip = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = (values, actions) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("address", values.address);
    formData.append("file", values.file);


    console.log("Form values", values);
    // actions.resetForm({
    //   values: initialValues,
    // });
  };
  return (
    <Box m="20px">
      <Header
        title="Zip Slip"
        subtitle="
        This test is used to check if the application is vulnerable to
                Zip Slip attacks.
      "
      />

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
        }) => {
          // useEffect(() => {
          //   console.log("Form values changed:", values);
          // }, [values]); // values değiştiğinde tetiklenir

          return (
            <form onSubmit={handleSubmit}>
              <FormObserver
                getValues={(values) => {
                  // console.log("Form values changed:", values);
                }}
              />

              <div className="flex justify-end items-center">
                <div>
                  <label htmlFor="isOpenTestZipSlip">
                    Enable Zip Slip Test
                  </label>
                </div>
                <Switch
                  color="success"
                  id="isOpenTestZipSlip"
                  onChange={(event) => {
                    handleChange({
                      target: {
                        name: "isOpenTestZipSlip",
                        value: event.target.checked,
                      },
                    });
                  }}
                />
              </div>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={touched.name && errors.name}
                  helperText={touched.name && errors.name}
                  sx={{
                    gridColumn: "span 2",
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address}
                  name="address"
                  error={touched.address && errors.address}
                  helperText={touched.address && errors.address}
                  sx={{
                    gridColumn: "span 2",
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="file"
                  onBlur={handleBlur}
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    handleChange({
                      target: {
                        name: "file",
                        value: file,
                      },
                    });
                  }}
                  // value={values.file}
                  name="file"
                  error={touched.file && errors.file}
                  helperText={touched.file && errors.file}
                  sx={{
                    gridColumn: "span 2",
                  }}
                />
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="end"
                mt="20px"
              >
                <Button type="submit" color="secondary" variant="contained">
                  Submit
                </Button>
              </Box>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default ZipSlip;
