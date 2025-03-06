"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import employeeApi from "../../api/employee.mjs";
import { useDispatchEmployees, useEmployeeContext,EmployeeProvider } from "../../context/EmployeeContext";
import {InputEmployeeName, InputAddress, InputMail,InputPhonenumber, InputPosition, InputPassword} from "../../components/forms";


const RegisterPage = () => {
    const dispatch = useDispatchEmployees();
    const router = useRouter();
    const [errors, setErrors] = useState("");

    const { handleSubmit, formState: { errors: formErrors}, register } = useForm();

     const onSubmit = async (formData) => { 
        try{    
            const response = await employeeApi.post(formData);

                if(response && response.status === 200 ){ 

                    dispatch({ type: "employee/add", employee:response.data});
                    await router.push("/"); 

                }else{  
                    setErrors("予期しないエラーが発生しました。")
                }
  
            }catch(e) {
                console.log('Error occurred!', e);
                if(e.response && e.response.status === 500){    
                    setErrors("不正なデータです。")
                }else{  
                    setErrors(e.message || "予期しないエラーが発生しました。");
                }};
    };



    return (
        <div>   
        <h1>社員情報登録</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            {errors.message && <div className="error-msg">{errors}</div>}
            
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
