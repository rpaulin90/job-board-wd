import "../css/main.css";
import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import Link from "next/link";
import initFirebase from "../utils/auth/initFirebase";
import usePagination from "firestore-pagination-hook";
import Header from "../components/header";
import Footer from "../components/footer";

initFirebase();

const Jobs = (props) => {


    const db = firebase.firestore();
    const {
        loading,
        loadingError,
        loadingMore,
        loadingMoreError,
        hasMore,
        items,
        loadMore
    } = usePagination(
        db
            .collection("jobs"),

        {
            limit: 10
        }
    );

    return (
        <>

                <>
                    <Header />
                    <label>jobs</label>{" "}
                    <Link href={"/jobs/post_job"}>
                        <a>[ create ]</a>
                    </Link>
                    <div>
                        {loading && <div>...</div>}
                        {items.map((item,i) => (
                            <pre key={i} className="text-xs">{JSON.stringify(item.data() || {}, null, 2)}</pre>
                        ))}
                        {hasMore && !loadingMore && <button onClick={loadMore}>[ more ]</button>}
                    </div>
                    <Footer />
                </>

        </>
    );
};


export default Jobs;
