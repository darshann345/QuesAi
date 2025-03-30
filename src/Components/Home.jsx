import React, { useState, useEffect } from 'react';
import './Home.css';
import HomeImage from "./../assets/Home.png"; 
import Modal from "./Modal";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box } from '@mui/material';
import ProjectCard from './ProjectCard';

const Home = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
        const uploadedFiles = {};

        Object.keys(localStorage).forEach(key => {
            if (key.startsWith("uploadedFiles_")) {
                const projectName = key.replace("uploadedFiles_", "");
                const files = JSON.parse(localStorage.getItem(key)) || [];
                uploadedFiles[projectName] = files.length;
            }
        });

        const updatedProjects = savedProjects.map(project => ({
            ...project,
            files: uploadedFiles[project.title] || 0, 
        }));

        setProjects(updatedProjects);
        console.log(updatedProjects)
    }, []);
    

    const handleProjectCreated = (projectName) => {
        const newProjectDetails = {
            title: projectName,
            files: 0,
            lastEdited: new Date().toLocaleDateString()
        };
        const updatedProjects = [...projects, newProjectDetails];
        setProjects(updatedProjects);
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
        setModalOpen(false);
    };

    const handleDeleteProject = (projectTitle) => {
        const updatedProjects = projects.filter(project => project.title !== projectTitle);
        setProjects(updatedProjects);
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
    };
    

    return (
        <div className="app-container">
            <header className="app-header">
                <h1 className="app-title">Ques.AI</h1>
                <div className="icon-container">
                    <span className="notification-icon">🔔</span>
                    <span className="settings-icon">⚙️</span>
                </div>
            </header>

            {projects.length === 0 ? (
                <main className="main-content">
                    <h2 className="project-title">Create a New Project</h2>
                    <img src={HomeImage} alt="Home" className="home-image" />
                    <p className="project-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                    </p>
                    <button className="create-project-button" onClick={() => setModalOpen(true)}>
                        + Create New Project
                    </button>
                </main>
            ) : (
                <Box>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", marginLeft: "85vw" }}>
                        <button
                            className="create-project-button"
                            style={{
                                position: "relative",
                                margin: "0 auto",
                                backgroundColor: "black",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                width: "300px",
                                marginLeft: "50px",
                                gap: "10px"
                            }} 
                            onClick={() => setModalOpen(true)}
                        >
                            <AddCircleOutlineIcon /> Create New Project
                        </button>
                    </Box>
                    <div className="project-card-container">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key = {index}
                                id={index}
                                title={project.title}
                                files={project.files}  
                                lastEdited={project.lastEdited}
                                onDelete={() => handleDeleteProject(project.title)}
                            />
                        ))}
                    </div>
                </Box>
            )}

    <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onProjectCreated={handleProjectCreated}  />
        </div>
    );
};

export default Home;
