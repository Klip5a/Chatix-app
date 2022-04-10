import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

function ProctedRoute() {
  const { user } = useSelector(({ auth }) => auth);

  return (
    <Route
      {...rest}
      render={(props) => {
        return user ? <Component {...props} /> : <Redirect to="/" />;
      }}
    ></Route>
  );
}

export default ProctedRoute;