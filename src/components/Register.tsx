
import React, { useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from "yup";

import IUser from '../types/user.type'
import { register } from '../services/auth.service';

const Register: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [successful, setSuccessful] = useState<boolean>(false);

  const initialValues: IUser = {
    username: "",
    email: "",
    password: ""
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "le nom doit avoir 3 à 20 lettres",
        (val: any) =>
          val &&
          val.toString().length >= 3 &&
          val.toString().length <= 20
      )
      .required("ce champs est obligatoire!"),
    email: Yup.string()
      .email("l'email est invalide")
      .required("ce champs est obligatoire!"),
    password: Yup.string()
      .test(
        "len",
        "le nom doit avoir 6 à 40 lettres",
        (val: any) =>
          val &&
          val.toString().length >= 6 &&
          val.toString().length <= 40
      )
      .required("ce champs est obligatoire!"),
  });

  const handleRegister = (formValue: IUser) => {
    const { username, email, password } = formValue;

    register(username, email, password).then(
      (res) => {
        console.log("res : " , res);
        console.log("res.data : " , res.data);
        console.log("res.data.body.message : " ,res.data.body.message);
        setMessage(res.data.body.message);
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

  return (
    <div className='col-md-12 flex'>
      <div className="card card-container">

        <div className="divimg">
          <img
            src="/src/assets/user.png"
            alt="image_de_profile"
            className='profile-img-card'
          />
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username"> Nom </label>
                  <Field name='username' type='text' className="form-control" />
                  <ErrorMessage
                    name='username'
                    component='div'
                    className='alert alert-danger'
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email"> Email </label>
                  <Field name='email' type='email' className="form-control" />
                  <ErrorMessage
                    name='email'
                    component='div'
                    className='alert alert-danger'
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email"> Mot de passe </label>
                  <Field name='password' type='password' className="form-control" />
                  <ErrorMessage
                    name='password'
                    component='div'
                    className='alert alert-danger'
                  />
                </div>

                <div className="form-group">
                  <button type='submit' className='col-md-6 mt-3 btn btn-primary btn-block'>S'inscrire</button>
                </div>
              </div>
            )}

            {message && (
              <div className='form-group mt-4'>
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role='alert'
                >
                  {message}
                </div>
              </div>
            )}

          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Register;
