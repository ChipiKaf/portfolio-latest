import { useMemo, useRef } from "react";
import "locomotive-scroll/dist/locomotive-scroll.css";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
  useSpring,
} from "framer-motion";
import "../styles/pages/Contact.scss";
import ProgressBar from "../components/ProgressBar";

const clamp = (value, min, max) => Math.max(Math.min(value, max), min);

export const getCountryFlagEmoji = (countryCode) => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};
const Contact = () => {
  const scrollRef = useRef();
  const { scrollY } = useScroll({
    container: scrollRef,
    smooth: 0.5,
  });

  const smoothScrollY = useSpring(
    useTransform(scrollY, (value) => {
      const dampenedValue = value * 0.05;
      return clamp(dampenedValue, 0, 5);
    }),
    {
      stiffness: 50,
      damping: 10,
      mass: 0.1,
    }
  );

  return (
    <>
      <motion.section ref={scrollRef} className="contact-section">
        <h1 className="overflow-hidden d-flex justify-content-center align-items-center">
          <span className="page-heading">Contact</span>
        </h1>
        <p className="page-text page-text-container">
        I’d love to hear from you! 
        Whether you have a question, 
        or just want to say hi, feel free to reach out 
        using any of the methods below.
        </p>
        {/* <hr /> */}
        <div className="row mt-5 w-100">
          <div className="col-12 d-flex col-md-6 justify-content-center align-items-start">
            <motion.h2 style={{ y: smoothScrollY }} class="section-heading">
              Reach out
            </motion.h2>
          </div>
          <div className="col-12 col-md-6 d-flex flex-column align-items-center justify-content-center bullet-container">
                <div className="row">
                    <div className="col">
                      <a className="email" href="mailto:ckafwilo@gmail.com">
                        ckafwilo@gmail.com
                        </a>  
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6 mb-5">
                      <a className="socials" 
                      rel="noopener noreferrer"
                      target="_blank"
                      href="https://github.com/ChipiKaf">
                      <img className="icon-image" src="/github.png" />
                        Github
                        </a>  
                    </div>
                    <div className="col-12 col-md-6">
                      <a className="socials" 
                      rel="noopener noreferrer"
                      target="_blank"
                      href="https://linkedin.com/in/chipili-kafwilo-0393791b0">
                      <img className="icon-image" src="/linkedin.png" />
                        Linkedin
                        </a>  
                    </div>
                </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Contact;
