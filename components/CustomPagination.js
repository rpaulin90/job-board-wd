import "../css/main.css";
import React, { useState } from "react";
import { Button, Image, Card,Accordion, Icon,Loader,Label,Grid, Message, Pagination } from 'semantic-ui-react'

import { connectPagination } from 'react-instantsearch-dom';

const PaginationUI = ({ currentRefinement, nbPages, refine, createURL }) => {

    const handlePaginationChange = (e, {activePage}) =>  refine(activePage);


    return (

        <div style={{textAlign: 'center'}}>
            <Pagination
                style={{backgroundColor: 'transparent'}}
                activePage={currentRefinement}
                boundaryRange={1}
                onPageChange={handlePaginationChange}
                size='mini'
                siblingRange={1}
                totalPages={nbPages}
                // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value

            />
        </div>

        // <ul style={{textAlign: 'center'}}>
        //     {new Array(nbPages).fill(null).map((_, index) => {
        //         const page = index + 1;
        //         const style = {
        //             fontWeight: currentRefinement === page ? 'bold' : '',
        //         };
        //
        //         return (
        //             <li key={index}>
        //                 <a
        //                     href={createURL(page)}
        //                     style={style}
        //                     onClick={event => {
        //                         event.preventDefault();
        //                         refine(page);
        //                     }}
        //                 >
        //                     {page}
        //                 </a>
        //             </li>
        //         );
        //     })}
        // </ul>
    )

}
const CustomPagination = connectPagination(PaginationUI);


export default CustomPagination;