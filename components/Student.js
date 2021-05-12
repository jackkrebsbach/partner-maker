import React, { useState, useEffect } from "react";
import styles from "../styles/Student.module.css";
import Head from "next/head";

export default function Student(props) {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(props.studentName);
  }, []);

  const handleRemoval = () => {
    props.removeStudent(name);
  };

  return (
    <div className={styles.Student}>
      <span className={styles.StudentInfo}> {name} </span>
      <div className={styles.remove}>
        <button onClick={handleRemoval}> - </button>
      </div>
    </div>
  );
}
