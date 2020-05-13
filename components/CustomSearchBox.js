import "../css/main.css";
import React, { useState } from "react";
import { Button, Input, Card,Accordion, Icon,Loader,Label,Grid, Message } from 'semantic-ui-react'
import { connectSearchBox } from 'react-instantsearch-dom';

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (


    <form style={{textAlign: 'left', marginTop: '30px', marginLeft: '10px', marginBottom: '5px'}} noValidate action="" role="search">
        <Input type="search"
               value={currentRefinement}
               onChange={event => refine(event.currentTarget.value)}
               icon='search'
               placeholder='Search...' />

        <Button circular icon='cancel' style={{backgroundColor: 'transparent'}} onClick={() => refine('')} />

        {isSearchStalled ? 'My search is stalled' : ''}
    </form>
);

const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox;