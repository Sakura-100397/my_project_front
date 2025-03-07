"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import employeeApi from "../../api/employee.mjs";
import { useDispatchEmployees } from "../../context/EmployeeContext";
import {InputEmployeeName, InputAddress, InputMail,InputPhonenumber, InputPosition, InputPassword} from "../../components/forms";


const RegisterPage = () => {
    const dispatch = useDispatchEmployees();
    const router = useRouter();


    const { handleSubmit, formState: { errors }, register } = useForm({  
         criteriaMode: "all",
         mode: "onSubmit",
         reValidateMode: "onSubmit",    
        });
        
    const [error, setError] = useState("");
     const onSubmit = async (formData) => { 
        try{  
            const response = await employeeApi.post(formData);
              
                if(response.status === 200 ){ 

                    dispatch({ type: "employee/add", employee:response.data});
                    await router.push("/"); 
                }
           
            }catch(error) {
                console.log(error)
                if( error.status === 400){
                    setError("不正な入力値です")
                
                }else if(error.status === 500){    
                    setError("登録に失敗しました")
                   
                }else{  
                    console.error(error);
                    setError(error.message || "予期しないエラーが発生しました。"); 
                }}
            
            };
           

    return (
        <div>   
        <h1>社員情報登録</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            {errors && <div className="error-msg">{error}</div>}
            
            <InputEmployeeName register={register} errors={errors} />
            <InputAddress register={register} errors={errors} />
            <InputMail register={register} errors={errors} />
            <InputPhonenumber register={register} errors={errors} />
            <InputPosition register={register} errors={errors} />
            <InputPassword register={register} errors={errors} />
            
            <button type="submit">登録</button>
        </form>
        </div>
    );
};

export default RegisterPage;
