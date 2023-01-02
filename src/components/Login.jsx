import GoogleLogin from '@leecheuk/react-google-login'
import {gapi} from 'gapi-script';
import { useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'

import { client } from '../client';

const Login = () => {
    const navigate = useNavigate();
    const clientId = process.env.REACT_APP_GOOGLE_API_TOKEN

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient)
    })

    // const responseGoogle = (response) => {
    //     console.log(response)
    // }
    const onSuccess = (res) => {
        console.log('success:', res);
        localStorage.setItem('user', JSON.stringify(res.profileObj))

        const { name, googleId, imageUrl } = res.profileObj;

        const doc = {
            _id: googleId,
            _type: 'user',
            userName: name,
            image: imageUrl,
        }

        client.createIfNotExists(doc)
            .then(() => {
                navigate('/', { replace: true } )
            })
    };
    const onFailure = (err) => {
        console.log('failed:', err);
    };

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
        <div className='relative w-full h-full'>
            <video
                src={shareVideo}
                type='video/mp4'
                loop 
                controls={false}
                muted
                autoPlay
                className='w-full h-full object-cover' 
            />

        </div>
      <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay' >
        <div className='p-5'>
            <image src={logo} width='130px' alt='logo' />
        </div>

        <div className='shadow-2x1'>
            <GoogleLogin
                clientId={clientId}
                buttonText='Sign in with Google'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
                // render={(renderProps) => (
                //     <button 
                //         type='button'
                //         className='bg-miniColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
                //         onClick={renderProps.onClick}
                //         disabled={renderProps.disabled}
                //     >
                //         <FcGoogle className='mr-4' />
                //     </button>    
                // )}
            />
        </div>
      </div>
    </div>
  )
}

export default Login
