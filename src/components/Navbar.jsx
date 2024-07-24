import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "../styles/components/Navbar.scss";
import { Noise } from "noisejs";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import useAnimationFrame from "../hooks/useAnimationFrame";

const config = {
  lineWidth: 10,
  heightAdjuster: 5,
  smallerRize: 6,
  duration: 1,
  delay: .4,
  pixelFixer: 0.5,
  strokeColor: 'black',
  baseRadius: 40,
};

const Navbar = () => {
  const canvas = useRef();
  const dropdown = useRef();
  const logo = useRef()
  const noise = useMemo(() => new Noise(0, []));
  const inButton = useRef(false);
  const lineWidth = useRef(0); // Width of the lines
  const pixelFixer = useRef(config.pixelFixer);
  const strokeColor = useRef(config.strokeColor);
  const baseRadius = useRef(0)
  const navigate = useNavigate();

  const changeInProgress = useRef(false);
  const offsetter = useRef(0);
  const timeline = useRef(null);
  const isNormal = useRef(false);
  const [isActive, setIsActive] = useState(false)
  const heightAdjuster = useRef(config.heightAdjuster);
  const smallerRize = useRef(config.smallerRize);

  useEffect(() => {
    gsap.fromTo(baseRadius, { current: 0 }, {
      current: config.baseRadius,
      duration: 2,
      delay: .5,
      ease: 'expo.out'
    })

    gsap.fromTo(lineWidth, { current: 0 }, {
      current: config.lineWidth,
      duration: .5,
      delay: 1.5,
      ease: 'expo.out'
    })
  }, [])

  const menuItems = useMemo(() => [
    { title: 'Home', onClick: () => { navigate('/') } }, 
    { title: 'About', onClick: () => { navigate('/about') } },
    { title: 'Work', onClick: () => { navigate('/about') } },
    { title: 'Contact', onClick: () => { navigate('/about') } },
  ], [])

  const drawDistortedCircle = useCallback(
    (ctx, time, offset, color = "black", strength = 5, centerOffset = 0) => {
      if (baseRadius.current === 0) return
      ctx.beginPath();
      const numPoints = 1000;
      const centerX = 50 + centerOffset;
      const centerY = 50 + centerOffset;
      ctx.lineWidth = 1.2;
      for (let i = 0; i < numPoints; i++) {
        const theta = (i / numPoints) * Math.PI * 2;
        const noiseFactor = noise.perlin2(
          Math.cos(theta) + time + offset,
          Math.sin(theta) + time + offset
        );

        const radius = baseRadius.current + noiseFactor * strength;

        const x = centerX + radius * Math.cos(theta);
        const y = centerY + radius * Math.sin(theta);

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = color === 'black' ? strokeColor.current : color;
      ctx.closePath();
      ctx.stroke();
    },
    []
  );

  const drawCenterLines = useCallback((ctx) => {
    if (lineWidth.current === 0) return;
    const lineHeight = 1; // Height of the lines

    const centerX = 50 + pixelFixer.current;
    const centerY = 50 + pixelFixer.current;
    ctx.strokeStyle = strokeColor.current;
    ctx.lineWidth = lineHeight;

    // Draw the first line
    ctx.beginPath();
    ctx.moveTo(
      centerX - lineWidth.current + smallerRize.current,
      centerY - offsetter.current
    );
    ctx.lineTo(centerY + lineWidth.current, centerY + offsetter.current);
    ctx.closePath();
    ctx.stroke();

    // Draw the second line
    ctx.beginPath();
    ctx.moveTo(
      centerX - lineWidth.current,
      centerY + heightAdjuster.current + offsetter.current
    );
    ctx.lineTo(
      centerY + lineWidth.current,
      centerY + heightAdjuster.current - offsetter.current
    );
    ctx.closePath();
    ctx.stroke();
  }, []);

  const animate = useCallback(
    (ctx, time) => {
      ctx.clearRect(0, 0, 100, 100);

      drawDistortedCircle(ctx, time, 0, "black", 2.5);
      drawDistortedCircle(ctx, time, 4, "gray", 2.5, 2);
      drawCenterLines(ctx);
    },
    [drawDistortedCircle, drawCenterLines]
  );

  useAnimationFrame((elapsedTime) => {
    if (canvas.current) {
      animate(canvas.current.getContext("2d"), elapsedTime * 1.6)
    }
  })

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");

    drawDistortedCircle(ctx);
  }, [canvas]);
  const isAnimating = useRef(false)

  const animateIcons = useCallback(() => {
    isAnimating.current = true;
    changeInProgress.current = true;
    isNormal.current = !isNormal.current;
    setIsActive(isNormal.current)

    // Clear previous animations
    if (timeline.current) {
      timeline.current.kill();
    }

    // Create a new timeline
    timeline.current = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
        changeInProgress.current = false;
      }
    });

    if (isNormal.current) {
      // Normal state animations
      timeline.current
      .to(offsetter, { current: lineWidth.current, duration: config.duration, delay: config.delay, ease: "elastic.out" })
      .to(baseRadius, { current: baseRadius.current + 7, duration: config.duration / 2, ease: "power2.out" }, "<")
      .to(heightAdjuster, { current: 0, duration: config.duration, ease: "elastic.out" }, "<")
      .to(smallerRize, { current: 0, duration: config.duration, ease: "elastic.out" }, "<")
      .to(pixelFixer, { current: 0, duration: config.duration, ease: "elastic.out" }, "<")
      .to(strokeColor, { current: 'white', duration: config.duration, ease: "elastic.out" }, `${config.duration / 2}`)

      if (!dropdown.current.classList.contains('active')) {
        dropdown.current.classList.add('active');
        logo.current.classList.add('light');
      }
    } else {
      // Reverse state animations
      timeline.current
        .to(offsetter, { current: 0, duration: config.duration, delay: config.delay, ease: "elastic.out" })
        .to(baseRadius, { current: baseRadius.current - 7, duration: config.duration / 2, ease: "power2.out" }, "<")
        .to(heightAdjuster, { current: config.heightAdjuster, duration: config.duration, ease: "elastic.out" }, "<")
        .to(smallerRize, { current: config.smallerRize, duration: config.duration, ease: "elastic.out" }, "<")
        .to(pixelFixer, { current: config.pixelFixer, duration: config.duration, ease: "elastic.out" }, "<")
        .to(strokeColor, { current: config.strokeColor, duration: config.duration, ease: "elastic.out" }, `${config.duration - config.duration / 10}`)

      if (dropdown.current.classList.contains('active')) {
        dropdown.current.classList.remove('active');
        logo.current.classList.remove('light');
      }
    }
  }, [])

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    drawDistortedCircle(ctx);

    const handleMouseMove = (event) => {
      const rect = canvas.current.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      const distance = Math.sqrt((mouseX - 50) ** 2 + (mouseY - 50) ** 2);

      if (distance <= 40) {
        canvas.current.style.cursor = "pointer";
        inButton.current = true;
      } else {
        canvas.current.style.cursor = "default";
        inButton.current = false;
      }
    };

    const handleMouseLeave = () => {
      canvas.current.style.cursor = "default";
    };

    const handleClick = (e) => {
      if (inButton.current && !isAnimating.current) {
        animateIcons()
      }
    };

    canvas.current.addEventListener("mousemove", handleMouseMove);
    canvas.current.addEventListener("mouseleave", handleMouseLeave);

    canvas.current.addEventListener("click", handleClick);

    return () => {
      canvas.current.removeEventListener("mousemove", handleMouseMove);
      canvas.current.removeEventListener("mouseleave", handleMouseLeave);
      canvas.current.removeEventListener("click", handleClick);
    };
  }, [drawDistortedCircle]);

  return (
    <>
      <nav className="navigation">
        <div ref={logo} className="logo">
          Chipili <br />
          Dev
        </div>
        <div className="burger-button">
          <canvas ref={canvas} width={100} height={100}></canvas>
        </div>
      </nav>
      <div ref={dropdown} className="drop-down">
      {menuItems.map((menuItem, i) => (
        <div key={`${i}-menuItem`} className="drop-down__item" onClick={() => {
          animateIcons()
          menuItem.onClick()
          }}>
          <h4 className={`drop-down__text ${isActive && 'active'}`}>{ menuItem.title }</h4>
      </div>
      ))}
      </div>
    </>
  );
};

export default Navbar;
