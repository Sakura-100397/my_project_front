import { useState } from 'react';

const useValidation = () => {   
const [ errors, setErrors ] = useState("");

const validate = ( name, address, mail, phone_number, position, password ) => { 
    let newErrors = [];

    if (!name || !address || !mail  || !phone_number || !position || !password ){ 
        setErrors(["すべて入力してください"]);
        return false;
    }
    setErrors([]);
    return true;
};

return { errors, setErrors, validate };

};

export default useValidation;