
import { useGetAllProblemsQuery, useGetAllProblemsByDifficultyQuery } from "../../../services/problemsAPI";
import { Link } from "react-router-dom";
import "./ProblemsList.css";

function ProblemsList({ difficulty }) {

    const allProblems = useGetAllProblemsQuery(undefined, { skip: !!difficulty });
    const filteredProblems = useGetAllProblemsByDifficultyQuery(difficulty, { skip: !difficulty });

    const { data, isLoading } = difficulty ? filteredProblems : allProblems;

    if (isLoading) {
        return <h2 className="problems-loading">Loading...</h2>;
    }

    return (
        <section className="problems-section">

            <div className="problems-header">
                <h1 className="problems-title">
                    {difficulty ? `${difficulty} Problems` : "Problems"}
                </h1>
                <p className="problems-count">
                    Total Problems: {data?.data?.problems?.length}
                </p>
            </div>

            <div className="problems-list">
                {
                    data?.data?.problems?.map((problem) => (
                        <Link
                            to={`/problem/${problem._id}`}
                            key={problem._id}
                            className="problem-link"
                        >

                            <article className="problem-card">

                                <div className="problem-card-top">

                                    <h2 className="problem-title">
                                        {problem.title}
                                    </h2>

                                    <span
                                        className={`problem-difficulty ${problem.difficulty.toLowerCase()}`}
                                    >
                                        {problem.difficulty === 'Medium' ? 'Moderate' : problem.difficulty}
                                    </span>

                                </div>

                                <p className="problem-description">
                                    {problem.description}
                                </p>

                            </article>

                        </Link>
                    ))
                }

            </div>

        </section>
    );
}

export default ProblemsList;