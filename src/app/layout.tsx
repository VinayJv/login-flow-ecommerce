import "~/styles/globals.css";
import styles from "~/app/index.module.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Image from "next/image";
import { UserProvider } from "context/UserContext";
import Loader from "components/Loader";

export const metadata: Metadata = {
  title: "Login Flow",
  description: "Simple Login Flow for Ecommerce Website",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <header>
          <p>Help</p>
          <p>Orders & Returns</p>
          <p>Hi, John</p>
        </header>
        <nav>
          <div>
            <div>
              <h1>ECOMMERCE</h1>
            </div>
            <div>
              <ul>
                <li>Categories</li>
                <li>Sale</li>
                <li>Clearance</li>
                <li>New Stock</li>
                <li>Trending</li>
              </ul>
            </div>
            <div>
              <Image src={"/search.ico"} alt="" width={25} height={25}></Image>
              <Image src={"/cart.ico"} alt="" width={25} height={25}></Image>
            </div>
          </div>
          <div>
            <p><span>{"<"}</span>Get 10% off on business sign up<span>{">"}</span></p>
          </div>
        </nav>
        <UserProvider>
          <main className={styles.main}>
            <Loader />
            {children}
          </main>
        </UserProvider>
      </body>
    </html>
  );
}
