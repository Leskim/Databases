var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "university"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  var sql = [
    "SELECT * FROM student",
    // "SELECT * FROM student NATURAL JOIN takes",
    "SELECT * FROM course",
    "SELECT * FROM takes",
    // "SELECT * FROM section",
    // "SELECT * FROM instructor",

    // QUESTION 1 :-

    // Q1. a --- ALL STUDENTS WHO HAVE TAKEN AT LEAST ONE COMP SCI COURSE --second is correct
    // Two meethods used for the first question ... all are correct first on has more entries 'Bourikas' did a
    // "SELECT DISTINCT name FROM takes, student, course WHERE takes.ID = student.ID AND takes.course_id = course.course_id AND course.dept_name = 'Comp. Sci.'",
    // "SELECT DISTINCT name FROM student NATURAL JOIN takes NATURAL JOIN course WHERE course.dept_name = 'Comp. Sci.'",
    // Q1. b --- IDS OF ALL STUDENTS WHO HAVE NOT TAKEN ANY COURSE OFFERING BEFORE SPRING 2009
    // "SELECT ID, name FROM student NATURAL JOIN takes EXCEPT SELECT ID, name FROM student NATURAL JOIN takes WHERE year < 2009",
    // Q1. c --- MAX SALARY OF INSTRUCTOR IN THAT DEPARTMENT FOR EACH DEPARTMENT
    // "SELECT dept_name, max(salary) FROM instructor GROUP BY dept_name",
    // Q1. d --- LOWEST SALARY PER DEPARTMENT
    // "SELECT min(max_sal) FROM (SELECT dept_name, max(salary) AS max_sal FROM instructor GROUP BY dept_name) AS max_sals",
    // "SELECT min(max_salary) AS min_salary FROM (SELECT dept_name, max(salary) AS max_salary FROM instructor GROUP BY dept_name) AS max_salaries",

    // QUESTION 2 :-

    // Q2. a ---- NEW COURSE "CS-001", TITLE IT 'Weekly Seminar' HAVING 0 credits
    // "INSERT INTO course (course_id, title, dept_name, credits) VALUES ('CS-001', 'Weekly Seminar', 'Comp. Sci.', 0)",
    // "SELECT * FROM course",

    // Q2. b ---- CREATE A section FOR THE ABOVE COURSE IN Autumn 2009, WITH sec_id OF 1
    // "SELECT * FROM section",
    // "INSERT INTO section (course_id, sec_id, semester, year) VALUES ('CS-001', 1, 'Autumn', 2009)",
    // "SELECT * FROM section",

    // Q2. c ---- ENROLL EVERY STUDENT IN Comp. Sci. department IN THE ABOVE SECTION
    // "INSERT INTO takes (ID, course_id, sec_id, semester, year) SELECT ID, 'CS-001', 1, 'Autumn', 2009 FROM student WHERE dept_name = 'Comp. Sci.'",
    // "UPDATE takes SET grade = 'A' WHERE takes.ID = 013 AND takes.year = 2017 ",
    // "SELECT * FROM takes ",

    //Q2. d ----  DELETE ENROLLMENTS IN THE ABOVE SECTION WHERE THE STUDENT'S NAME IS Chaves * used 'Zhang'
    // "INSERT INTO takes (ID, course_id, sec_id, semester, year) SELECT ID, 'CS-001', 1, 'Autumn', 2009 FROM student WHERE dept_name = 'Comp. Sci.' AND name = 'Zhang'",
    // "DELETE FROM takes WHERE (course_id = 'CS-001') AND ID = (ID in ( SELECT ID FROM student WHERE name = 'Zhang'));",
    // "DELETE FROM takes WHERE takes.ID = (ID FROM (ID IN SELECT ID, name FROM student WHERE name = 'Chaves'))",

    // Q2. e ---- DELETE the 'CS-001' course. (What happens if you delete without first deleting offerings (sections) of this course.?????)
    // "DELETE FROM course WHERE course_id = 'CS-001'",

    // Removes all instances of 'CS-001' from takes and section tables

    //Q2. f ---- DELETE ALL takes tuples where the course title has the word "database" in it ;; ignore case when matching the word with the title
    // "SELECT * FROM course",
    // "SELECT * FROM takes ",

    // "DELETE FROM takes WHERE course_id IN (SELECT course_id FROM course WHERE title LIKE '%database%')",

    // "SELECT * FROM course",
    // "SELECT * FROM takes ",
    // "SELECT * FROM student",

  ];
  // var sql = ;

  for (var i = 0; i < sql.length; i++) {
    var text = "";
    switch (i) {
      // case 0:
      //   text = "Showing students from the students table.";
      //   // console.log("Showing students from the students table.");
      //   break;
      // case 1:
      //   text = "Showing courses table";
      //   // console.log("Showing courses table");
      //   break;
      // case 2:
      //   text = "Showing takes table";
      //   // console.log("Showing takes table");
      //   break;
      // case 3:
      //   text = "Result for Q1 those doing Comp. Sci.";
      //   // console.log("Result for Q1 those doing Comp. Sci.");
      //   break
      default:
        text = "Next table: ";
        // console.log("Next table :");
    }

    con.query(sql[i], function(err, result) {
      if (err) throw err;
      console.log(text);
      console.table(result);
    });


  }



});

// console.log(new Date().getDay());