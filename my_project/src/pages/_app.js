import '../../styles/global.css';


import { EmployeeProvider } from '../context/EmployeeContext';

function MyApp({ Component, pageProps }) {
  return (  
  <EmployeeProvider>  
    <Component {...pageProps} />
  </EmployeeProvider>
  );
  
}

export default MyApp
