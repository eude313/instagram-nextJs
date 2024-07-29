import "./globals.css";
import {Providers} from "./providers";

export const metadata = {
  title: "Insta",
  description: "Instagram clone created by Eudes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
