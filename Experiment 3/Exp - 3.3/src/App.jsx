import "./Person.css";
import { Person, Student, Teacher } from "./Person";

function App() {
  const people = [
    new Person("Alex Johnson", 30),
    new Student("Emma Watson", 20, "Computer Science"),
    new Teacher("Dr. James Wilson", 45, "Mathematics")
  ];

  return (
    <div className="container">
      <h1>Person Class Hierarchy</h1>

      {people.map((person, index) => (
        <div key={index} className="card">
          <h2>
            {person.name} (
            {person instanceof Student
              ? "Student"
              : person instanceof Teacher
              ? "Teacher"
              : "Person"}
            )
          </h2>

          <p>Age: {person.age}</p>
          <p className="intro">{person.introduce()}</p>

          {person.major && <p>Major: {person.major}</p>}
          {person.subject && <p>Teaching: {person.subject}</p>}
        </div>
      ))}
    </div>
  );
}

export default App;
