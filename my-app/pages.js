// pages/index.js
import { useEffect, useState } from 'react';

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchEmployees = async () => {  
      try{  
        const response = await fetch('http://localhost:5000/employees') 
        .then((response) => response.json())
        .then((data) => setEmployees(data)) // 取得したデータをステートにセット
      } catch(err){ 
        setError(err.message);
      };
    }
      fetchEmployees();
  }, []);

//   const fetchEmployees = async () => {
//     const response = await fetch('http://localhost:4000/api/employees');
//     const data = await response.json();
//     console.log(data);
// };

// fetchEmployees();


  return (
    <div>
      <h1>Employee List</h1>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>{employee.name} - {employee.position} 
          </li>
        ))}
      </ul>
    </div>
  );
}
