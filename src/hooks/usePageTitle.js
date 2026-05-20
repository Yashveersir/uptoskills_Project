import { useEffect } from "react";

const usePageTitle = (title, suffix = "AI Learn") => {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${suffix}` : suffix;
    document.title = fullTitle;
  }, [title, suffix]);
};

export default usePageTitle;