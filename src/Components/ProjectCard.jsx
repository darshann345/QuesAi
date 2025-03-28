import React from 'react';
import './ProjectCard.css'; 
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const ProjectCard = ({ id,title, files, lastEdited, onCardClick,fileCount }) => {
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

    return (
        <div className="project-card" onClick={handleClick} key={id} id={id}>
            <div className="project-initials">{initials}</div> 
            <div className="project-info">
                <div className="project-title">{title}</div>
                <div className="project-files"><b>{files} files</b></div>
                <div className="project-date">Last edited: {lastEdited}</div>
            </div>
        </div>
    );
};

export default ProjectCard;
