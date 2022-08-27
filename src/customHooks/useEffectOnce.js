import { useEffect, useRef } from "react";

//montat -> demontat -> montat
const useEffectOnce = (cb, dependencies) => {
  const countCalls = useRef(0);

  useEffect(() => {
    if (countCalls.current === 0) {
      cb();
      countCalls.current = 1;
    }
    return () => { console.log("component will unmount") }
  }, []);

  useEffect(() => {
    if (countCalls.current > 2) {
      cb();
    }
    countCalls.current++;//3
    if(countCalls.current === 10)countCalls.current = 3;
  }, [...dependencies]);
};

export { useEffectOnce };