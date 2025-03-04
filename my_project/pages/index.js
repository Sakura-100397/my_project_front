"use client";
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const clickHandler = () => {  
    router.push('/employees/register');
  };

  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:5000/employees');
        
        if (!response.ok) {
          throw new Error('データ取得エラー');
        }

        const data = await response.json();
        setEmployees(data);  
      } catch (err) {
        setError(err.message);  
      }
    };

    fetchEmployees();
  }, []); 

  return(
    <div>
      <h1>社員情報管理システム</h1>
      <p>社員一覧を表示</p>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>{employee.name} - {employee.position} 
          </li>
        ))}
        </ul>
        <button onClick = {clickHandler}>新規登録</button>
    </div>
  );
}