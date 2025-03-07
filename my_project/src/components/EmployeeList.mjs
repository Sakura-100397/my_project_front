"use client";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import employeeApi from '../api/employee.mjs';

 const EmployeeList = () => { 
  const [employees, setEmployees] = useState([]);
  const [ error, setError] = useState("");
  const router = useRouter();

useEffect(() => { 
  employeeApi.getAll()
  .then((data) => { 
    setEmployees(data);
  })
  .catch((e) => { 
    console.log('Error', e);
    setError('社員情報の取得に失敗しました。');
  });
}, []);

const [isLoading, setIsLoading] = useState(false);

const clickHandler = () => {  
  if (!isLoading) {
    setIsLoading(true);
    router.push('/employees/register');
  }
};
useEffect(() => {
  if (isLoading) {
  }
}, [isLoading]);

 return( 
  <div className="container">
    <h1>▶社員情報一覧</h1>
    {error && <div className="error-msg text-center">{error}</div>}
     { !employees || employees.length === 0 ? (
    <p>表示する情報がありません</p>
  ) : (
    <ul>
      {employees.map(employee => (
        <li key={employee.id}>
          <Link href = {`/employees/${employee.id}`}> 
            <a>{employee.employeeName} - {employee.position}</a>
          </Link>
        </li>
      ))}
    </ul>
  )}
    <div>
      <button onClick={clickHandler}>新規登録</button>
    </div>
    
  </div>
  );
};

export default EmployeeList;
