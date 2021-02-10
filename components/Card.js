import PropTypes from 'prop-types';
import { Box, useColorModeValue } from '@chakra-ui/react';

export default function Card({ children, ...props }) {
  return (
    <Box
      borderRadius="lg"
      p={3}
      bg={useColorModeValue('white', 'gray.700')}
      {...props}
    >
      {children}
    </Box>
  );
}

Card.propTypes = {
  children: PropTypes.node,
};
