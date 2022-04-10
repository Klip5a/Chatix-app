import { googleProvider, phoneProvider, auth, db } from '../api/firebase';

const availabelProviders = {
  google: googleProvider
};

class AuthRepository {
  socialSignIn = async (provider) => {
    try {
      const res = await auth.signInWithPopup(availabelProviders[provider]);
      const user = res.user;
      const query = await db
        .collection('users')
        .where('uid', '==', user.uid)
        .get();
      let userData = query.docs[0]?.data();
      if (query.docs.length === 0) {
        const savedData = await db.collection('users').add({
          uid: user.uid,
          name: user.displayName,
          authProvider: provider,
          email: user.email
        });
        userData = (await savedData.get()).data();
      }
      return userData;
    } catch (err) {
      console.error(err);
      throw err.message;
    }
  };

  phoneSignIn = async (user) => {
    try {
      const query = await db
        .collection('users')
        .where('phone', '==', user.phone)
        .get();

      let userData = query.docs[0]?.data();
      if (query.docs.length === 0) {
        const savedData = await db.collection('users').add({
          name: user.name,
          authProvider: 'phone',
          phone: user.phone
        });

        userData = (await savedData.get()).data();
      }

      return userData;
    } catch (err) {
      console.error(err);
      throw err.message;
    }
  };

  registerWithEmailAndPassword = async ({ name, email, password }) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const data = await db.collection('users').add({
        uid: user.uid,
        name,
        authProvider: 'local',
        email
      });

      const userData = await (await data.get()).data();

      return userData;
    } catch (err) {
      throw err.message;
    }
  };

  logInWithEmailAndPassword = async ({ email, password }) => {
    try {
      const data = await signInWithEmailAndPassword(auth, email, password);
      return data;
    } catch (error) {
      throw error.message;
    }
  };

  logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        throw error.message;
      });
  };
}
export default new AuthRepository();
