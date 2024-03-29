import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { signInRequest } from '../../store/actions/actions';
import styles from './auth.module.scss';
import Loading from '../../components/loading/loading';

const SignIn = () => {
  const { loading, error, user } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate('/chat');
  }, [user]);

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    email: Yup.string()
      .email('Некорректно указан адрес электронной почты')
      .required('Введите адрес электронной почты'),
    password: Yup.string().required('Введите пароль')
  });

  return (
    <div className={styles['chat-authorization__container']}>
      {loading && <Loading />}
      <div className={styles['chat-authorization__box'] + ' w-1/2'}>
        <div className={styles['left-box']}>
          <span>ChaTix</span>
        </div>
        <div className={styles['right-box']}>
          {/* <div>{error && <div>{error}</div>}</div> */}
          <div className={styles['main-authorization__container']}>
            <Formik
              initialValues={{
                email: '',
                password: ''
              }}
              validationSchema={DisplayingErrorMessagesSchema}
              onSubmit={(values, { resetForm }) => {
                dispatch(signInRequest(values));
                resetForm();
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className={styles.header}>
                    <h5>С возращением!</h5>
                    <span>Мы так рады видеть вас снова!</span>
                  </div>
                  <div className="mt-7 relative">
                    {errors.email && touched.email ? (
                      <label htmlFor="email" className="text-red-600">
                        {errors.email}
                      </label>
                    ) : (
                      <label htmlFor="email">Адрес электронной почты</label>
                    )}
                    <Field id="email" name="email" type="email" />
                  </div>
                  <div className="mt-7 relative">
                    {errors.password && touched.password ? (
                      <label htmlFor="password" className="text-red-600">
                        {errors.password}
                      </label>
                    ) : (
                      <label htmlFor="password">Пароль</label>
                    )}
                    <Field id="password" name="password" type="password" />
                  </div>
                  <button type="button">
                    <div>Забыли пароль?</div>
                  </button>
                  <button type="submit">Войти</button>
                  <div className="mt-1 text-sm">
                    <span className="">Нужна учетная запись?</span>
                    <button className="ml-1 text-blue-600">
                      <Link to={'/sign-up'}>Зарегистрироваться</Link>
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
