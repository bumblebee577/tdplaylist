import React from "react";

const styles = {
  container: {
    background: `radial-gradient(
      circle,
      rgba(63, 94, 251, 1) 0%,
      rgba(252, 70, 107, 1) 100%
    )`,
    position: "relative",
    display: "flex",
    flex: 1,
    margin: 0,
    height: "100vh",
  },
  welcomeMsg: {
    margin: "auto",
    display: "inline-block",
    textAlign: "center",
    color: "white",
  },
};

const FrontPage = (props) => {
  return (
    <div style={styles.container}>
      <div style={styles.welcomeMsg}>
        <h1>Tdplaylist</h1>
        <p>Today's task playlist, focus on productivity!</p>
        <hr />

        <button className="btn btn-light" onClick={props.handleEntry}>
          Get started
        </button>
      </div>
    </div>
  );
};

export default FrontPage;
