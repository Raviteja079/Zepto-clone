import React from "react";
import { CgDanger } from "react-icons/cg";

export const NotFound = () => {
  return (
    <div className="p-5">
      <h3>
        Error Page NotFound
        <span>
          <CgDanger className="m-3 text-danger" />
        </span>
      </h3>
    </div>
  );
};
