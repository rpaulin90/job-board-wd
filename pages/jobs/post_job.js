import "../../css/main.css";
import React, { useState } from "react";
import firebase from "firebase";
//import firebase from "firebase/app";
import Link from "next/link";
import Router from "next/router";
import initFirebase from "../../utils/auth/initFirebase";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Layout from "../../components/Layout"
import ImageUpload from "../../components/ImageUpload"
import RichTextEditor from "../../components/RichTextEditor"

import { Button } from 'semantic-ui-react'


initFirebase();


const JobsCreate = (props) => {


    const initial = {
        job_title: "",
        company_name: "",
        location: "",
        category: "",
        time: "",
        link:""
    };

    const [inputs, setInputs] = useState(initial);
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [url, setURL] = useState(null);
    const [description, setDescription] = useState('');
    var firstInput = null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (inputs.job_title.length === 0) {
                throw `job title can't be empty`;
            } else if (inputs.company_name.length === 0) {
                throw `company name can't be empty`;}
                else if (inputs.location.length === 0) {
                throw `location can't be empty`;}
                else if (inputs.category.length === 0) {
                throw `category can't be empty`;}
                else if (inputs.time.length === 0) {
                throw `time type can't be empty`;}
                else if (inputs.link.length === 0) {
                throw `application link can't be empty`;
            } else if (url === null) {
                throw `logo can't be empty`;
            }
            const db = firebase.firestore();
            const ref = db.collection("jobs");
            console.log(ref)
            await ref.add({
                job_title: inputs.job_title,
                company_name: inputs.company_name,
                location: inputs.location,
                category: inputs.category,
                time: inputs.time,
                logo: url,
                description: description,
                link: inputs.link
            });
            Router.push("/jobs");
        } catch (error) {
            alert(error);
        }
    };

    const handleInputChange = (e) => {
        e.persist();
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const handleChange = (e) => {

        if(e.target.files[0]){
            setImage(e.target.files[0])
        }

    };

    const handleUpload = (e) => {
        e.preventDefault()
        const storage = firebase.storage();

        const uploadTask = storage.ref(`images/${image.name}`).put(image)

        uploadTask.on('state_changed',
            (snapshot) => {
                const progressBytes = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setProgress(progressBytes)
            },
            (error) => {
                console.log(error)
            },
            () => {
                storage.ref('images').child(image.name).getDownloadURL().then(url => {
                    console.log(url)
                    setURL(url)
                })
            })

    }

    const handleContentChange = (e) => {

        setDescription(e)
    };


    return (
        <>
            <Layout>
                <Header />
                <div style={{margin: 'auto', maxWidth: '800px'}}>
                    <h2 style={{textAlign: 'center'}}>Job Post Creation</h2>
                    <form onSubmit={handleSubmit}>
                        <div style={{boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',transition: '0.3s',borderRadius: '5px',border: 'solid', margin: '10px', backgroundColor: 'aquamarine', padding:'20px'}}>
                            <p>
                                {/*<label htmlFor="job_title">Job Title: </label>*/}
                                <input
                                    className={'form_input'}
                                    placeholder="Job Title"
                                    type="text"
                                    id="job_title"
                                    name="job_title"
                                    onChange={handleInputChange}
                                    value={inputs.job_title}
                                    ref={r => (firstInput = r)}
                                />
                            </p>
                            <p>
                                {/*<label htmlFor="title">Company Name: </label>*/}
                                <input
                                    className={'form_input'}
                                    placeholder="Company Name"
                                    type="text"
                                    id="company_name"
                                    name="company_name"
                                    onChange={handleInputChange}
                                    value={inputs.company_name}
                                />
                            </p>
                            <p>
                                {/*<label htmlFor="title">Location: </label>*/}
                                <input
                                    className={'form_input'}
                                    placeholder="Location (e.g. Remote, Houston, Mexico City, etc)"
                                    type="text"
                                    id="location"
                                    name="location"
                                    onChange={handleInputChange}
                                    value={inputs.location}
                                />
                            </p>
                            <p>
                                {/*<label htmlFor="title">Category: </label>*/}
                                <input
                                    className={'form_input'}
                                    placeholder="Category or Area (e.g. Integrations, HCM, etc)"
                                    type="text"
                                    id="category"
                                    name="category"
                                    onChange={handleInputChange}
                                    value={inputs.category}
                                />
                            </p>
                            <p>
                                {/*<label htmlFor="title">Time Type: </label>*/}
                                <input
                                    className={'form_input'}
                                    placeholder="Time Type (e.g. Full Time, Part Time, etc)"
                                    type="text"
                                    id="time"
                                    name="time"
                                    onChange={handleInputChange}
                                    value={inputs.time}
                                />
                            </p>
                            <div style={{marginBottom: '20px'}}>
                                <label htmlFor="title">Logo: </label>
                                <ImageUpload
                                    progress={progress}
                                    handleChange={handleChange}
                                    handleUpload={handleUpload}
                                    url={url}
                                />
                            </div>
                            <div style={{marginBottom: '20px'}}>
                                {/*<label htmlFor="description">Description</label>*/}
                                <RichTextEditor handleContentChange={handleContentChange}/>
                            </div>
                            <p>
                                {/*<label htmlFor="title">Time Type: </label>*/}
                                <input
                                    className={'form_input'}
                                    placeholder="Link to application"
                                    type="text"
                                    id="link"
                                    name="link"
                                    onChange={handleInputChange}
                                    value={inputs.link}
                                />
                            </p>
                        </div>
                        <p style={{textAlign: 'center'}}>
                            <button className={'post_button'} type="submit">[ create ]</button>
                        </p>
                    </form>
                    <p>
                        <Link href={"/jobs"}>
                            <a>[ back to jobs ]</a>
                        </Link>
                    </p>
                    <Footer />
                </div>

            </Layout>

        </>
    );
};




// Use `withAuthUser` to get the authed user server-side, which
// disables static rendering.
// Use `withAuthUserInfo` to include the authed user as a prop
// to your component.
export default JobsCreate;
