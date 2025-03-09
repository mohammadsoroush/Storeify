import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
      
    >
      <Image
        src={"/asset/Eclipse-loading.gif"}
        alt="Loading.... "
        height={100}
        width={100}
      />
    </div>
  );
};

export default Loading;
