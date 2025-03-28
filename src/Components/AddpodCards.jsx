import React, { useState } from 'react';
import { Card, CardContent, Typography, CardMedia, Grid, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import yt from "./../assets/yt.png";
import rss from "./../assets/Rssfeed.png";
import uploadFiles from "./../assets/upload.png";

const AddpodCards = ({ onUploadStatusChange }) => {
    const [isOpen, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [projectName, setProjectName] = useState('');
    const [transcript, setTranscript] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);

    const items = [
        {
            title: 'RSS Feed',
            description: 'Lorem ipsum dolor sit. Dolor lorem sit.',
            icon: rss,
        },
        {
            title: 'YouTube Video',
            description: 'Lorem ipsum dolor sit. Dolor lorem sit.',
            icon: yt,
        },
        {
            title: 'Upload Files',
            description: 'Lorem ipsum dolor sit. Dolor lorem sit.',
            icon: uploadFiles,
        }
    ];

    const handleClick = (item) => {
        setSelectedItem(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedItem(null);
    };

    const handleProjectNameChange = (e) => {
        setProjectName(e.target.value);
    };

    const handleTranscriptChange = (e) => {
        setTranscript(e.target.value);
    };
    const handleUpload = (e) => {
        e.preventDefault();
        setTranscript('')
        setProjectName('')
        setIsUploaded(true)
        setOpen(false)
        onUploadStatusChange(projectName, transcript)
    }

    return (
        <>
            <Grid container spacing={3} justifyContent="center" sx={{ paddingTop: 5 }}>
                {items.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Card sx={{ height: 150, width: 400, boxShadow: 3, borderRadius: 2 }}>
                            <div style={{ display: "flex", justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row-reverse' }}>
                                <CardMedia
                                    component="img"
                                    image={item.icon}
                                    alt={item.title}
                                    sx={{ width: 50, height: 50, marginRight: 2 }}
                                    onClick={() => handleClick(item)}
                                />
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginRight: "150px" }}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.description}
                                    </Typography>
                                </CardContent>
                            </div>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {selectedItem && items && (
                <Dialog
                    open={isOpen}
                    onClose={handleClose}
                    maxWidth="lg"
                    fullWidth={true}
                    sx={{ height: '600px' }}
                >
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <DialogTitle>
                            Upload from {selectedItem.title}
                            <img src={selectedItem.icon} alt={selectedItem.title} style={{ width: 30, height: 30, marginLeft: 10 }} />
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={handleClose} color="black">
                                X
                            </Button>
                        </DialogActions>
                    </div>

                    <DialogContent>
                        <label>Name</label><br />
                        <br />
                        <input
                            type="text"
                            placeholder="Enter project name"
                            style={{ width: "50vw", height: "50px", borderRadius: "10px" }}
                            value={projectName}
                            onChange={handleProjectNameChange}
                        />
                        <br />
                        <br />
                        <label>Transcript</label><br />
                        <br />
                        <textarea
                            placeholder="Enter transcript"
                            style={{ width: "50vw", height: "100px", borderRadius: "10px" }}
                            value={transcript}
                            onChange={handleTranscriptChange}
                            rows={5}
                        />
                        <br />
                        <button
                            style={{
                                display: "flex",
                                backgroundColor: "black",
                                color: "white",
                                marginLeft: "1000px",
                                height: "40px",
                                width: "100px",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                                borderRadius: "25px"
                            }}
                            onClick={handleUpload}
                        >
                            Upload
                        </button>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};

export default AddpodCards;
