import { useState } from "react";
import ProblemsList from "./components/ProblemsList.jsx";
import Dropdown from "../../reusable-components/Dropdown.jsx";
import "./Problems.css"

function Problems() {

    const [difficulty, setDifficulty] = useState("");

    const difficultyOptions = [
        { label: "All Difficulties", value: "" },
        { label: "Easy", value: "Easy" },
        { label: "Moderate", value: "Medium" },
        { label: "Hard", value: "Hard" },
    ];
    
    return (
        <section className="problems-page">
            <div className="problems-filter">
                <label>Select Difficulty Level:</label>
                <Dropdown
                    options={difficultyOptions}
                    value={difficulty}
                    onChange={setDifficulty}
                    placeholder="Select the Difficulty"
                />
            </div>
            <ProblemsList difficulty={difficulty} />
        </section>
    );
}

export default Problems;