import React from "react";

const Skeleton = () => {
  return (
    <div className="relative rounded-md p-4 w-64 h-20">
      <div className="absolute top-0 left-0 w-full h-full animate-pulse">
        <div className="h-2 bg-white rounded-md mb-2 w-3/4"></div>
        <div className="h-2 bg-white rounded-md mb-2 w-1/2"></div>
        <div className="h-2 bg-white rounded-md mb-2 w-2/3"></div>
        <div className="h-2 bg-white rounded-md w-1/4"></div>
      </div>
    </div>
  );
};

export default Skeleton;
