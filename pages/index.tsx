import "../css/main.css";
import React from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import Link from "next/link";
import withAuthUser from "../utils/pageWrappers/withAuthUser";
import withAuthUserInfo from "../utils/pageWrappers/withAuthUserInfo";
import Header from "../components/header";
import Footer from "../components/footer";
import usePagination from "firestore-pagination-hook";
import firebase from "firebase";

const Index = (props: any) => {

    const db = firebase.firestore();
    const { AuthUserInfo } = props;
    const authUser = get(AuthUserInfo, "AuthUser");
    const optionStyle = {
      border: "solid",
      maxWidth: "300px",
      margin: "auto",
      marginTop: "10px",
      marginBottom: "10px"
    };

    const aStyle = {
        display: "inline-block",
        width: "100%",
        height: "100%",
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

  return (
    <>
      <Header />
      {!authUser ? (
        <>
          <div style={{textAlign: 'center', marginRight: '1rem'}}>
              <h2>WD Job Board</h2>
              <div>
                  <Link href={"/login"}>
                      <a>[ log in ]</a>
                  </Link>
              </div>
              <div style={optionStyle}>
                  <Link href={"jobs/post_job"}>
                      <a style={aStyle}>
                          [ Post a Job ]
                      </a>
                  </Link>
              </div>

              <div>
                  {loading && <div>...</div>}
                  {items.map((item,i) => (
                      <pre key={i} className="text-xs">{JSON.stringify(item.data() || {}, null, 2)}</pre>
                  ))}
                  {hasMore && !loadingMore && <button onClick={loadMore}>[ more ]</button>}
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
                    <pre key={i} className="text-xs">{JSON.stringify(item.data() || {}, null, 2)}</pre>
                ))}
                {hasMore && !loadingMore && <button onClick={loadMore}>[ more ]</button>}
            </div>
        </>
      )}
      <>
        <Footer />
      </>
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
