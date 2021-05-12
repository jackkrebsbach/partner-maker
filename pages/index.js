import Head from "next/head";
import React, { useState } from "react";

import styles from "../styles/Home.module.css";
import StudentList from "../components/StudentList";

export default function Home(props) {
  const [studentList, updateList] = useState([]);
  const [input, setInput] = useState("");
  const [partners, updatepartners] = useState({});
  const [info, setInfo] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      let studentsTest = event.target.value
        .trim()
        .split(",")
        .filter((e) => {
          return e !== "";
        });
      updateList((oldArray) => oldArray.concat(studentsTest));
      setInput("");
    }
  };

  const handleAddStudent = (event) => {
    event.preventDefault();
    if (input !== "") {
      let studentsTest = input
        .trim()
        .split(",")
        .filter((e) => {
          return e !== "";
        });
      updateList((oldArray) => oldArray.concat(studentsTest));
      setInput("");
    }
  };

  const removeStudent = (name) => {
    updateList(studentList.filter((item) => item !== name));
  };

  const clearList = () => {
    updateList([]);
    setInput("");
    updatepartners({});
  };

  const makePartnersExcel = () => {
    if (studentList.length !== 0) {
      let queryStudents = studentList.join(",");
      window.open("/api/download?Students=" + queryStudents, "_Self");
    }
  };

  return (
    <main className={styles.main}>
      <Head>
        <title>Partner Maker</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <h1 className={styles.title}>Partner Maker</h1>
      <div className={styles.SearchBar}>
        <div className={styles.tutorial}>
          <button type={"button"} onClick={() => setInfo(!info)}>
            About
          </button>
          {info ? null : (
            <p>
              Designed to create a unique list of partners for each student in a
              classroom. Each student is paired with every student in the class
              once. If there is an odd number of students a 'No Partner' student
              will automatically be added.
            </p>
          )}
        </div>
        <h4 className={styles.info}>
          To get started enter a single student's name <br /> or <br /> Enter
          multiple students' names separated by commas.
        </h4>
        <div className={styles.input}>
          <input
            className={styles.textArea}
            placeholder="Enter a student/students here"
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            value={input}
          />
          <button className={styles.SearchButton} onClick={handleAddStudent}>
            +
          </button>
        </div>
        {studentList.length !== 0 ? (
          <div className={styles.List}>
            <StudentList students={studentList} removeStudent={removeStudent} />
            <div className={styles.Buttons}>
              <button
                className={styles.GenerateButton}
                onClick={() => clearList()}
              >
                Clear Student List
              </button>
              <button
                className={styles.GenerateButton}
                onClick={() => makePartnersExcel()}
              >
                Generate Excel
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
