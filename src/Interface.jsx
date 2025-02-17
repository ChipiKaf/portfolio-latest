import Navbar from "./components/Navbar";
import "./styles/pages/Interface.scss";
const Interface = () => {
  return (
    <>
      <section className="home-section row">
        <div
          className="left-section 
        col-12
        d-flex
        justify-content-center
        align-items-center
        col-lg-6
        justify-content-lg-start
        align-items-lg-start
        "
        >
          <div className="left-content">
            <h1 className="main-heading">
              <span className="large type fs-md-1 fs-sm-2">
                WELCOME
              </span>
            </h1>
            <h1 className="main-heading-2">
              <span className="type-delayed">
                to <span className="bold">Chipili dev</span>
              </span>
            </h1>
          </div>
        </div>
        <div
          className="
        right-section 
        justify-content-center
        align-items-end
        justify-content-lg-end
        align-items-lg-end
        col-lg-6
        d-flex
        col-12
        "
        >
          <h3 className="minor-heading mb-5">Create anything</h3>
        </div>
      </section>
    </>
  );
};

export default Interface;
