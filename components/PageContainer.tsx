import { Container, ContainerProps } from '@chakra-ui/react';

export const pageContainerWidths = { xl: '75em' };

type PageContainerProps = ContainerProps & {
  fullHeight?: boolean;
};

const PageContainer = ({
  fullHeight = true,
  children,
  ...rest
}: PageContainerProps): JSX.Element => {
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
