import React from 'react';

/**
 * Higher Order Component that returns the passed component as-is
 * Can be used as a base for other HOCs
 */
const withLayout = (Component) => {
  return (props) => {
    return <Component {...props} />;
  };
};

export default withLayout;

