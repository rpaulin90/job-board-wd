import "../../css/main.css";
import React, { useState } from "react";
import firebase from "firebase/app";
import Link from "next/link";
import Router from "next/router";
import initFirebase from "../../utils/auth/initFirebase";
import Header from "../../components/header";
import Footer from "../../components/footer";

initFirebase();


const JobsCreate = (props) => {


    const initial = {
        job_title: "",
        company_name: ""
    };

    const [inputs, setInputs] = useState(initial);
    var firstInput = null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (inputs.job_title.length === 0) {
                throw `job title can't be empty`;
            } else if (inputs.company_name.length === 0) {
                throw `company name can't be empty`;
            }
            const db = firebase.firestore();
            const ref = db.collection("jobs");

            await ref.add({
                job_title: inputs.job_title,
                company_name: inputs.company_name,
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


    return (
        <>
             (
                <div>
                    <Header />
                    <div>create a new job</div>
                    <form onSubmit={handleSubmit}>
                        <p>
                            <label htmlFor="job_title">Job Title: </label>
                            <input
                                type="text"
                                id="job_title"
                                name="job_title"
                                onChange={handleInputChange}
                                value={inputs.job_title}
                                ref={r => (firstInput = r)}
                            />
                        </p>
                        <p>
                            <label htmlFor="title">Company Name: </label>
                            <input
                                type="text"
                                id="company_name"
                                name="company_name"
                                onChange={handleInputChange}
                                value={inputs.company_name}
                            />
                        </p>
                        <p>
                            <button type="submit">[ create ]</button>
                        </p>
                    </form>
                    <p>
                        <Link href={"/jobs"}>
                            <a>[ back to jobs ]</a>
                        </Link>
                    </p>
                    <Footer />
                </div>
            )
        </>
    );
};




// Use `withAuthUser` to get the authed user server-side, which
// disables static rendering.
// Use `withAuthUserInfo` to include the authed user as a prop
// to your component.
export default JobsCreate;
