import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';
import OnlinePeopleContainer from './OnlinePeopleContainer';
import UserSelector from './UserSelector';
import './index.css'

function ProfileContainer(props) {
    const {allGroups, setChatroom, chatroom, email, socket, allUsers,setFriendEmail} = props;
    useEffect( () => {
        console.log(allGroups," is allGroups in profile Container");
    },[])
    return (
        <div className='Profile-Container'>
            <div className='Heading-Container'>
                <div className='Heading'>
                    <h1> Messages</h1>
                </div>
                <div className='HeadingIcon'>
                    <Icon icon="bx:edit" width="26" height="26" className='SearchIcon'/>
                    <Icon icon="iconamoon:search-duotone" width="26" height="26" className='SearchIcon'/>
                </div>
            {/* rgb(22,82,242) */}
            </div>
            <div className='Online-List'>
                <div className='OnlineNow-Heading'>
                <div className='OnlineList-Heading-Container'>
                    Online Now
                </div>
                <div className='SeeAll-Container'><a className='See-All-Button'> See All</a></div>
                </div>
                <div className='OnlineNow-People-List-Container'>
                    <OnlinePeopleContainer />
                    <OnlinePeopleContainer />
                    <OnlinePeopleContainer />
                    <OnlinePeopleContainer />
                    <OnlinePeopleContainer />
                </div>
            </div>
            <div className='PinnedMessage-Container'>
                <div className='PinnedMessage-Heading-Container'>
                    <Icon icon="fluent-mdl2:pinned-solid" />
                    &nbsp; All Groups
                </div>
                <div className='User-Selector-Container'>
                    { allGroups.map( item => {
                        return <UserSelector groupName ={item.admin.name} chatroom={item.chatroom} setChatroom={setChatroom} email={email} socket={socket}/>
                    })}
                </div>
            </div>
            <div className='All-Messages-Container'>
            <div className='PinnedMessage-Heading-Container'>
                <Icon icon="mdi:message" />
                    &nbsp; All Messages
            </div>
            <div className='User-Selector-Container'>
            { allUsers.map( item => {
                        return <UserSelector groupName ={item.name} chatroom={item.email.split("@")[0]+"_"+email.split("@")[0]} setChatroom={setChatroom} email={email} socket={socket} individual={true} setFriendEmail={setFriendEmail} friendEmail={item.email}/>
                    })}
            </div>
            </div>
        </div>
    );
}

export default ProfileContainer;