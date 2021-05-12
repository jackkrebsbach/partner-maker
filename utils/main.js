/* 
Function that will reate partners and a return an object with the students as keys and the partners as values.
*/

const getPartners = (students) => {
  students.length % 2 === 0 ? students : students.push("No Partner");
  let length = students.length;

  // Initilaizing Array of Partners
  let partners = {}; // create an empty array
  for (let x = 0; x < length; x++) {
    partners[String(students[x])] = [];
  }

  /* 
Rule Function: take in an index and return the index of the correct partner
*/
  const rule = (index, length) => {
    let a = length / 2; //Half the length of the array of names
    if (index < a) {
      return index + a;
    } else {
      return index % a;
    }
  };
  /* 
Shift Function: shifts the array the correct amount used as a callback function.
*/

  const shift = (element, index) => {
    if (index === 0) {
      return students[0];
    }
    if (index > 0 && index < length / 2 - 1) {
      return students[index + 1];
    }
    if (index === length / 2 - 1) {
      return students[length - 1];
    }
    if (index === length / 2) {
      return students[1];
    }
    if (index > length / 2 && index < length) {
      return students[index - 1];
    }
  };

  // Creating a list for each student
  for (let i = 0; i < length - 1; i++) {
    for (let x = 0; x < length; x++) {
      partners[students[x]].push(students[rule(x, length)]);
    }

    // Shift The array of students and repeat
    students = students.map(shift);
  }
  return partners;
};

export default getPartners;
