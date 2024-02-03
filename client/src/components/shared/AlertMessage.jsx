const AlertMessage = ({ text, color }) => {
  return (
    <div style={{ position: "relative", marginBottom: "10px" }}>
      <div
        className="alert"
        style={{
          position: "absolute",
          left: "10px",
          top: "-60px",
          backgroundColor: color,
          color: "white",
          padding: "5px",
          borderRadius: "10px",
          width: "215px",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default AlertMessage;
