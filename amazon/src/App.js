import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout';
import Login from './components/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useEffect} from 'react';
import {auth} from './firebase'
import {useStateValue} from './StateProvider';

function App() {
  const[{}, dispatch] = useStateValue();
  useEffect(()=>{
    auth.onAuthStateChanged(authUser => {
      console.log(`현재 사용자 ${authUser}`);
      if(authUser) {
        dispatch({
          type:'SET_USER',
          user : authUser
        })

      } else {
          dispatch({
            type : 'SET_USER',
            user : null
          })
      }
    })
  },[])
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path="/checkout" element={<Checkout/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
