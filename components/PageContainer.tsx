import { Container } from "@chakra-ui/react";

export default function PageContainer({
  fullWidth = true,
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container
      w="100%"
      maxW={["100%", "100%", "60em", "60em", "72em"]}
      minH={fullWidth ?? "80vh"}
      p={3}
    >
      {children}
    </Container>
  );
}
