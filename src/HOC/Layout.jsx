import PropTypes from 'prop-types';

import Header from 'shared-components/Header';

function Layout(props) {
  const { WrappedComponent, includeHeader } = props;
  return (
    <div>
      {includeHeader && <Header />}
      <div>
        <WrappedComponent {...props} />
      </div>
    </div>
  );
}

Layout.defaultProps = {
  includeHeader: false,
};

Layout.propTypes = {
  WrappedComponent: PropTypes.func.isRequired,
  includeHeader: PropTypes.bool,
};

export default Layout;
