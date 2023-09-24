import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MainContainer from "./MainContainer";
import Login from "./Login";
import { io } from 'socket.io-client';
import { Routes, Route} from 'react-router-dom';
import { useState } from 'react';

const server = 'http://localhost:5000';
const connectionOptions = {
  "force new connection" : true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"]
}
const socket = io(server,connectionOptions);

function App() {
  const [user, setUser] = useState({email:'', password:''});
  const [signupUser,setSignupUser] = useState({name:'', email:'', password: '', age: ''})
  return (
    <div className="App">
      <Routes>
      <Route path="/" >
        <Route path="/" element={ <MainContainer socket={socket} email={user.email} user={user} isChatProfile={true}/>}/>
        <Route path="/login" element = {<Login user={user} setUser={setUser} signupUser={signupUser} setSignupUser={setSignupUser}/>} />
        <Route path='/createGroup' element= {<MainContainer socket={socket} email={user.email} user={user} isChatProfile={false}/> } />
        <Route path='/:chatroomName' element={<MainContainer socket={socket} email={user.email} user={user} isChatProfile={true}/>} />
      </Route>
      </Routes>
    </div>
    
  );
}

export default App;
