import BackButton from "@/components/ui/backbutton";

const Layout = ({ children }) => {
  return (
    <div className="container">
      <header>
        <BackButton />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;