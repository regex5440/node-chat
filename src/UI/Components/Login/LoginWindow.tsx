import { NavLink, Outlet } from 'react-router-dom';
import Header from '../../common/Header';
import './style/index.sass'

export default function LoginWindow() {


  return <div className='login__container'>
      <Header/>
      <div className='login__tab'>
        <NavLink to='/login' className='login_head tab'>Login</NavLink>
      |
        <NavLink to='/signup' className='signup_head tab'>Sign Up</NavLink>
      </div>
      <Outlet/>
    </div>;
}
