import { useCallback, useEffect, useMemo, useRef } from "react";
import "../styles/components/Navbar.scss";
import { Noise } from 'noisejs'
import { useFrame } from "@react-three/fiber";
const Navbar = () => {
  const canvas = useRef();
  const noise = useMemo(() => new Noise(0, []))
  const drawDistortedCircle = useCallback((ctx, time, offset, color = "black", strength = 5, centerOffset = 0) => {
    ctx.beginPath();
    const baseRadius = 40;
    const numPoints = 1000;
    const centerX = 50 + centerOffset;
    const centerY = 50 + centerOffset;
    for (let i = 0; i < numPoints; i++) {
      const theta = (i / numPoints) * Math.PI * 2;
      const noiseFactor = noise.perlin2(Math.cos(theta) + time + offset, Math.sin(theta) + time + offset);

      const radius = baseRadius + noiseFactor * strength;

      const x = centerX + radius * Math.cos(theta);
      const y = centerY + radius * Math.sin(theta);

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = color;
    ctx.closePath();
    ctx.stroke();
  }, []);

  const animate = useCallback((ctx, time) => {
    ctx.clearRect(0, 0, 100, 100);

    drawDistortedCircle(ctx, time, 0, 'black', 3);
    drawDistortedCircle(ctx, time, 4, 'gray', 4, 1);
  }, [])

  useFrame((state) => {
    if (canvas.current) {
      animate(canvas.current.getContext("2d"), state.clock.elapsedTime * 1.6)
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
      console.log("Mouse move")
      const distance = Math.sqrt((mouseX - 50) ** 2 + (mouseY - 50) ** 2);
      
      if (distance <= 40) {
        canvas.current.style.cursor = 'pointer';
      } else {
        canvas.current.style.cursor = 'default';
      }
    };

    const handleMouseLeave = () => {
      canvas.current.style.cursor = 'default';
    };

    canvas.current.addEventListener('mousemove', handleMouseMove);
    canvas.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      canvas.current.removeEventListener('mousemove', handleMouseMove);
      canvas.current.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [drawDistortedCircle]);


  return (
    <nav className="navigation">
      <div className="logo">
        Chipili <br />
        Dev
      </div>
      <div className="burger-button">
        <canvas ref={canvas} width={"100px"} height={"100px"}></canvas>
      </div>
    </nav>
  );
};

export default Navbar;
