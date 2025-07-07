function SingleStair({ width = 0, height = 0, left = 0, top = 0, backgroundColor = "#437057" }) {
  return (
    <div
      style={{
        position: "fixed",
        left: `${left}px`,
        top: `${top}px`,
        backgroundColor,
        width: `${width}%`,
        height: `${height}%`,
        // transform: "rotateX(150deg)",
        borderColor:"blue",
        borderWidth:"10px"
      }}
    ></div>
  );
}

export default SingleStair;
