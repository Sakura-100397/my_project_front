"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import employeeApi from "../../api/employee.mjs";
import { useDispatchEmployees, useEmployeeContext,EmployeeProvider } from "../../../context/EmployeeContext";
import { InputName, InputAddress, InputMail,InputPhonenumber, InputPosition, InputPassword} from "../components/forms" ;



const RegisterPage = () => {
    const dispatch = useDispatchEmployees();
    const navigate = useNavigate();
    const [errors, setErrors] = useState("");

    const { handleSubmit, formState: { errors: formErrors} } = useForm();

     const onSubmit = (formData) => {
        employeeApi.post(formData)
            .then((_newEmployee) => {
                dispatch({ type: "employee/add", employee: _newEmployee });
                navigate("/employees");  
            })
            .catch((e) => {
                console.log('Error occurred!', e);
                setErrors(e.response?.data?.msg || "予期しないエラーが発生しました。"); 
            });
    };



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {errors.message && <div className="error-msg">{errors}</div>}
            
            <InputName register={onFormChange} errors={errors} />
            <InputAddress register={onFormChange} errors={errors} />
            <InputMail register={onFormChange} errors={errors} />
            <InputPhonenumber register={onFormChange} errors={errors} />
            <InputPosition register={onFormChange} errors={errors} />
            <InputPassword register={onFormChange} errors={errors} />
            
            <button type="submit">登録</button>
        </form>
    );
};

export default RegisterPage;
