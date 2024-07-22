import { useCallback, useEffect, useMemo, useRef } from "react";
import "../styles/components/Navbar.scss";
import { Noise } from "noisejs";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";

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
  const lineWidth = useRef(config.lineWidth); // Width of the lines
  const pixelFixer = useRef(config.pixelFixer);
  const strokeColor = useRef(config.strokeColor);
  const baseRadius = useRef(config.baseRadius)

  const offsetter = useRef(0);
  const isNormal = useRef(false);
  const heightAdjuster = useRef(config.heightAdjuster);
  const smallerRize = useRef(config.smallerRize);
  const drawDistortedCircle = useCallback(
    (ctx, time, offset, color = "black", strength = 5, centerOffset = 0) => {
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
      drawDistortedCircle(ctx, time, 4, "gray", 2.5, 1);
      drawCenterLines(ctx);
    },
    [drawDistortedCircle, drawCenterLines]
  );

  useFrame((state) => {
    if (canvas.current) {
      animate(canvas.current.getContext("2d"), state.clock.elapsedTime * 1.6);
    }
  });
  useEffect(() => {
    const ctx = canvas.current.getContext("2d");

    drawDistortedCircle(ctx);
  }, [canvas]);

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

    const handleClick = () => {
      if (inButton.current) {
        isNormal.current = !isNormal.current;

        if (isNormal.current) {
          gsap.fromTo(
            offsetter,
            { current: 0 },
            {
              current: lineWidth.current,
              duration: config.duration,
              delay: config.delay,
              ease: "elastic.out",
            }
          );
          gsap.fromTo(
            heightAdjuster,
            { current: heightAdjuster.current },
            {
              current: 0,
              duration: config.duration,
              delay: config.delay,
              ease: "elastic.out",
            }
          );
          gsap.fromTo(
            baseRadius,
            { current: baseRadius.current },
            {
              current: baseRadius.current + 7,
              duration: config.duration - .5,
              delay: config.delay - config.delay + .1,
              ease: "power2.out",
            }
          );
          gsap.fromTo(
            smallerRize,
            { current: smallerRize.current },
            {
              current: 0,
              duration: config.duration,
              delay: config.delay,
              ease: "elastic.out",
            }
          );
          gsap.fromTo(
            strokeColor,
            { current: strokeColor.current },
            {
              current: 'white',
              duration: config.duration,
              delay: config.delay,
              ease: "elastic.out",
            }
          );
          gsap.fromTo(
            pixelFixer,
            { current: pixelFixer.current },
            {
              current: 0,
              duration: config.duration,
              delay: config.delay,
              ease: "elastic.out",
            }
          );
          if (!dropdown.current.classList.contains('active')) {
            dropdown.current.classList.add('active')
            logo.current.classList.add('light')
          }
        } else {
          gsap.fromTo(
            offsetter,
            { current: lineWidth.current },
            {
              current: 0,
              duration: config.duration,
              delay: config.delay,
              ease: "elastic.out",
            }
          );
          gsap.fromTo(
            strokeColor,
            { current: 'white' },
            {
              current: config.strokeColor,
              duration: config.duration,
              delay: config.delay,
              ease: "elastic.out",
            }
          );
          gsap.fromTo(
            baseRadius,
            { current: baseRadius.current },
            {
              current: baseRadius.current - 7,
              duration: config.duration -.5,
              delay: config.delay - config.delay,
              ease: "power2.out",
            }
          );
          gsap.fromTo(
            heightAdjuster,
            { current: heightAdjuster.current },
            {
              current: config.heightAdjuster,
              duration: config.duration,
              delay: config.delay,
              ease: "elastic.out",
            }
          );
          gsap.fromTo(
            smallerRize,
            { current: smallerRize.current },
            {
              current: config.smallerRize,
              duration: config.duration,
              delay: config.delay,
              ease: "elastic.out",
            }
          );
          gsap.fromTo(
            pixelFixer,
            { current: 0 },
            {
              current: config.pixelFixer,
              duration: config.duration,
              delay: config.delay,
              ease: "elastic.out",
            }
          );
          if (dropdown.current.classList.contains('active')) {
            dropdown.current.classList.remove('active')
            logo.current.classList.remove('light')
          }

        }
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
      <div ref={dropdown} className="drop-down"></div>
    </>
  );
};

export default Navbar;
