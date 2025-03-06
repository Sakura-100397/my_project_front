import  { createContext, useContext, useReducer } from "react";

const initialState = { employees:[]};

const reducer = (employees, action) => {  
  switch(action.type){  
    case "employee/init":
      return action.employees;

      case "employee/add":
      return [ action.employee, employees];

      default:
        return employees;
     }
};

const EmployeeContext = createContext();
const EmployeeDispatchContext = createContext();

const useEmployees = () => useContext(EmployeeContext);
const useDispatchEmployees = () => useContext(EmployeeDispatchContext);




 const EmployeeProvider = ({ children }) => {
  const [employees, dispatch] = useReducer(reducer, initialState);

  return (
    <EmployeeContext.Provider value={employees}>
      <EmployeeDispatchContext.Provider value={dispatch}>
        {children}
      </EmployeeDispatchContext.Provider>
    </EmployeeContext.Provider>
  );
};

export { useEmployees, useDispatchEmployees, EmployeeProvider };