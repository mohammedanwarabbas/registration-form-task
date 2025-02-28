import React, { useState } from "react";
import { TextField, Button, Avatar, IconButton, Box, Typography, InputAdornment } from "@mui/material";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./../styles/main.scss"; // Import the CSS file

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  bio: Yup.string().required("Bio is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  address1: Yup.string().required("Address 1 is required"),
  address2: Yup.string(),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
  zipcode: Yup.string()
    .matches(/^\d{6}$/, "Zipcode must be exactly 6 digits")
    .required("Zipcode is required"),
});

const RegisterForm: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);

  const handleProfileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleCoverUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const url = URL.createObjectURL(event.target.files[0]);
      setCoverImage(url);
      document.documentElement.style.setProperty('--cover-image-url', `url(${url})`);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      bio: "",
      email: "",
      phone: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Submitted", values);
      alert("Form submitted successfully!"); 
    formik.resetForm();
    },
  });

  const getFormikProps = (field: keyof typeof formik.values) => ({
    ...formik.getFieldProps(field),
    error: !!formik.touched[field] && !!formik.errors[field],
    helperText: formik.touched[field] && formik.errors[field],
  });

  return (
    <Box className="register-form-container">
      {/* Cover Photo Section */}
      <Box className={`cover-photo-section ${coverImage ? "cover-image-uploaded" : ""}`}>
        {!coverImage && (
          <Box className="cover-text">
            <Typography variant="h6">Personal Details</Typography>
            <Typography variant="body2">Update your information and find out how it's used.</Typography>
          </Box>
        )}

        {/* Upload Cover Button - Fixed inside the banner */}
        <Box className="cover-upload-button">
          <input type="file" accept="image/*" id="cover-upload" hidden onChange={handleCoverUpload} />
          <label htmlFor="cover-upload">
            <Button component="span" sx={{color:"white"}}>
              {coverImage ? "Change Cover Photo" : "Upload Cover Photo"}
            </Button>
          </label>
        </Box>
      </Box>

      {/* 2 Grid Layout */}
      <Box className="form-content">
        <Box className="grid-container">
          {/* Left Grid */}
          <Box className="profile-section">
            <input type="file" accept="image/*" id="profile-upload" hidden onChange={handleProfileUpload} />
            <label htmlFor="profile-upload">
              <IconButton component="span">
                <Avatar className="profile-avatar" src={profileImage || ""} />
              </IconButton>
            </label>
            <Typography variant="h6" className="upload-photo-text">Upload Photo</Typography>

            {/* Social Media Fields */}
            <Box className="social-media-fields">
              {[FaFacebookF, FaTwitter, FaInstagram].map((Icon, index) => (
                <TextField
                  key={index}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon style={{ color: "black", fontSize: "20px" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Right Grid - Other form Fields */}
          <Box className="form-fields">
            <form onSubmit={formik.handleSubmit}>
              <Box className="name-fields">
                <Box>
                  <Typography>First Name</Typography>
                  <TextField {...getFormikProps("firstName")} variant="outlined" fullWidth />
                </Box>
                <Box>
                  <Typography>Last Name</Typography>
                  <TextField {...getFormikProps("lastName")} variant="outlined" fullWidth />
                </Box>
              </Box>
              <Box className="bio-field">
                <Typography>Bio Description</Typography>
                <TextField {...getFormikProps("bio")} multiline rows={3} variant="outlined" fullWidth />
              </Box>
              <Box className="contact-fields">
                <Box>
                  <Typography>Email Address</Typography>
                  <TextField {...getFormikProps("email")} type="email" variant="outlined" fullWidth />
                  <Typography color="textSecondary">will use this email id to send you confirmation.</Typography>
                </Box>
                <Box>
                  <Typography>Phone Number</Typography>
                  <TextField {...getFormikProps("phone")} type="tel" variant="outlined" fullWidth />
                  <Typography color="textSecondary">will use this number if they need to contact you.</Typography>
                </Box>
              </Box>
              <Box className="address-fields">
                <Box>
                  <Typography>Address 1</Typography>
                  <TextField {...getFormikProps("address1")} variant="outlined" fullWidth />
                </Box>
                <Box>
                  <Typography>Address 2</Typography>
                  <TextField {...getFormikProps("address2")} variant="outlined" fullWidth />
                </Box>
              </Box>
              <Box className="location-fields-container">
                <Box className="city-state-fields">
                  <Box>
                    <Typography>City</Typography>
                    <TextField {...getFormikProps("city")} variant="outlined" fullWidth />
                  </Box>
                  <Box>
                    <Typography>State</Typography>
                    <TextField {...getFormikProps("state")} variant="outlined" fullWidth />
                  </Box>
                </Box>
                <Box className="country-zip-fields">
                  <Box>
                    <Typography>Country</Typography>
                    <TextField {...getFormikProps("country")} variant="outlined" fullWidth />
                  </Box>
                  <Box>
                    <Typography>Zipcode</Typography>
                    <TextField {...getFormikProps("zipcode")} variant="outlined" fullWidth />
                  </Box>
                </Box>
              </Box>
              <Box className="form-buttons">
                <Button className="form-btn cancel-btn" variant="outlined" type="button" onClick={() => formik.resetForm()} >Cancel</Button>
                <Button className="form-btn confirm-btn" variant="contained" type="submit">Confirm</Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterForm;