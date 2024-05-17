import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { coolGlow } from "thememirror";
import { defaultKeymap } from "@codemirror/commands";
import { rust } from "@codemirror/lang-rust";
import { solidity } from "@replit/codemirror-lang-solidity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./editor.css";

const Editor = () => {
  let { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [difficulty, setDifficulty] = useState("");
  const [language, setLanguage] = useState("rust");
  const [idState, setIdState] = useState(id);
  const [compileResult, setCompile] = useState({});
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const viewRef = useRef(null);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    fetch(`/api/questions/${idState}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch question");
        }
        return response.json();
      })
      .then((data) => {
        setQuestion(data.question.question);
        setDifficulty(data.question.difficulty);
      })
      .catch((error) => {
        console.error("Error fetching question:", error);
      });
  }, [idState]);

  useEffect(() => {
    const startState = EditorState.create({
      doc:
        language === "rust"
          ? 'fn main() {\n    println!("Hello, world!");\n}'
          : '// SPDX-License-Identifier: MIT\n\npragma solidity ^0.8.0;\n\ncontract mainContract {\n    string public message;\n\n    constructor() {\n        message = "Hello, world!";\n    }\n}',
      extensions: [
        keymap.of(defaultKeymap),
        language === "rust" ? rust() : solidity,
        coolGlow,
      ],
    });

    if (editorRef.current) {
      const view = new EditorView({
        state: startState,
        parent: editorRef.current,
      });

      viewRef.current = view;

      return () => {
        view.destroy();
      };
    }
  }, [idState, language]);

  const handleLanguageChange = async (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    let updatedNewId;
    if (newLanguage === "solidity") {
      const response = await fetch(`/api/next/${id}`);
      if (response.ok) {
        const data = await response.json();
        updatedNewId = data._id;
      } else {
        console.error("Error fetching question:", response.statusText);
        return;
      }
    } else if (newLanguage === "rust") {
      const response = await fetch(`/api/previous/${id}`);
      if (response.ok) {
        const data = await response.json();
        updatedNewId = data._id;
      } else {
        console.error("Error fetching question:", response.statusText);
        return;
      }
    }
    setIdState(updatedNewId);
    navigate(`/editor/${updatedNewId}`);
  };

  const getDifficultyScore = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return 1;
      case "medium":
        return 2;
      case "hard":
        return 3;
      default:
        return 0;
    }
  };
  const updateScore = (difficulty) => {
    const score = getDifficultyScore(difficulty);
    const currentScore = parseInt(localStorage.getItem("score")) || 0;
    const newScore = currentScore + score;
    localStorage.setItem("score", newScore);
  };

  const handleSubmitCode = () => {
    if (viewRef.current) {
      const code = viewRef.current.state.doc.toString();
      setCompile({});
      fetch(`/api/compile/${language == "rust" ? "rust" : "sol"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: idState,
          lang: language == "rust" ? "rust" : "sol",
          code: code,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to submit code");
          }
          return response.json();
        })
        .then((data) => {

          setCompile({
            status: data.message,
            result: data.result,
            test: data.test,
          });

          if (data.test === "success") {
            updateScore(difficulty);
          }
        })
        .catch((error) => {
          console.error("Error submitting code:", error);
        });
    }
  };

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
    <>
      <section id="editor">
        <div className="header">
          <button
            className="back-button"
            onClick={() => {
              navigate("/");
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Home
          </button>
          <div className="score">Score: {localStorage.getItem("score")}</div>
        </div>
        <div className="container">
          <div className="question-editor">
            <div className="question-container">
              {question && (
                <div>
                  <div className="q-head">Question:</div>
                  <p>{question}</p>
                  <div
                    style={{ background: getDifficultyColor(difficulty) }}
                    className="difficulty"
                  >
                    {capitalizeFirstLetter(difficulty)}
                  </div>
                </div>
              )}
            </div>
            <div className="editor-container">
              <div className="lang-select-container">
                <button onClick={handleSubmitCode} className="run">
                  <FontAwesomeIcon icon={faPlay} />
                </button>
                <select
                  id="language"
                  value={language}
                  onChange={handleLanguageChange}
                  className="lang-change"
                >
                  <option value="rust">Rust</option>
                  <option value="solidity">Solidity</option>
                </select>
              </div>
              <div className="editor" ref={editorRef}></div>
            </div>
          </div>
          <div className="result"></div>
          <div className="result-container">
            <div className="head">
              <div className="compile-result">Compile Result</div>
              <div className="result-status">{compileResult.status}</div>
              {compileResult.test && (
                <div className="test">
                  Test : {capitalizeFirstLetter(compileResult.test)}
                </div>
              )}
            </div>
            {compileResult && (
              <div className="result-sub-container">
                <div className="compilation-result">
                  Compilation
                  {compileResult.result && (
                    <div>
                      {compileResult.result.compilation_stdout && (
                        <p>{compileResult.result.compilation_stdout}</p>
                      )}
                      {compileResult.result.compilation_stderr && (
                        <p>{compileResult.result.compilation_stderr}</p>
                      )}
                    </div>
                  )}
                </div>
                <div className="execution-output">
                  Execution
                  {compileResult.result && (
                    <div>
                      {compileResult.result.execution_stdout && (
                        <div> {compileResult.result.execution_stdout}</div>
                      )}
                      {compileResult.result.execution_stderr && (
                        <p>{compileResult.result.execution_stderr}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Editor;
