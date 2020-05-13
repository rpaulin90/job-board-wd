import React from "react";
import Link from "next/link";
import Head from 'next/head'

const Layout = (props) => {
    return (
        <div style={{padding: '1rem', margin: 'auto', maxWidth: '800px', minWidth: '500px'}}>
            <Head>
                <title>Workday Job Board</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/reset-min.css" integrity="sha256-t2ATOGCtAIZNnzER679jwcFcKYfLlw01gli6F6oszk8=" crossorigin="anonymous"/>



                    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />

            </Head>
            {props.children}
        </div>
    );
};

export default Layout;