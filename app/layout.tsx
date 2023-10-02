import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";
import type { Session } from "next-auth";
export const metadata = {
  title: "Promptbazaar",
  description: "Discover endless creative possibilities with PROMPTBAZAAR",
};


const RootLayout = ({ children, session }: { children: React.ReactNode, session: Session }) => 
   (
  <html lang='en'>
    <body>
      <Provider session={session}>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;