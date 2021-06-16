import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  console.log(Component, rest)
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem('isAuthenticated') === "true" || localStorage.getItem('isAuthenticated') === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/" }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
