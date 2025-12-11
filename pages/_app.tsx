import "@/styles/globals.css";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
const SERVER_URI = process.env.NEXT_PUBLIC_REACT_APP_URL || "localhost/graphql";

const httpLink = createHttpLink({
  uri: SERVER_URI,
});

// Every time context is updated this method is gonna run!!!!!!!!!!!!!!
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = sessionStorage.getItem("userToken");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});

const client = new ApolloClient({
  // uri: SERVER_URI,
  // credentials: 'include',
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),

  // headers: {
  //   authorization: sessionStorage.getItem('userToken') || '',
  // },
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ConfigProvider
        theme={{
          components: {
          
            Menu: {
              /* here is your component tokens */
              itemHoverColor: "#fff",
              itemHoverBg: "#0055a6",
              itemSelectedBg: "#fff",
              itemSelectedColor: "#0055a6",
              itemActiveBg: "#0055a6",
              itemHeight: 30,
            },
          },
        }}
      >
        <Component {...pageProps} />
      </ConfigProvider>
    </ApolloProvider>
  );
}
