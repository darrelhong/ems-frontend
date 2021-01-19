import { Container } from '@chakra-ui/react';

export const pageContainerWidths = { xl: '75em' };

export default function PageContainer({
  fullHeight = true,
  children,
}: {
  fullHeight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Container
      w="100%"
      maxW={pageContainerWidths}
      minH={fullHeight ? '80vh' : 'initial'}
      p={3}
    >
      {children}
    </Container>
  );
}
