import { useState } from "react";
import ProblemsList from "./components/ProblemsList.jsx";
import "./Problems.css"

function Problems() {

    const [difficulty, setDifficulty] = useState("");
    
    return (
        <section className="problems-page">
            <div className="problems-filter">
                <label>Select Difficulty Level:</label>
                <select
                    className="select-difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}>

                    <option value="">
                        Select the Difficulty
                    </option>

                    <option value="Easy">
                        Easy
                    </option>

                    <option value="Medium">
                        Moderate
                    </option>

                    <option value="Hard">
                        Hard
                    </option>

                </select>
            </div>
            <ProblemsList difficulty={difficulty} />
        </section>
    );
}

export default Problems;