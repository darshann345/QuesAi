import { clear } from '@testing-library/user-event/dist/clear';
import './Modal.css';
import { useEffect, useState } from "react";


const Modal = ({ isOpen, onClose, onProjectCreated }) => {
    const [projectName, setProjectName] = useState('');
    const [error, setError] = useState(true);

    useEffect(()=>{
        if(isOpen){
            setProjectName('')
        setError(true)
        }
    },[isOpen])
    const handleCreateProject = () => {
        if (projectName.trim() === '') {
            setError(true); 

        } else {
            setError(false); 
            onProjectCreated(projectName); 
        }
    };

    const handleChange = (e) => {
        setProjectName(e.target.value);
        if (e.target.value.trim() !== '') {
            setError(false); 
        } else {
            setError(true);
        }
       
       
    };

    return (
        isOpen && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>Create Project</h2>
                    <label style={{ fontSize: "18px" }}>
                        Enter Project Name:
                    </label>
                    <br />
                    <br />
                    <input
                        type="text"
                        placeholder="Type here"
                        style={{ width: "50vw", height: "50px", borderRadius: "10px" }}
                        value={projectName}
                        onChange={handleChange} 
                    />
                    {error && <p className="error-message">Project Name Can't be empty</p>}
                    <div className="modal-buttons">
                        <button onClick={onClose} style={{ border: 'none', backgroundColor: "white", color: "red" }}>Cancel</button>
                        <button onClick={handleCreateProject} style={{ width: "90px", height: "30px", backgroundColor: "#6a1b9a", border: "1px solid #6a1b9a", color: "white", borderRadius: "9px" }}>Create</button>
                    </div>
                </div>
            </div>
        )
    );
};

export default Modal;