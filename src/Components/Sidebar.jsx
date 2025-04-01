import React, { useState, useEffect } from 'react';
import {
  Drawer, List, ListItem, ListItemText, IconButton, Box, Table, TableHead, TableRow, TableCell,
  TableBody, Button, TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DiamondIcon from '@mui/icons-material/Diamond';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Logo from './../assets/Logo.png';
import './Main.css';
import UserProfileLogo from "./../assets/UserProfileLogo.png";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LogoutIcon from '@mui/icons-material/Logout';
import SimpleBottomNavigation from './SimpleBottomNavigation';
import AddpodCards from './AddpodCards';
import FileUploader from './FileUploader';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ fileCount }) => {
  const [open, setOpen] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [transcriptText, setTranscriptText] = useState("");
  const [isViewingFile, setIsViewingFile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  const projectTitle = location.state?.title || "";
  const navigate = useNavigate()

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleView = (file) => {
    setSelectedFile(file);
    setTranscriptText(file.transcript || "");
    setIsViewingFile(true);
    setIsEditing(false);
  };

  const handleUploadStatusChange = (uploadedProjectName, transcript) => {
    if (!uploadedProjectName) return;

    const newFile = {
      id: uploadedFiles.length + 1,
      name: uploadedProjectName,
      transcript: transcript || "",
      uploadDate: new Date().toLocaleDateString('en-GB'),
      uploadTime: new Date().toLocaleTimeString(),
    };

    const updatedFiles = [...uploadedFiles, newFile];
    setUploadedFiles(updatedFiles);
    localStorage.setItem(`uploadedFiles_${projectTitle}`, JSON.stringify(updatedFiles));

    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const updatedProjects = storedProjects.map(project =>
      project.title === uploadedProjectName
        ? { ...project, files: (project.files || 0) + 1 }
        : project
    );

    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };
  const handleClick = () =>{
    navigate('/')
  }

  const handleSave = () => {
    setUploadedFiles(prevFiles =>
      prevFiles.map(file =>
        file.id === selectedFile.id ? { ...file, transcript: transcriptText } : file
      )
    );
    setSelectedFile(null);
    setIsViewingFile(false);
    setIsEditing(false);
    localStorage.setItem(`uploadedFiles_${projectTitle}`, JSON.stringify(uploadedFiles));
  };

  const handleCancelView = () => {
    setSelectedFile(null);
    setIsViewingFile(false);
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    const updatedFiles = uploadedFiles.filter(file => file.id !== id);
    setUploadedFiles(updatedFiles);

    if (updatedFiles.length === 0) {
      setIsViewingFile(false);
    }
    localStorage.setItem(`uploadedFiles_${projectTitle}`, JSON.stringify(updatedFiles));
  };

  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem(`uploadedFiles_${projectTitle}`));
    if (savedFiles) {
      setUploadedFiles(savedFiles);
    } else {
      setUploadedFiles([]);
    }
  }, [projectTitle]);

  useEffect(() => {
    if (uploadedFiles.length > 0) {
      localStorage.setItem(`uploadedFiles_${projectTitle}`, JSON.stringify(uploadedFiles));
    }
  }, [uploadedFiles, projectTitle]);

  return (
    <>
      <Box>
        <div className="app-container">
          <header className="app-header">
            <h1 className="app-title">Ques.AI</h1>
            <div>
              <SimpleBottomNavigation />
            </div>
            <div className="icon-container">
              <span className="notification-icon"><NotificationsNoneIcon /></span>
              <span className="settings-icon"></span>
              <LogoutIcon style={{ color: "red", width: "50px", height: "30px" }} onClick={handleClick}/>
            </div>
          </header>

          <main>
            {!isViewingFile && <AddpodCards onUploadStatusChange={handleUploadStatusChange} />}

            {!isViewingFile && uploadedFiles.length === 0 && <FileUploader />}

            {isViewingFile ? (
              <>
                <Box style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                  <div>
                    <KeyboardBackspaceIcon sx={{ position: 'relative', right: '600px' }} />
                    <h2 style={{ position: 'relative', right: "570px", marginTop: "-30px", marginLeft: "200px" }}>
                      Edit Transaction
                    </h2>
                  </div>

                  <div style={{ position: "relative", left: "660px" }}>
                    {!isEditing ? (
                      <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
                        Edit
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ marginRight: 1 }}
                          onClick={handleSave}
                          disabled={!transcriptText.trim()}
                        >
                          Save
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleCancelView}>
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </Box>

                {isEditing && (
                  <TextField
                    multiline
                    rows={30}
                    fullWidth
                    placeholder="Edit your transcript here..."
                    value={transcriptText}
                    onChange={(e) => setTranscriptText(e.target.value)}
                    sx={{ maxWidth: "85vw", marginLeft: "248px", maxHeight: "280px" }}
                  />
                )}
              </>
            ) : (
              uploadedFiles.length > 0 && (
                <Box sx={{
                  position: "relative",
                  left: "310px",
                  border: "1px solid silver",
                  width: "65.5vw",
                  borderRadius: "15px",
                  top: "10px"
                }}>
                  <h3 style={{ position: "relative", right: "580px" }}>Your Files</h3>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>No.</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Date & Time</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {uploadedFiles.map((file) => (
                        <TableRow key={file.id}>
                          <TableCell>{file.id}</TableCell>
                          <TableCell>{file.name}</TableCell>
                          <TableCell>{file.uploadDate} | {file.uploadTime}</TableCell>
                          <TableCell>
                            <Button size="small" onClick={() => handleView(file)}>View</Button>
                            <Button size="small" color="error" onClick={() => handleDelete(file.id)}>Delete</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              )
            )}
          </main>
        </div>

        <Box>
          {!open ? (
            <IconButton
              onClick={toggleDrawer}
              sx={{
                position: 'absolute',
                left: '0px',
                top: '200px',
                zIndex: 1200,
              }}
            >
              <KeyboardDoubleArrowLeftIcon sx={{
                position: "relative",
                left: "0px",
                border: "1px solid #6A1B94",
                borderRadius: "25px",
                zIndex: "3",
                color: "#6A1B94",
                top: "300px"
              }} />
            </IconButton>
          ) : (
            <Drawer
              sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: 240,
                  boxSizing: 'border-box',
                  backgroundColor: 'white',
                },
              }}
              variant="persistent"
              anchor="left"
              open={open}
            >
              <List>
                <ListItem style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
                  <img src={Logo} alt="Log" width="30px" />
                  <h3 style={{ color: "#6A1B94" }}><b>Ques.</b>AI</h3>
                </ListItem>
                <ListItem button style={{ color: "#6A1B94" }}>
                  <AddIcon />
                  <ListItemText primary="Add your Podcast(s)" />
                </ListItem>
                <ListItem button>
                  <ModeEditOutlineIcon />
                  <ListItemText primary="Create & Repurpose" />
                </ListItem>
                <ListItem button>
                  <ContentCopyIcon />
                  <ListItemText primary="PodCast Widget" />
                </ListItem>
                <ListItem button>
                  <DiamondIcon />
                  <ListItemText primary="Update" />
                </ListItem>
              </List>
            </Drawer>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;