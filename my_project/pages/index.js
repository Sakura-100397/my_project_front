"use client";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {  EmployeeProvider, useEmployeeContext } from '../context/EmployeeContext';
import EmployeeList from '../components/EmployeeList.mjs';

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
     
      try {
        const response = await fetch('http://localhost:5000/employees');
        
        if (!response.ok) {
          throw new Error('データ取得エラー');
        }

        const data = await response.json();
        console.log("取得した社員データ:", data); 
        setEmployees(data);  
       
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
      <EmployeeList employees = {employees} />
      <button onClick={clickHandler}>新規登録</button>
    </div>
  );
};

