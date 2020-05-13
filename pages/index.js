import "../css/main.css";
import React, { useState } from "react";
const ReactMarkdown = require('react-markdown')
import PropTypes from "prop-types";
import { get } from "lodash";
import Link from "next/link";
import withAuthUser from "../utils/pageWrappers/withAuthUser";
import withAuthUserInfo from "../utils/pageWrappers/withAuthUserInfo";
import Header from "../components/header";
import Footer from "../components/footer";
import usePagination from "firestore-pagination-hook";
import firebase from "firebase";
import Layout from "../components/Layout"
import Hit from "../components/Hit"
import CustomPagination from "../components/CustomPagination"
import CustomSearchBox from "../components/CustomSearchBox"
import { Button, Image, Card,Accordion, Icon,Loader,Label,Grid, Message } from 'semantic-ui-react'
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Hits, Configure } from "react-instantsearch-dom";









const Index = (props) => {

    const ALGOLIA_ID = process.env.ALGOLIA_ID;
    const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY;
    const searchClient = algoliasearch(ALGOLIA_ID, ALGOLIA_API_KEY);
    const [activeIndex, setActiveIndex] = useState('');
    const db = firebase.firestore();
    const { AuthUserInfo } = props;
    const authUser = get(AuthUserInfo, "AuthUser");
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

    const handleAccordionClick = (id) => {
        const index = id === activeIndex ? '' : id;
        setActiveIndex(index)
    }

  return (
    <>
        <Layout>

            {!authUser ? (
            <>
                <div style={{margin: 'auto', maxWidth: '800px'}}>
                    <Header />
                    <h2 style={{textAlign: 'center'}}>WD Job Board</h2>
                    <Message style={{textAlign: 'center',margin: 'auto', width: 'fit-content'}} info>
                        <Message.Header>Need more help finding the right job or candidate?</Message.Header>
                        <p style={{marginBottom: '5px', fontSize: '20px'}}>👇</p>
                        <a target="blank" href="https://rpaulin1990.typeform.com/to/CRQvfw">Let us do the searching for you</a>
                    </Message>

                    <div>
                        {loading && <Loader style={{marginTop: '50px'}} active inline='centered'>Loading Jobs</Loader>}
                        <div>
                            <InstantSearch searchClient={searchClient} indexName="jobs">
                                <CustomSearchBox />
                                {/*<HitsPerPage*/}
                                    {/*defaultRefinement={5}*/}
                                    {/*items={[*/}
                                        {/*{value: 5, label: 'Show 5 Posts'},*/}
                                        {/*{value: 10, label: 'Show 10 Posts'}*/}
                                    {/*]}*/}
                                {/*/>*/}
                                <Configure
                                    hitsPerPage={5}
                                />
                                <Hits hitComponent={Hit}/>
                                <CustomPagination/>
                            </InstantSearch>
                            {/*{items.map((item,i) => (*/}
                                {/*<Grid key={item.id} style={{boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',transition: '0.3s',borderRadius: '5px',border: 'solid', margin: '10px', backgroundColor: 'aquamarine'}}>*/}
                                    {/*<Grid.Row>*/}
                                        {/*<Grid.Column style={{paddingRight: '0'}} width={3}>*/}
                                            {/*<Image style={{*/}
                                                {/*width:'100%',*/}
                                                {/*margin: 'auto',*/}
                                                {/*backgroundColor: 'floralwhite',*/}
                                                {/*borderRadius: '10px',*/}
                                                {/*padding: '10px',*/}
                                                {/*border: '1px solid',*/}
                                                {/*boxShadow:  '-1px 1px, -2px 2px, -3px 3px, -4px 4px,-5px 5px'}} src={item.data().logo || 'https://image.flaticon.com/icons/svg/641/641989.svg'} />*/}
                                        {/*</Grid.Column>*/}
                                        {/*<Grid.Column width={12}>*/}
                                            {/*<h3>{item.data().job_title}</h3>*/}
                                            {/*<h4 style={{fontStyle: 'italic'}}>{item.data().company_name}</h4>*/}
                                        {/*</Grid.Column>*/}
                                    {/*</Grid.Row>*/}
                                    {/*<Grid.Row style={{padding: '0 16px'}}>*/}
                                        {/*<Label style={labelStyle}>*/}
                                            {/*🚀 {item.data().category}*/}
                                        {/*</Label>*/}
                                        {/*<Label style={labelStyle}>🌎 {item.data().location}</Label>*/}
                                        {/*<Label style={labelStyle}>⏰ {item.data().time}</Label>*/}
                                    {/*</Grid.Row>*/}
                                    {/*<Grid.Row style={{padding: '0 16px', margin: '16px', border: 'solid', backgroundColor: 'floralwhite'}}>*/}
                                        {/*<Accordion style={{width: '100%'}}>*/}
                                            {/*<Accordion.Title*/}
                                                {/*active={activeIndex === item.id}*/}
                                                {/*index={item.id}*/}
                                                {/*onClick={() => {handleAccordionClick(item.id)}}*/}
                                            {/*>*/}
                                                {/*<Icon name='dropdown' />*/}
                                                {/*{activeIndex === item.id ? 'Hide Description' : 'Show Description'}*/}
                                            {/*</Accordion.Title>*/}
                                            {/*<Accordion.Content style={{padding: '10px', fontFamily: 'Lato,\'Helvetica Neue\',Arial,Helvetica,sans-serif'}} active={activeIndex === item.id}>*/}
                                                {/*<Card.Description>*/}
                                                    {/*{item.data().description ?*/}
                                                        {/*<div>*/}
                                                            {/*<p dangerouslySetInnerHTML={{__html: item.data().description}} />*/}
                                                            {/*<Button style={{backgroundColor: 'deepskyblue', border: 'solid'}}>*/}
                                                                {/*<a style={{color: 'currentColor'}} href={item.data().link} target="_blank">*/}
                                                                    {/*Apply*/}
                                                                {/*</a>*/}
                                                            {/*</Button>*/}
                                                        {/*</div>*/}
                                                        {/*:*/}
                                                        {/*'no description :('*/}
                                                    {/*}*/}
                                                {/*</Card.Description>*/}
                                            {/*</Accordion.Content>*/}
                                        {/*</Accordion>*/}
                                    {/*</Grid.Row>*/}
                                {/*</Grid>*/}

                            {/*))}*/}
                                </div>


                        {/*{hasMore && !loadingMore &&*/}
                        {/*<div style={{textAlign: 'center'}}>*/}
                            {/*<button className={'post_button'} onClick={loadMore}>[ more jobs! ]</button>*/}
                        {/*</div>*/}
                        {/*}*/}
                    </div>

                </div>

            </>
        ) : (
            <>
                <pre className="text-xs">{JSON.stringify(authUser, null, 2)}</pre>
                <p>Hi {authUser.displayName}</p>
                <p>
                    <Link href={"/account"}>
                        <a>[ account ]</a>
                    </Link>
                </p>
                <div>
                    {loading && <div>...</div>}
                    {items.map((item,i) => (

                        <Card key={i}>
                            <Card.Content>
                                <Image
                                    floated='right'
                                    size='mini'
                                    src='https://image.flaticon.com/icons/svg/641/641989.svg'
                                />
                                <Card.Header>{item.data().job_title}</Card.Header>
                                <Card.Meta>{item.data().company_name}</Card.Meta>
                                <Card.Description>
                                    bla bla ble blo bbli ble
                                </Card.Description>
                            </Card.Content>
                        </Card>
                        ))}
                    {hasMore && !loadingMore && <button onClick={loadMore}>[ more ]</button>}
                </div>
            </>
        )}
        <>
            {/*<Footer />*/}
        </>
        </Layout>



    </>
  );
};

Index.propTypes = {
  AuthUserInfo: PropTypes.shape({
    AuthUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      emailVerified: PropTypes.bool.isRequired
    }),
    token: PropTypes.string
  })
};

Index.defaultProps = {
  AuthUserInfo: null
};

export default withAuthUser(withAuthUserInfo(Index));
