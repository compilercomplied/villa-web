import { useEffect, useState } from "react";


export const usePageBottom = () => {

  const [bottom, setBottom] = useState(false);
  

  useEffect(() => {

    const handleScroll = () => {
      console.log("scroll event");
      const isBottom = window.innerHeight + document.documentElement.scrollTop 
        === document.documentElement.offsetHeight;

      if (isBottom) console.log("bottom reached");
      setBottom(isBottom);
      
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  return bottom;

}