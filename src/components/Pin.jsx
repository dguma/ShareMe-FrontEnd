import React, {useState} from 'react';
import { client, urlFor } from '../client';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';


const Pin = ({ pin: { postedBy, image, _id, destination } }) => {

    const [postHovered, setPostHovered] = useState(false);
    const [savingPost, setSavingPost] = useState(false);

    const navigate = useNavigate();

  return (
    <div className='m-2' >
        <div
            onMouseEnter={() => setPostHovered(true)}
            onMouseLeave={() => setPostHovered(false)}
            onClick={() => navigate(`/pin-detail/${_id}`)}
            className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
            >
            <img className='rounded-lg w-full' alt='user-post' src={urlFor(image).width(250).url()} />
        </div>

        {postHovered && (
            <div 
                className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
                style={{height: '100%'}}
                >
                    <div className='flex items-center justify-between' >
                        <div className='flex gap-2' >
                            <a
                                href={`${image?.asset?.url}?dl=`}
                                download
                                onClick={(e) => e.stopPropagation}
                                className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75'
                                >
                                <MdDownloadForOffline />
                            </a>
                        </div>
                    </div>
            </div>
        )}

      
    </div>
  )
}

export default Pin
