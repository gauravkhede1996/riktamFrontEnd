import React from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

function Navbar(props) {
    const navigate = useNavigate();
    const handleCreategroup = () => {
        navigate('/createGroup');
    }
    return (
        <div className='Navbar-Container'>
            <div className='NavbarLogo-Container'>
                <Icon icon="gridicons:chat" width="38" height="38" color="orange"/>
            </div>
            <div className='NavbarIcon-Container'>
                <Icon icon="ci:hamburger-md" width="38" height="38" className='NavbarIcon'/>
                <Icon icon="solar:folder-with-files-bold-duotone" width="38" height="38" className='NavbarIcon'/>
                <Icon icon="uil:setting" width="38" height="38" className='NavbarIcon'/>
                <Icon icon="zondicons:add-solid" width="38" height="38" className='NavbarIcon' onClick={handleCreategroup}/>
                <Icon icon="material-symbols:call" width="38" height="38" className='NavbarIcon'/>
                <Icon icon="iconamoon:profile-fill" width="38" height="38" className='NavbarIcon'/>
            </div>
            
        </div>
    );
}


export default Navbar;