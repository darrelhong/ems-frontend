import PropTypes from 'prop-types';
import { Container } from '@chakra-ui/react';

export const pageContainerWidths = { xl: '75em' };

const PageContainer = ({ fullHeight = true, children, ...rest }) => {
  return (
    <Container
      w="100%"
      maxW={pageContainerWidths}
      minH={fullHeight ? '80vh' : 'initial'}
      p={4}
      {...rest}
    >
      {children}
    </Container>
  );
};

export default PageContainer;

PageContainer.propTypes = {
  fullHeight: PropTypes.bool,
  children: PropTypes.node,
};
