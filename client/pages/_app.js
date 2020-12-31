/*!

=========================================================
* NextJS Material Kit v1.1.0 based on Material Kit Free - v2.0.2 (Bootstrap 4.0.0 Final Edition) and Material Kit React v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-kit
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/nextjs-material-kit/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Head from "next/head";
import Router from "next/router";
import { Provider } from "react-redux";
import store, { feathersClient } from "store/feathersClient"

import PageChange from "components/MaterialKit/PageChange/PageChange.js";

import "assets/scss/nextjs-material-kit.scss?v=1.1.0";

// Own Components
import Navbar from "components/Layout/Navbar"
import ContentWrapper from "components/Layout/ContentWrapper"

Router.events.on("routeChangeStart", url => {
  console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

const MyApp = ({ Component, pageProps }) => {
  // Use this custom layout if it exist
  const CustomLayout = Component.customLayout

  // Title with Default
  const pageTitle = Component.pageTitle || "IndEAA Page"

  useEffect(() => {
    // Template Licenses
    let comment = document.createComment(`

=========================================================
* NextJS Material Kit v1.1.0 based on Material Kit Free - v2.0.2 (Bootstrap 4.0.0 Final Edition) and Material Kit React v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-kit
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/nextjs-material-kit/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

`);
    document.insertBefore(comment, document.documentElement);


    // Authentication Setup - UseEffect cannot handle async
    const authenticate = async () => {
      try {
        await feathersClient.reAuthenticate()
        alert("Successful Authentication")
      }
      catch (err) {
        // Cant Authenticate
        console.log(err)
        // TODO: Insert Set Login Provider to Null

      }
    }

    authenticate()
  }
    , [])
  return (
    <Provider store={store}>
      { CustomLayout == null ?
        (
          <React.Fragment>
            <Head>
              <title>IndEAA - System Health Lab</title>
            </Head>
            <Navbar></Navbar>
            <ContentWrapper>
              <Component {...pageProps} />
            </ContentWrapper>
          </React.Fragment>
        )
        :
        (
          <CustomLayout>
            <Component {...pageProps} />
          </CustomLayout>
        )
      }

    </Provider>
  );
}

MyApp.getInitialProps = async ({ Component, router, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
}

export default MyApp;