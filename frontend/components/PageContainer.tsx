import { Container } from "@chakra-ui/react";

export const pageContainerWidths = ["100%", "100%", "60em", "60em", "72em"]

export default function PageContainer({
  fullWidth = true,
  children,
}: {
  fullWidth?: boolean,
  children: React.ReactNode;
}) {
  return (
    <Container
      w="100%"
      maxW={pageContainerWidths}
      minH={fullWidth ? "80vh" : ""}
      p={3}
    >
      {children}
    </Container>
  );
}
