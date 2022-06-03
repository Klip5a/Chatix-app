import React, { useState } from 'react';
import Modal from 'react-modal/lib/components/Modal';
import { Form, Field } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { getAuth, updatePassword } from 'firebase/auth';
import { ref, set, get, query, onValue, update } from 'firebase/database';
import {
  getDownloadURL,
  uploadBytes,
  ref as ref_storage
} from 'firebase/storage';

import { database, storage } from '../../api/firebase';
import { logOut } from '../../store/actions/actions';
import styles from './ChatHeader.module.scss';

const ChatHeader = ({ operator }) => {
  const [showProfileSettings, setwProfileSettings] = useState(false);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);

  function handleLogout() {
    dispatch(logOut());
  }

  const handleOpenProfile = () => {
    setwProfileSettings(!showProfileSettings);
  };
  const handleCloseProfile = () => {
    setwProfileSettings(!showProfileSettings);
  };

  const onImageSelect = (event) => {
    if (event.target.files && event.target.files[0]) {
      setAvatar(event.target.files[0]);
      setPreviewAvatar(URL.createObjectURL(event.target.files[0]));
    }
  };

  const updateProfile = async (event) => {
    const auth = getAuth();
    const user = auth.currentUser;

    let url;

    if (avatar) {
      const avatarRef = ref_storage(storage, `avatar/${avatar.name}`);
      const snap = await uploadBytes(avatarRef, avatar);
      const dlUrl = await getDownloadURL(
        ref_storage(storage, snap.ref.fullPath)
      );
      url = dlUrl;
    }
    const data = {
      username: event.username,
      avatar: url
    };
    await update(ref(database, 'operators/' + operator.operatopId), data);
    await updatePassword(user, event.password);
    handleCloseProfile();
  };

  return (
    <div className={styles['chat-header']}>
      <div className={styles['profile']} onClick={handleOpenProfile}>
        <span className={styles['profile-email']}>{operator.email}</span>
        <img src={operator.avatar} alt="Аватар" />
      </div>
      <button
        className="bg-blue-600 h-10 text-white rounded-md text-xl px-2"
        type="submit"
        onClick={handleLogout}
      >
        Выйти
      </button>
      <Modal
        isOpen={showProfileSettings}
        onRequestClose={handleCloseProfile}
        className="bg-white p-2 rounded-xl w-4/5 relative"
        overlayClassName="absolute inset-0 bg-neutral-600/75 flex justify-center items-center"
      >
        <button
          onClick={handleCloseProfile}
          className="py-1 px-2 absolute top-2 right-2 bg-slate-400 rounded-xl text-white"
        >
          Закрыть
        </button>
        <Form
          onSubmit={updateProfile}
          validate={(values) => {
            const errors = {};
            if (!values.username) {
              errors.username = 'Пусто';
            }
            if (!values.password) {
              errors.password = 'Пусто';
            }
            if (!values.confirm) {
              errors.confirm = 'Пусто';
            } else if (values.confirm !== values.password) {
              errors.confirm = 'Пароли не совпадают';
            }
            return errors;
          }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="mt-8">
              <h2 className="text-center font-bold text-2xl">
                Обновить профиль
              </h2>
              <Field name="username">
                {({ input, meta }) => (
                  <div className="mb-10 flex">
                    <label className="w-2/6 text-center font-semibold">
                      Имя
                    </label>
                    <div className="w-5/6 relative">
                      <input
                        {...input}
                        type="text"
                        placeholder={operator.username}
                        className="border-2 w-5/6"
                      />
                      {meta.error && meta.touched && (
                        <span className="absolute top-8 left-0 text-red-600 font-medium">
                          {meta.error}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </Field>
              <Field name="avatar">
                {({ input }) => (
                  <div className="flex mb-10 items-center">
                    <label className="w-2/6 text-center font-semibold">
                      Аватар
                    </label>
                    <div className="w-5/6 flex border-2 items-center justify-around relative">
                      <img
                        src={
                          previewAvatar === null
                            ? operator.avatar
                            : previewAvatar
                        }
                        alt="Аватар"
                        className="w-20 h-20 rounded-full"
                      />
                      <input
                        {...input}
                        type="file"
                        accept="image/*"
                        onChange={onImageSelect}
                      />
                    </div>
                  </div>
                )}
              </Field>
              <Field name="password">
                {({ input, meta }) => (
                  <div className="mb-10 flex">
                    <label className="w-2/6 text-center font-semibold">
                      Пароль
                    </label>
                    <div className="w-5/6 relative">
                      <input
                        {...input}
                        type="password"
                        placeholder="Пароль"
                        className="border-2 w-full"
                      />
                      {meta.error && meta.touched && (
                        <span className="absolute top-8 left-0 text-red-600 font-medium">
                          {meta.error}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </Field>
              <Field name="confirm">
                {({ input, meta }) => (
                  <div className="mb-10 flex">
                    <label className="w-2/6 text-center font-semibold">
                      Повторить пароль
                    </label>
                    <div className="w-5/6 relative">
                      <input
                        {...input}
                        type="password"
                        placeholder="Повторить пароль"
                        className="border-2 w-full"
                      />
                      {meta.error && meta.touched && (
                        <span className="absolute top-8 left-0 text-red-600 font-medium">
                          {meta.error}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </Field>
              <button
                type="submit"
                className="bg-blue-400 text-white px-4 py-2 rounded-xl w-full"
              >
                Обновить профиль
              </button>
            </form>
          )}
        />
      </Modal>
    </div>
  );
};

export default ChatHeader;
