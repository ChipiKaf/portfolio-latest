import "../styles/components/Cursor.scss";

import { useCallback, useEffect, useRef, useState } from "react";
import { findAncestorWithClass } from "../utils/objectUtils";

const CURSOR_SPEED = 0.08;
const mouse = {
  x: 0,
  y: 0,
  outlineX: 0,
  outlineY: 0,
};

const Cursor = () => {
  const cursorOutline = useRef();
  const [showIcon, setShowIcon] = useState(false);
  const interval = useRef(null);
  const currentIndex = useRef(0);
  const [noImages, setNoImages] = useState(true);

  const animate = useCallback(() => {
    const distX = mouse.x - mouse.outlineX;
    const distY = mouse.y - mouse.outlineY;

    mouse.outlineX = mouse.outlineX + distX * CURSOR_SPEED;
    mouse.outlineY = mouse.outlineY + distY * CURSOR_SPEED;

    cursorOutline.current.style.left = `${mouse.outlineX}px`;
    cursorOutline.current.style.top = `${mouse.outlineY}px`;
    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const mouseEventListener = (e) => {
      mouse.x = e.pageX;
      mouse.y = e.pageY;
    };

    document.addEventListener("mousemove", mouseEventListener);
    const animateEvent = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener("mousemove", mouseEventListener);
      cancelAnimationFrame(animateEvent);
    };
  }, []);

  useEffect(() => {
    const mouseEventListener = (e) => {
      /**
       * @type HTMLElement
       */
      const currentElement = e.target;
      const element = findAncestorWithClass(currentElement, "experience");
      if (element) {
        setShowIcon(true);
        // cursorOutline.current.classList.remove("empty")
        let images = element.getAttribute("data-images").split(" ");
        if (images[currentIndex.current] !== "")
          cursorOutline.current.style.backgroundImage = `url('/${
            images[currentIndex.current]
          }.png')`;

        if (images.length > 1 && interval.current === null) {
          setNoImages(false);
          interval.current = setInterval(() => {
            images = element.getAttribute("data-images").split(" ");
            const index = Math.floor(Math.random() * images.length);

            if (currentIndex.current !== index) {
              cursorOutline.current.classList.add("switch");
              setTimeout(() => {
                cursorOutline.current.style.backgroundImage = `url('/${images[index]}.png')`;
              }, 500);
              setTimeout(() => {
                cursorOutline.current.classList.remove("switch");
              }, 510);
              currentIndex.current = index;
            }
          }, 3000);
        } else if (images.length === 1 && images[0] === "") {
          cursorOutline.current.style.backgroundImage = ``;
          setNoImages(true);
        } else {
          setNoImages(false);
          // cursorOutline.current.style.backgroundImage = `url('/${images[0]}.png')`;
        }
      } else {
        setShowIcon(false);
        // currentIndex.current = null;
        if (interval.current !== null) {
          clearInterval(interval.current);
          interval.current = null;
        }
      }
    };
    document.addEventListener("mouseenter", mouseEventListener, true);
    return () => document.removeEventListener("mouseenter", mouseEventListener);
  }, []);

  return (
    <>
      <div
        ref={cursorOutline}
        className={`cursor ${showIcon ? "active" : ""} ${
          noImages ? "empty" : ""
        }`}
      ></div>
    </>
  );
};

export default Cursor;
