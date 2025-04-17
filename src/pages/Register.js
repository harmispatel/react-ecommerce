import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Button,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Card,
  CardBody,
  CardTitle,
  Alert,
} from "reactstrap";
import * as Yup from "yup";
import { useState } from "react";
import toast from "react-hot-toast";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.auth.users);
  const [error, setError] = useState("");

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Min 6 characters").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
  });

  const handleSubmit = (values) => {
    const exists = users.find((u) => u.email === values.email);
    if (exists) return setError("User already exists");

    dispatch(
      register({
        name: values.name,
        email: values.email,
        password: values.password,
      })
    );
    toast.success("Registration successful");
    navigate("/login");
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <Card style={{ width: "400px" }}>
        <CardBody>
          <CardTitle tag="h3" className="mb-4 text-center">
            Register
          </CardTitle>
          {error && <Alert color="danger">{error}</Alert>}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ touched, errors }) => (
              <Form>
                <FormGroup>
                  <Label>Name</Label>
                  <Field
                    name="name"
                    as={Input}
                    invalid={touched.name && !!errors.name}
                  />
                  <ErrorMessage name="name" component={FormFeedback} />
                </FormGroup>
                <FormGroup>
                  <Label>Email</Label>
                  <Field
                    name="email"
                    as={Input}
                    type="email"
                    invalid={touched.email && !!errors.email}
                  />
                  <ErrorMessage name="email" component={FormFeedback} />
                </FormGroup>
                <FormGroup>
                  <Label>Password</Label>
                  <Field
                    name="password"
                    as={Input}
                    type="password"
                    invalid={touched.password && !!errors.password}
                  />
                  <ErrorMessage name="password" component={FormFeedback} />
                </FormGroup>
                <FormGroup>
                  <Label>Confirm Password</Label>
                  <Field
                    name="confirmPassword"
                    as={Input}
                    type="password"
                    invalid={
                      touched.confirmPassword && !!errors.confirmPassword
                    }
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component={FormFeedback}
                  />
                </FormGroup>
                <Button type="submit" color="primary" className="w-100">
                  Register
                </Button>
                <div className="text-center mt-3">
                  <span>Already have an account? </span>
                  <Button color="link" onClick={() => navigate("/login")}>
                    Login
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </div>
  );
};

export default Register;
