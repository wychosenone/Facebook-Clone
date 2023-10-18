import React, { useState } from "react";
import { Formik, Form } from "formik";
import RegisterInput from "../inputs/registerInput";
import * as Yup from "yup";
import DateOfBirthSelect from "./DateOfBirthSelect";
import GenderSelect from "./GenderSelect";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";
import {useDispatch} from "react-redux";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

export default function RegisterForm({setVisible}) {
  const navigate = useNavigate();
  const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "",
  };

  const [user, setUser] = useState(userInfos);
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;
  const yearTemp = new Date().getFullYear();
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const years = Array.from(new Array(109), (val, index) => yearTemp - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);
  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("First Name is required")
      .min(2, "First Name must be at least 2 characters")
      .max(16, "First Name must be below 16 characters")
      .matches(
        /^[aA-zZ\s]+$/,
        "Numbers and spefical characters are not allowed"
      ),
    last_name: Yup.string()
      .required("Last Name is required")
      .min(2, "Last Name must be at least 2 characters")
      .max(16, "Last Name must be below 16 characters")
      .matches(
        /^[aA-zZ\s]+$/,
        "Numbers and spefical characters are not allowed"
      ),
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email address"),
    password: Yup.string()
      .required(
        "Enter a combination of at lease six numbers, letters, and special characters"
      )
      .min(6, "Password must be at least 6 characters")
      .max(36, "Password must be below 36 characters"),
  });
  const [dateError, setDateError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  
  const registerSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          first_name,
          last_name,
          email,
          password,
          bYear,
          bMonth,
          bDay,
          gender,
        }
      );
      setError("");
      setSuccess(data.message);
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: rest });
        Cookies.set("user", JSON.stringify(rest));
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };
  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon" onClick={()=> setVisible(false)}></i>
          <span>Sign up</span>
          <span>it's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            let current_date = new Date();
            let picked_date = new Date(bYear, bMonth - 1, bDay);
            let atleast14 = new Date(1970 + 14, 0, 1);
            let noMoreThan70 = new Date(1970 + 70, 0, 1);
            if (current_date - picked_date < atleast14) {
              setDateError(
                "It looks like you've entered wrong information. Please make sure you've entered the correct date of birth."
              );
              console.log(`${process.env.REACT_APP_BACKEND_URL}/register`);
            } else if (current_date - picked_date > noMoreThan70) {
              setDateError(
                "It looks like you've entered wrong information. Please make sure you've entered the correct date of birth."
              );
            } else if (gender === "") {
              setDateError("");
              setGenderError("Please select your gender.");
            } else {
              setDateError("");
              setGenderError("");
              registerSubmit();
            }
          }}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="First Name"
                  name="first_name"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="text"
                  placeholder="Last Name"
                  name="last_name"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="Mobile number or email address"
                  name="email"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="password"
                  placeholder="New password"
                  name="password"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Date of Birth <i className="info_icon"></i>
                </div>
                <DateOfBirthSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={days}
                  months={months}
                  years={years}
                  handleRegisterChange={handleRegisterChange}
                  dateError={dateError}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <GenderSelect
                  genderError={genderError}
                  handleRegisterChange={handleRegisterChange}
                />
              </div>
              <div className="reg_infos">
                By clicking Sign Up, you agree to our{" "}
                <span>Terms, Data Policy &nbsp;</span> and{" "}
                <span>Cookie Policy. </span> You may receive SMS notifications
                from us and can opt out at any time.
              </div>
              <div className="reg_btn_wrapper">
                <button className="blue_btn open_signup">Sign Up</button>
              </div>
              <BeatLoader color="#1876f2" loading={loading} size={20} margin={10} />
              {error && <div className="error_text">{error}</div>}
              {success && <div className="success_text">{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
