import React, { useEffect } from "react";
import Header from "../components/Headers/Header";
import { useLocation } from "react-router-dom";

const PaanCorner = () => {
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    document.title = pathname;
  }, [location]);

  return (
    <div>
      <Header isSearch={false} />
      <div>
        <h3 className="text-primary m-5">Paan Corner coming soon....</h3>
      </div>
    </div>
  );
};

export default PaanCorner;
