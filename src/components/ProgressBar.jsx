import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import '../styles/components/Progressbar.scss'

const ProgressBar = ({ skill, index }) => {
  return (
    <motion.div
     whileInView={"visible"}
      className={`progress-bar ${
        skill.progress <= 30
          ? "bad"
          : skill.progress <= 70
          ? "ok"
          : "good"
      }`}
      initial={{ scaleX: 0, originX: 0 }}
      variants={{
        visible: {
            scaleX: 1,
            transition: {
                duration: 1,
                delay: .5 + index * .2
            }
        }
      }}
      style={{
        width: `${skill.progress}%`,
    }}
    />
  );
};

export default ProgressBar