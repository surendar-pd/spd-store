import './App.css';
import {useState} from 'react';
import Login from './components/Login';
import Home from './components/Home';
import {auth,db} from './firebase';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const signOut = () =>{
    auth.signOut().then(()=>{
    localStorage.removeItem('user')
    setUser(null);
    window.location.href = '/';
  })
}
  return (
    <div>
      {/* {
        !user ?
        <Login setUser={setUser}/>
        :
        <Home user={user} signOut={signOut}/>
      } */}
      <Home user={user} signOut={signOut}/>
    </div>
  );
}

export default App;

