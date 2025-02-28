// pages/index.js
import { useEffect, useState } from 'react';

export default function Home() {
  const [employees, setEmployees] = useState([]);

  // APIから社員情報を取得する関数
  useEffect(() => {
    fetch('http://localhost:4000/home/employees') // バックエンドのエンドポイント
      .then((response) => response.json())
      .then((data) => setEmployees(data)) // 取得したデータをステートにセット
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const fetchEmployees = async () => {
    const response = await fetch('http://localhost:4000/api/employees');
    const data = await response.json();
    console.log(data);
};

fetchEmployees();


  return (
    <div>
      <h1>Employee List</h1>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>{employee.name}</li>
        ))}
      </ul>
    </div>
  );
}
