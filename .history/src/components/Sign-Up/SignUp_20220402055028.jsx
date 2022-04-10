import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import styles from './../Sign-In/auth.module.scss';

const SignUp = () => {
  const DisplayingErrorMessagesSchema = Yup.object().shape({
    email: Yup.string().email('Некорректно указан адрес электронной почты').required('Введите адрес электронной почты'),
    password: Yup.string().min(5, 'Пароль должен состоять минимум из 5 символов ').required('Введите пароль'),
    username: Yup.string()
      .matches('^[a-zA-Z][a-zA-Z0-9-_\\.]{1,20}$', 'Латинские буквы и цифры, от 2 до 20 символов, первый символ обязательно буква')
      .required('Введите имя'),
    dateOfBirth: Yup.date().required('Введите дату рождения'),
  });

  return (
    <div className={styles['chat-authorization__container']}>
      <div className={styles['chat-authorization__box']}>
        <div className={styles['main-authorization__container'] + ' bg-white rounded-xl'}>
          <Formik
            initialValues={{
              email: '',
              username: '',
              password: '',
              dateOfBirth: '',
            }}
            validationSchema={DisplayingErrorMessagesSchema}
            onSubmit={(values) => {
              alert(JSON.stringify(values, null, 2));
            }}
          >
            {({ errors, touched }) => (
              <Form onSubmit={Formik.handleSubmit}>
                <div className={styles.header}>
                  <h5>Регистрация</h5>
                </div>
                <div className="mt-7">
                  {errors.email && touched.email ? (
                    <label htmlFor="email" className="text-red-600">
                      {errors.email}
                    </label>
                  ) : (
                    <label htmlFor="email">Адрес электронной почты</label>
                  )}
                  <Field id="email" name="email" type="email" />
                </div>
                <div className="mt-7">
                  {errors.username && touched.username ? (
                    <label htmlFor="username" className="text-red-600">
                      {errors.username}
                    </label>
                  ) : (
                    <label htmlFor="username">Имя пользователя</label>
                  )}
                  <Field id="username" name="username" type="text" />
                </div>
                <div className="mt-7">
                  {errors.password && touched.password ? (
                    <label htmlFor="password" className="text-red-600">
                      {errors.password}
                    </label>
                  ) : (
                    <label htmlFor="password">Пароль</label>
                  )}
                  <Field id="password" name="password" type="password" />
                </div>
                <div className="mt-7">
                  {errors.dateOfBirth && touched.dateOfBirth ? (
                    <label htmlFor="dateOfBirth" className="text-red-600">
                      {errors.dateOfBirth}
                    </label>
                  ) : (
                    <label htmlFor="dateOfBirth">Дата рождения</label>
                  )}
                  <Field id="dateOfBirth" name="dateOfBirth" type="date" />
                </div>
                <button type="submit">Зарегистрироваться</button>
                <div className="mt-1 text-sm">
                  <button className="ml-1 text-blue-600">
                    <Link to={'/chat/sign-in'}>Уже зарегистрированы?</Link>
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
