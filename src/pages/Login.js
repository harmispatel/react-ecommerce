import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../auth/authSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardTitle,
  Alert,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";

const Login = () => {
  const users = useSelector((state) => state.auth.users);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(4, "Minimum 4 characters").required("Required"),
  });

  const handleSubmit = ({ email, password }) => {
    const findUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (findUser) {
      dispatch(login(findUser));
      navigate("/task-list");
      toast.success("Login successful");
    } else {
      setError("Invalid email or password");
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <Card style={{ width: "400px" }}>
        <CardBody>
          <CardTitle tag="h3" className="mb-4 text-center">
            Login
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
                  <Label for="email">Email</Label>
                  <InputGroup>
                    <Field
                      name="email"
                      as={Input}
                      type="email"
                      invalid={touched.email && !!errors.email}
                    />
                    <InputGroupText>
                      <FaEnvelope />
                    </InputGroupText>
                  </InputGroup>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger mt-1"
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="password">Password</Label>
                  <InputGroup>
                    <Field
                      name="password"
                      as={Input}
                      type={showPassword ? "text" : "password"}
                      invalid={touched.password && !!errors.password}
                    />
                    <InputGroupText
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: "pointer" }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </InputGroupText>
                  </InputGroup>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger mt-1"
                  />
                </FormGroup>

                <Button type="submit" color="primary" className="w-100">
                  Login
                </Button>
                <div className="text-center mt-3">
                  <span>Don't have an account? </span>
                  <Button color="link" onClick={() => navigate("/register")}>
                    Register
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

export default Login;
