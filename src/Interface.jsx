import Navbar from "./components/Navbar";
import "./styles/pages/Interface.scss";
const Interface = () => {
  return (
    <>
      <Navbar />
      <section className="home-section">
        <div className="left-section">
          <h1 className="main-heading">
            <span className="large">Welcome</span>
          </h1>
          <h1 className="main-heading">to Chipili dev</h1>
        </div>
        <div className="right-section">
          <h3 className="minor-heading">Create anything</h3>
        </div>
      </section>
    </>
  );
};

export default Interface;
