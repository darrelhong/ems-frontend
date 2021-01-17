// from https://chakra-ui.com/docs/features/color-mode
// to be used if necessary
// will break SSG

import React from "react";
import {
  ChakraProvider,
  cookieStorageManager,
  localStorageManager,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";

export const Chakra = ({
  cookies,
  children,
}: {
  cookies: String;
  children: React.ReactNode;
}) => {
  const colorModeManager =
    typeof cookies === "string"
      ? cookieStorageManager(cookies)
      : localStorageManager;
  return (
    <ChakraProvider colorModeManager={colorModeManager}>
      {children}
    </ChakraProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => ({
  props: {
    // first time users will not have any cookies and you may not return
    // undefined here, hence ?? is necessary
    cookies: req.headers.cookie ?? "",
  },
});
