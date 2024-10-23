// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import {BrowserRouter as Router,Route,Routes,Navigate} from 'react-router-dom'
import Employees from './employee/pages/Employee';
import Departments from './department/pages/Department';
import NewEmployee from './employee/pages/Department';
import MainNavigation from './shared/Navigation/MainNavigation';
import Auth from './department/pages/Auth'
import { AuthContext } from './shared/Context/AuthContext';
import { useCallback, useState } from 'react';


function App() {
  const[isLoggedIn,setIsLoggedIn] = useState(false);
  const login = useCallback(()=>{
    setIsLoggedIn(true);
  },[])
  const logout = useCallback(()=>{
    setIsLoggedIn(false);
  },[])

  let routes;
  if(isLoggedIn){
    routes=(
      <Routes>
        <Route path="/" element={<Departments/>}></Route>
          <Route path="*" element={<Navigate to="/"/>}></Route>
          <Route path="/:deptid/employees/" element={<Employees/>}></Route>
          <Route path="/employee/new" element={<NewEmployee/>}></Route>
      </Routes>
    );
  }else{
    routes=(<Routes>
          <Route path="/" element={<Departments/>}></Route>
          <Route path="*" element={<Navigate to="/"/>}></Route>
          <Route path="/:deptid/employees/" element={<Employees/>}></Route>
          <Route path="/auth" element={<Auth/>}></Route>  
    </Routes>);
  }
  return (
    <AuthContext.Provider value={{isLoggedIn:isLoggedIn,login:login,logout:logout}}>

    <Router>
      <MainNavigation/>
      <main>
        {routes}
      </main>
    </Router>
    </AuthContext.Provider>
    

  );
}


export default App;
