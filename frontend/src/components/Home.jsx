import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    fetch("/api/all-questions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setQuestions(data.questions))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "#3B9A53";
      case "medium":
        return "#9A663B";
      case "hard":
        return "#B54040";
      default:
        return "black";
    }
  };

  return (
    <section id="home">
      <div className="head">
        <div className="text">
          web3<br></br>compiler.
        </div>
        <div className="icons">
          <div className="rust-con">
            <i className="devicon-rust-original"></i>
          </div>
          <div className="sol-icon">
            <i className="devicon-solidity-plain"></i>
          </div>
        </div>
        <div className="name">- Yash Kanjariya</div>
      </div>
      <div className="about-section">
        <h2>About</h2>
        <div className="paragraph-container">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
      <div className="home-container">
        <div className="lang-support">
          Language Support:{" "}
          <div className="lang">
            <div className="rust">Rust</div>
            <div className="sol">Solidity</div>
          </div>
        </div>

        <div className="question-head">Questions List</div>
        <ul>
          {questions.map((question, index) => (
            <li key={index}>
              <div className="index">{index + 1}</div>
              <Link to={`/editor/${question._id}`} className="link">
                <div>{question.question}</div>
              </Link>
              <p
                className="difficulty"
                style={{ color: getDifficultyColor(question.difficulty) }}
              >
                {capitalizeFirstLetter(question.difficulty)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Home;
