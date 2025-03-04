"use client";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {  useEmployeeContext } from '../context/EmployeeContext';

export default function Home() {
  const { employees, setEmployees } = useEmployeeContext();

  useEffect(() => {
    console.log('現在の社員情報:', employees); 
  }, [employees]); 
  const router = useRouter();

  const clickHandler = () => {  
    router.push('/employees/register');
  };

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      console.log('社員情報を取得中...');
      try {
        const response = await fetch('http://localhost:5000/employees');
        
        if (!response.ok) {
          throw new Error('データ取得エラー');
        }

        const data = await response.json();
        console.log("取得した社員データ:", data); 
        setEmployees(data);  
        console.log('社員情報をセット後:', data);
      } catch (err) {
        setError(err.message);  
      }
    };

    fetchEmployees();
  }, []); 

  useEffect(() => {
    console.log('Employees:', employees);
  }, [employees]);

  return(
    <div>
      <h1>社員情報一覧</h1>
      {employees.length === 0 ? (
        <p>社員情報はありません</p>
      ) : (
        <ul>
          {employees.map(employee => (
            <li key={employee.id}>
              {employee.name} - {employee.position}
            </li>
          ))}
        </ul>
      )}
      <button onClick={clickHandler}>新規登録</button>
    </div>
  );
}