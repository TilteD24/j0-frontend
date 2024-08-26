import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./index.css";

function Home({ problems }) {
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    if (problems && problems.length > 0) {
      setLoading(false);
    }
  }, [problems]);

  return (
    <>
      <h3>Problems</h3>
      <hr />
      <br />
      {loading ? (
        <div
          className="spinner-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "10vh",
          }}
        >
          <ClipLoader color="gray" size={100} />
        </div>
      ) : (
        problems.map((problem) => (
          <div className="problem-container">
            <h2 className="problem-id">{problem.pid}</h2>
            <Link to={`/solve/${problem.pid}`} className="problem-link">
              <h2 className="problem-title">{problem.title}</h2>
            </Link>
          </div>
        ))
      )}
    </>
  );
}

export default Home;
