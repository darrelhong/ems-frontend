import { Container } from '@chakra-ui/react';

export const pageContainerWidths = { xl: '75em' };

const PageContainer = ({
  fullHeight = true,
  children,
}: {
  fullHeight?: boolean;
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <Container
      w="100%"
      maxW={pageContainerWidths}
      minH={fullHeight ? '80vh' : 'initial'}
      p={4}
    >
      {children}
    </Container>
  );
};

export default PageContainer;
