import { Grid, Spinner } from '@chakra-ui/react';
import PageContainer from './PageContainer';

export default function LoadingScreen() {
  return (
    <PageContainer>
      <Grid justifyContent="center" alignItems="center" height="100vw">
        <Spinner size="xl" />
      </Grid>
    </PageContainer>
  );
}
