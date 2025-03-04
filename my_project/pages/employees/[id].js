import { useEffect, useState } from "react";
import { useRouter} from 'next/router';

const EmployeeDetail = () =>   {    
    const [ employee, setEmployee] = useState(null);
    const router = useRouter();
    const { id } = router.query;


    useEffect(() => {  
        if (employee && employee.id) {
          async function fetchEmployee() {
            try {
                const res = await fetch(`http://localhost:5000/employees/${employee.id}`);
      
              if (!res.ok) {
                throw new Error(`Error: ${res.status} ${res.statusText}`);
              }
      
              const data = await res.json();
              console.log('Fetched Employee Data:', data);
              setEmployee(data);
            } catch (error) {
              console.error('Error fetching employee details:', error);
            }
          }
      
          fetchEmployee();
        }
      }, [employee]); 
      
        

    if (!employee) {    
        return <p>Loading...</p>; 
    }
    return (    
        <div>   
            <h1>{employee.name} さんの詳細情報</h1>
            <p>ID：{employee.id}</p>
            <p>名前： {employee.name}</p>
            <p>住所： {employee.address}</p>
            <p>メールアドレス：{employee.mail}</p>
            <p>携帯番号： {employee.phone_number}</p>
            <p>役職： {employee.position}</p>
            <p>パスワード： {employee.password}</p>

            <Link href = '/employees'>  
            <a>一覧ページに戻る</a>
            </Link>
            
        </div>
    );
};

export default EmployeeDetail;