import React, { createContext, useState, useContext } from "react";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);

    const addEmployee = (employee) => {
        setEmployees((prevEmployees) => [...prevEmployees, employee]);
    };

    return (
        <EmployeeContext.Provider value={{ employees, addEmployee }}>
            {children}
        </EmployeeContext.Provider>
    );
};

export const useEmployeeContext = () => {   
    return useContext(EmployeeContext);
};