import React, { useState } from 'react';
import firebase from 'firebase';
import { storage,db } from './firebase';
import "./ImageUpload.css";
import { Input, Button } from "@material-ui/core";

function Imageupload( {username}) {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState("");

    const handleChange=(e) =>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }

    };

    //Upload post
    const handleUpload=(e) =>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //Progress function ...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            //Error function ...
            (error) => {
                console.error();
                alert(error.message);
            },
            () =>{
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    setUrl(url);

                    //post imsge inside db
                    db.collection("posts").add({
                        imageUrl: url,
                        caption: caption,
                        username: username,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    });

                    setProgress(0);
                    setCaption("");
                    setImage(null);
                })
            }   
        )
    };

    return (
      /*for make Upload post
        I wanna have .. Caption input, File picker, Post Btton */
        <div className="imageupload">
            <progress className="imageupload__progress" value={progress} max="100" />
            <Input type="text" placeholder='Enter a caption...' 
                onChange={event => setCaption(event.target.value)}
            />
            <input type="file" onChange={handleChange} />
            <Button className="imageupload__button" 
                onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default Imageupload

