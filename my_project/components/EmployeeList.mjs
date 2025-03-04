import Link from 'next/link';

const EmployeeList = ({ employees }) => {   
    return( 
        <div>
        <h1>社員情報一覧</h1>
         {employees.length === 0 ? (
        <p>社員情報はありません</p>
      ) : (
        <ul>
          {employees.map(employee => (
            <li key={employee.id}>
              <Link href = {`/employees/${employee.id}`}> 
                <a>{employee.name} - {employee.position}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
      </div>
    );
};

export default EmployeeList;