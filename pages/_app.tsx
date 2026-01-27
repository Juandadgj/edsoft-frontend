import "@/styles/globals.css";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
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
  );
}
