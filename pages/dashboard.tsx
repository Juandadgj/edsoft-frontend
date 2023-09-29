import { useEffect, useState } from 'react';
import { Avatar, styled } from '@mui/material';
import SideBar from '../components/SideBar';
import { makeStyles } from '@material-ui/core';
import { green } from '@mui/material/colors';
import { relative } from 'path';
import { SchoolNav } from '../components/SchoolNav';
import { SchoolAvatar } from '../components/SchoolAvatar';
import { SchoolHome } from '@/components/MainComponents/SchoolHome';
import Settings from '@/components/MainComponents/Settings';
import Teachers from '@/components/MainComponents/Teachers';
import Secretaries from '@/components/MainComponents/Secretaries';
import QualificationType from '@/components/MainComponents/QualificationType';
import SetYear from '@/components/MainComponents/SetYear';
import CopyYear from '@/components/MainComponents/CopyYear';
import CreateCourses from '@/components/MainComponents/CreateCourses';
import Areas from '@/components/MainComponents/Areas';
import Subjects from '@/components/MainComponents/Subjects';
import Achievements from '@/components/MainComponents/Achievements';
import { useRouter } from 'next/router';
import {Enrollment} from '@/components/MainComponents/Enrollment';

const avatarOption = makeStyles(theme => ({
  avatar: {
    backgroundColor: '#fff59d',
    marginTop: 25,
    right: 0,
    left: '20vh',
    position: 'relative',
    width: 106, 
    height: 106
  },
}));

function Dashboard (){
 
  const [active, setActive] = useState(false);
  const [textComponent, setTextComponent] = useState('Inicio');
  const [activeComponent, setActiveComponent] = useState('SchoolHome');
  const router = useRouter()
  useEffect(() => {
    setActive(true);
    const token = sessionStorage.getItem("userToken")
    if (!token) {
      router.push("/login")
    }
  }, []);
  

  const manageComponentStatus = ({ target }: any) => {
    console.log(target.id, target.innerText, target.alt);

    if(target.innerText !== ''){
      setTextComponent(target.innerText);
    }else{
      setTextComponent(target.alt);
    }
    setActiveComponent(target.id);
  };

  const DashOption = styled('h5')(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  }));

  useEffect(() => {
    console.log(activeComponent);
  }, [activeComponent]);
  return (
    <div className='h-screen'>
      
      {
        activeComponent === 'SchoolHome' ? null : <SchoolNav textComponent={textComponent} manage={manageComponentStatus}/>
      }

      {
        activeComponent === 'SchoolHome' ? <SchoolAvatar textComponent={textComponent} homeAvatar={true} manage={manageComponentStatus} /> : null
      }

      <div className={`flex ${activeComponent === 'SchoolHome' ? 'h-full' : 'h-[90%]'} w-full`}>
        {
          activeComponent === 'SchoolHome' ? <SideBar manage={manageComponentStatus} logo={true}/> : <SideBar manage={manageComponentStatus} logo={false}/>
        }
        <div className="bg-blue3 flex flex-col h-full w-full">
          {activeComponent === 'SchoolHome' && <SchoolHome/>}
          {activeComponent === 'Settings' && <Settings />}
          {activeComponent === 'Teachers' && <Teachers />}
          {activeComponent === 'Secretaries' && <Secretaries />}
          {activeComponent === 'QualificationType' && <QualificationType />}
          {activeComponent === 'SetYear' && <SetYear />}
          {activeComponent === 'CopyYear' && <CopyYear />}
          {activeComponent === 'CreateCourses' && <CreateCourses />}
          {activeComponent === 'Areas' && <Areas />}
          {activeComponent === 'Subjects' && <Subjects />}
          {activeComponent === 'Achievements' && <Achievements />}
          {activeComponent === 'Enrollment' && <Enrollment />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard