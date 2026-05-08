import { useParams } from "react-router-dom";

import { useGetProblemByIdQuery } from "../services/problemsAPI";

import "./styles/Problem.css";

function Problem() {

  const { id } = useParams();

  const {
    data,
    isLoading,
    error
  } = useGetProblemByIdQuery(id);

  if (isLoading) {
    return (
      <h2 className="problem-loading">
        Loading...
      </h2>
    );
  }

  if (error) {
    return (
      <h2 className="problem-error">
        Something went wrong.
      </h2>
    );
  }

  const problem = data?.data;

  return (
    <section className="problem-section">

      <div className="problem-container">

        <div className="problem-meta">

          <span className="problem-category">
            {problem.category}
          </span>

          <span className={`problem-badge ${problem.difficulty.toLowerCase()}`}>
            {problem.difficulty}
          </span>

        </div>

        <h1 className="problem-heading">
          {problem.title}
        </h1>

        <div className="problem-block">

          <h2 className="problem-subtitle">
            Description
          </h2>

          <p className="problem-text">
            {problem.description}
          </p>

        </div>

        <div className="problem-block">

          <h2 className="problem-subtitle">
            This module not fully impleted...
          </h2>

        </div>

      </div>

    </section>
  );
}

export default Problem;