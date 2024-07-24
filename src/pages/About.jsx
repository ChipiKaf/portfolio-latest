import Navbar from "../components/Navbar";
import "../styles/pages/Interface.scss";
const About = () => {
  return (
    <>
      <section className="home-section row">
        <div
          className="left-section 
        col-12
        d-flex
        justify-content-center
        align-items-center
        col-md-6
        justify-content-md-start
        align-items-md-start
        "
        >
          <div className="left-content">
            <h1 className="main-heading">
              <span className="large slide-in-bottom fs-md-1 fs-sm-2">
                Welcome
              </span>
            </h1>
            <h1 className="main-heading-2">
              <span className="slide-in-bottom-delayed">
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
        justify-content-md-end
        align-items-md-end
        col-md-6
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

export default About;
