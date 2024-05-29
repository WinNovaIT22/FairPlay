import "@/styles/globals.css";

export const metadata = {
  title: "FairPlay - Konepyöräklubi",
  description: "FairPlay kisasysteemi",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="fi">
      <body>
        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
