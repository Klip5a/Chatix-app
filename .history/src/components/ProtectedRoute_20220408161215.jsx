import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import PropTypes from 'prop-types';

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
