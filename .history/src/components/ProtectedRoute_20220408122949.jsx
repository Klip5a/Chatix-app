import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import PropTypes from 'prop-types';

function ProctedRoute({ component: Component, ...rest }) {
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

ProctedRoute.propTypes = {
  component: PropTypes.string
};

export default ProctedRoute;
