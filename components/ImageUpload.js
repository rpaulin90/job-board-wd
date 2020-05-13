import React, { useState } from "react";
import firebase from "firebase";
import { Button } from 'semantic-ui-react'


const ImageUpload = (props) => {



    const handleChange = (e) => {

       props.handleChange(e)

    };

    const handleUpload = (e) => {
        props.handleUpload(e)
    }

    return (

        <div>
            <progress value={props.progress} max='100'/>
            <br/>
            <input type="file" accept="image/*" onChange={handleChange}/>
            <button style={{backgroundColor: 'transparent', border: 'solid'}} onClick={handleUpload}>Upload</button>
            <br/>
            <img style={{marginTop: '20px', border: 'solid'}} src={props.url || 'https://via.placeholder.com/200x200'} alt="Uploaded Image" height="200" width="200"/>
        </div>

    )

}

export default ImageUpload