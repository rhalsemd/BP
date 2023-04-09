import UserTable from "../../components/chart/UserTable";
import Footer from "../../components/Footer";
import Nav from "../../components/NavAdmin";

export default function Users() {
  return (
    <>
      <Nav />
      <div>
        <UserTable />
      </div>
      <Footer />
    </>
  );
}
