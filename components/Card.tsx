import { Box, useColorModeValue } from '@chakra-ui/react';

type CardProps = {
  children: React.ReactNode;
  [propName: string]: any;
};

export default function Card({ children, ...props }: CardProps): JSX.Element {
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
