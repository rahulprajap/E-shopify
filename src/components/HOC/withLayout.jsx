import React from 'react';
const withLayout = (Component) => {
  return (props) => {
    return <Component {...props} />;
  };
};

export default withLayout;

