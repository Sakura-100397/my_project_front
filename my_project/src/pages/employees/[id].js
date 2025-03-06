import { useEffect, useState } from "react";
import { useRouter} from 'next/router';
import Link from "next/link";

const EmployeeDetail = () =>   {    
    const [ employee, setEmployee] = useState(null);
    const [ error , setError ] = useState(null);
    const router = useRouter();
    const { id } = router.query;


    useEffect(() => {  
        if (!id) return;

        const fetchEmployee = async () => { 
          try{  

          const res = await fetch(`http://localhost:5000/api/employees/${id}`);

            if (!res.ok) {
                throw new Error(`Error: ${res.status} ${res.statusText}`);
              }
      
              const data = await res.json();
              console.log('Fetched Employee Data:', data);
              setEmployee(data);
            } catch (error) {
              console.error('Error fetching employee details:', error);
              setError('社員情報の取得に失敗しました。')
            }
          };
      
          fetchEmployee();
        }
      , [id]); 
      
        

    if (error) return <p>{error}</p>; 
    if (!employee) return <p>社員情報が見つかりません。</p>; 

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

            <Link href = '/'>  
            <a>一覧ページに戻る</a>
            </Link>
            
        </div>
    );
};

export default EmployeeDetail;