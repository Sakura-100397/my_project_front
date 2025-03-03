"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
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
      <Link href="/employees/register">
        <button>新規登録</button>
      </Link>
    </div>
  );
}