// imports
import React, { useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup';

import { NavigateFunction, useNavigate } from 'react-router-dom';
import { login } from "../services/auth.service";

type Props = {}

const Login : React.FC<Props> = () => {
  const navigate: NavigateFunction = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues: {
    username: string;
    password: string; 
  } = {
    username: "",
    password: ""
  };

  // Yup est une bibliothèque JavaScript qui facilite la validation des schémas. Elle est souvent utilisée dans les applications JavaScript et React pour valider les données côté client, par exemple, avant de les soumettre à un serveur
  const validateYupSchema = Yup.object().shape({
    username: Yup.string().required("Ce champs est obligatoire!"),
    password: Yup.string().required("Ce champs est obligatoire!")
  })


  const handleLogin = (formValue: { username: string; password: string }) => {
    const { username, password } = formValue;

    setMessage("")
    setLoading(true);

    login(username, password).then(
      () => {
        navigate("/profile");
        window.location.reload();
      },
      (error) => {
        const resMessage = 
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString();

          setLoading(false);
          setMessage(resMessage);
      }
    )
  }

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
          validationSchema={validateYupSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="username">Nom</label>
              <Field id="username" name="username" type="text" className="form-control" />
              <ErrorMessage
                name="username"
                component="div"
                className='alert alert-danger'
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <Field id='password' name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className='alert alert-danger'
              />
            </div>
            <div className="form-group">
              <button type="submit" className="col-md-6 btn btn-primary btn-block mt-3" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm">
                  </span>
                )}
                <span> Login</span>
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role='alert'>
                  {message}
                </div>
              </div>
            )}

          </Form>
        </Formik>

      </div>
    </div>
  )
}

export default Login