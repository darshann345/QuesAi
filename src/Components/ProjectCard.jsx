import React from 'react';
import './ProjectCard.css'; 
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useEffect } from 'react';


const ProjectCard = ({ id,title, files, lastEdited, onCardClick,onDelete }) => {
    useEffect(()=>{
        console.log(files

        )
    })
    const getInitials = (title) => {
        return title
            .split(' ') 
            .map(word => word.charAt(0).toUpperCase()) 
            .join('');
    };
    const uploadedFiles = JSON.parse(localStorage.getItem('uploadFiles')) || [];
    console.log(uploadedFiles);
    
    const initials = getInitials(title);
    const navigate = useNavigate();

    const handleClick = () => {
        if (onCardClick) {
            onCardClick();

        }
        navigate('/sidebar', { state: { title: title } });

       

    };
    const handleDeleteClick = (event) => {
        event.stopPropagation();
        if(onDelete){
            onDelete()

        }
    };
    

    return (
        <div className="project-card"  onClick={handleClick} key={id} id={id}>
            <div className='project-card-header'>
                <div className="project-initials">{initials}</div>
                <div className="project-info">
                    <div className="project-title">{title}</div>
                    <div className="project-files"><b>{files} files</b></div>
                    <div className="project-date">Last edited: {lastEdited}</div>
                </div>
                <div>

            </div>
            <div className='project-card-footer'>
                <DeleteOutlineIcon style={{position:'relative',left:"10vw"}} onClick={handleDeleteClick}/>

            </div>
           

            </div>
        </div>
    );
};

export default ProjectCard;
