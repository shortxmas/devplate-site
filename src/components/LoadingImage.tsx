import * as React from "react";
import { useState, FC } from "react";

interface Props {
  imageUri: string;
  height: string;
}

const LoadingImage: FC<Props> = (props) => {
  const [loadingStyle, changeLoadingStyle] = useState({});
  const [imageStyle, changeImageStyle] = useState({ display: "none" });

  return (
    <>
      <div className="d-flex justify-content-center" style={loadingStyle}>
        <div className="spinner-border my-3" style={loadingStyle}></div>
      </div>

      <img
        src={props.imageUri}
        onLoad={() => {
          changeLoadingStyle({ display: "none" });
          changeImageStyle({ display: "" });
        }}
        style={imageStyle}
        height={props.height}
      ></img>
    </>
  );
};

export default LoadingImage;
