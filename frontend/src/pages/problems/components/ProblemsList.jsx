
import { useGetAllProblemsQuery, useGetAllProblemsByDifficultyQuery } from "../../../services/problemsAPI";
import { Link } from "react-router-dom";
import "./ProblemsList.css";

function ProblemsList({ difficulty }) {

    const allProblems = useGetAllProblemsQuery(undefined, { skip: !!difficulty });
    const filteredProblems = useGetAllProblemsByDifficultyQuery(difficulty, { skip: !difficulty });

    const { data, isLoading } = difficulty ? filteredProblems : allProblems;
    console.log(data);

    if (isLoading) {
        return <section className="problems-section">
            <h2 className="problems-loading">Loading...</h2>
        </section>;
    }

    return (
        <section className="problems-section">

            <div className="problems-header">
                <h1 className="problems-title">
                    {difficulty ? `${difficulty} Problems` : "Problems"}
                </h1>
                <h5 className="problems-count">
                    Total: {data?.data?.problems?.length}
                </h5>
            </div>

            <div className="problems-list">
                {
                    data?.data?.problems?.map((problem) => (
                        <Link
                            to={`/problem/${problem._id}`}
                            key={problem._id}
                            className="problem-link"
                        >

                            <article className={`problem-card ${problem.difficulty.toLowerCase()}`}>

                                <span className={`status ${problem.status.toLowerCase()}`}>
                                    {problem.status === 'IN_PROGRESS' ? 'in progress' : problem.status.toLowerCase()}
                                </span>

                                <div className="problem-card-header">

                                    <h4 className="problem-title">
                                        {problem.title}
                                    </h4>

                                    <span
                                        className={`problem-difficulty ${problem.difficulty.toLowerCase()}`}
                                    >
                                        {problem.difficulty === 'Medium' ? 'Moderate' : problem.difficulty}
                                    </span>

                                </div>

                                <p className="problems-description">
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