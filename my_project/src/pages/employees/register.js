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
    const [errors, setErrors] = useState("");

    const { handleSubmit, formState: { errors: formErrors}, register } = useForm();

     const onSubmit = async (formData) => { 
        try{    
            const response = await employeeApi.post(formData);
             
                if(response && e.status === 200 ){ 

                    dispatch({ type: "employee/add", employee:response.data});
                    await router.push("/"); 
                }
           
            }catch(e) {
                if( e.status === 400){
                    setErrors("不正な入力値です")
                
                }else if(e.status === 500){    
                    setErrors("登録に失敗しました")
                   
                }else{  
                    console.error(errors);
                    setErrors(e.message || "予期しないエラーが発生しました。"); 
                }}
            
            };
           

    return (
        <div>   
        <h1>社員情報登録</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            {errors && <div className="error-msg">{errors}</div>}
            
            <InputEmployeeName register={register} errors={formErrors} />
            <InputAddress register={register} errors={formErrors} />
            <InputMail register={register} errors={formErrors} />
            <InputPhonenumber register={register} errors={formErrors} />
            <InputPosition register={register} errors={formErrors} />
            <InputPassword register={register} errors={formErrors} />
            
            <button type="submit">登録</button>
        </form>
        </div>
    );
};

export default RegisterPage;
