import { useEffect, useState } from 'react';
import { Avatar, styled } from '@mui/material';
import SideBar from '../../components/SideBar';
import { makeStyles } from '@material-ui/core';
import { green } from '@mui/material/colors';
import { relative } from 'path';
import { SchoolNav } from '../../components/SchoolNav';
import { SchoolAvatar } from '../../components/SchoolAvatar';
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
import Layaout from '@/components/Layaout';

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
 
  const router = useRouter()
  useEffect(() => {
    const token = sessionStorage.getItem("userToken")
    if (!token) {
      router.push("/login")
    }
  }, [router]);

  return (
    <Layaout>
      {
        router.asPath === "/dashboard" && <SchoolHome/>
      }
    </Layaout>
  );
};

export default Dashboard