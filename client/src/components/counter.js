import React, { useEffect, useRef } from "react";
import { animate } from "framer-motion";

function Counter({ from, to }) {
    const ref = useRef();
  
    useEffect(() => {
      const controls = animate(from, to, {
        duration: 1,
        onUpdate(value) {
          ref.current.textContent = value.toFixed(0);
        }
      });
      return () => controls.stop();
    }, [from, to]);
  
    return <div ref={ref} />;
}

export default Counter;