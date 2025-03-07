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
     
          const res = await fetch(`http://localhost:5000/api/employees/${id}`);

          try{  
           if(res.status === 404 ){  
              setError("社員情報が見つかりません")
            }else if (res.status === 500 ){ 
              setError("サーバーエラーが発生しました")
            }else if (!res.ok){ 
              throw new Error(`Error: ${res.status} ${res.statusText}`)
            }
      
              const data = await res.json();
              setEmployee(data);
            } catch (error) {
              console.log("ステータス：", error.message);
            }
          };
      
          fetchEmployee();
        }
      , [id]); 

      const clickHandler = () => {  
        router.push('/');
      };
      
      
        

    if (error) return <p>{error}</p>; 
    if (!employee) return <p>社員情報が見つかりません。</p>; 

    return (    
        <div>   
            <h1>{employee.employeeName} さんの詳細情報</h1>
            <p>ID：{employee.id}</p>
            <p>名前： {employee.employeeName}</p>
            <p>住所： {employee.address}</p>
            <p>メールアドレス：{employee.mail}</p>
            <p>携帯番号： {employee.phone_number}</p>
            <p>役職： {employee.position}</p>
            <p>パスワード： {employee.password}</p>

          <div>
            <button onClick={clickHandler}>一覧ページに戻る</button>
          </div>
            
        </div>
    );
};

export default EmployeeDetail;