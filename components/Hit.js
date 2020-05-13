import "../css/main.css";
import React, { useState } from "react";
import { Button, Image, Card,Accordion, Icon,Loader,Label,Grid, Message} from 'semantic-ui-react'

const Hit = ({hit}) => {

    const [activeIndex, setActiveIndex] = useState('');

    const handleAccordionClick = (id) => {
        const index = id === activeIndex ? '' : id;
        setActiveIndex(index)
    }

    const optionStyle = {
        background: 'none',
        backgroundColor: 'floralwhite',
        border: '2px solid black',
        borderBottomWidth: '4px',
        font: 'inherit',
        letterSpacing: 'inherit',
        marginBottom: '5px',
        padding: '1em 2em',
        transition: 'color 1s'
    };

    const labelStyle = {
        background: 'none',
        backgroundColor: 'floralwhite',
        border: '2px solid black',
        borderBottomWidth: '4px',
        font: 'inherit',
        letterSpacing: 'inherit',
        marginBottom: '5px',
        padding: '1em 2em',
        transition: 'color 1s'
    }

    const aStyle = {
        display: "block",
        width: "12rem",
        height: "100%",
        margin: "auto"
    };


    return (

                <Grid  key={hit.objectID} style={{boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',transition: '0.3s',borderRadius: '5px',border: 'solid', margin: '10px', backgroundColor: 'aquamarine'}}>
                    <Grid.Row>
                        <Grid.Column style={{paddingRight: '0'}} width={3}>
                            <Image style={{
                                width:'100%',
                                margin: 'auto',
                                backgroundColor: 'floralwhite',
                                borderRadius: '10px',
                                padding: '10px',
                                border: '1px solid',
                                boxShadow:  '-1px 1px, -2px 2px, -3px 3px, -4px 4px,-5px 5px'}} src={hit.logo || 'https://image.flaticon.com/icons/svg/641/641989.svg'} />


                        </Grid.Column>
                        <Grid.Column width={12}>
                            <h3>{hit.job_title}</h3>
                            <h4 style={{fontStyle: 'italic'}}>{hit.company_name}</h4>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{padding: '0 16px'}}>
                        <Label style={labelStyle}>
                            🚀 {hit.category}
                        </Label>
                        <Label style={labelStyle}>🌎 {hit.location}</Label>
                        <Label style={labelStyle}>⏰ {hit.time}</Label>
                    </Grid.Row>
                    <Grid.Row style={{padding: '0 16px', margin: '16px', border: 'solid', backgroundColor: 'floralwhite'}}>
                        <Accordion style={{width: '100%'}}>
                            <Accordion.Title
                                active={activeIndex === hit.objectID}
                                index={hit.objectID}
                                onClick={() => {handleAccordionClick(hit.objectID)}}
                            >
                                <Icon name='dropdown' />
                                {activeIndex === hit.objectID ? 'Hide Description' : 'Show Description'}
                            </Accordion.Title>
                            <Accordion.Content style={{padding: '10px', fontFamily: 'Lato,\'Helvetica Neue\',Arial,Helvetica,sans-serif'}} active={activeIndex === hit.objectID}>
                                <Card.Description>
                                    {hit.description ?
                                        <div>
                                            <p dangerouslySetInnerHTML={{__html: hit.description}} />
                                            <Button style={{backgroundColor: 'deepskyblue', border: 'solid'}}>
                                                <a style={{color: 'currentColor'}} href={hit.link} target="_blank">
                                                    Apply
                                                </a>
                                            </Button>
                                        </div>
                                        :
                                        'no description :('
                                    }
                                </Card.Description>
                            </Accordion.Content>
                        </Accordion>
                    </Grid.Row>
                </Grid>



    );
};

export default Hit;