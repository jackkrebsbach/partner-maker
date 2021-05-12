import React, { useState } from "react";
import Head from "next/head";
import Student from "./Student";
import styles from "../styles/StudentList.module.css";

export default function StudentList(props) {
  return (
    <div className={styles.container}>
      <h2 className={styles.header}> Student List </h2>
      {props.students.map((student, index) => {
        return (
          <Student
            key={index + 1}
            studentName={student}
            removeStudent={props.removeStudent}
          />
        );
      })}
    </div>
  );
}
