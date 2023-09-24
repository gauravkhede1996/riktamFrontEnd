import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import ChatProfile from "./ChatProfile";
import ProfileContainer from "./ProfileContainer";
import CreateGroup from './CreateGroup';
import { useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function MainContainer(props) {
  const { chatroomName } = useParams();
  const { socket,email, user, isChatProfile} = props;
  const [allGroups,setAllGroups] =useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [chatroom, setChatroom] = useState(chatroomName);
  const [friendEmail, setFriendEmail] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (email=== '') {
      navigate('/login')
    }
    socket.emit('join_room', {
      email,
      chatRoom:chatroom?chatroom:'chat'
    })
    socket.on('user_joined',function(data){
      console.log('a user joined!',data.chatRoom);
    })
  },[chatroom]);

  useEffect( () => {
    fetch(`http://127.0.0.1:8000/allGroups/${email}`, {
            method:'GET',
        })
        .then(response => response.json())
        .then((data) => {
          console.log(data.allGroups," is the data.allUsers");
            setAllGroups(data.allGroups);
        })
  },[chatroomName])

  useEffect( () => {
    fetch('http://127.0.0.1:8000/allUsers', {
            method:'GET',
        })
        .then(response => response.json())
        .then((data) => {
          console.log(data.allUsers," is the data.allUsers");
            setAllUsers(data.allUsers);
        })
  },[]);

    return (
        <div className="Main-Container">
        <Navbar />
        <ProfileContainer email={email} allGroups={allGroups} setChatroom={setChatroom} chatroom={chatroom} socket={socket} allUsers={allUsers} setFriendEmail={setFriendEmail} friendEmail={friendEmail}/>
        { isChatProfile && <ChatProfile email={email} socket={socket} chatroom={chatroom} friendEmail={friendEmail} allUsers={allUsers}/>}
        { !isChatProfile && <CreateGroup email={email} socket={socket} user={user} allUsers={allUsers}/>}
        
      </div>
    );
}

export default MainContainer;