import { useState } from 'react';

const useValidation = () => {   
const [ error, setError ] = useState("");

const validate = ( name, address, mail, phone_number, position, password ) => { 
    if (!name || !address || !mail || !phone_number || !position|| !password ){ 
        setError("すべて入力してください");
        return false;
    }
    setError("");
    return true;
};

return { error, validate };

};

export default useValidation;