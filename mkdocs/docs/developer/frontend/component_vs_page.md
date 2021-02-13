# Component vs Page
In NextJS, you could either have a "Page" component that is loaded as the top-level component that also has special properties such as server-side initial data (not currrently used).

???+ info "Terminology"
    In this documentation page, "component" is referred to as component that is loaded from another piece of code. A "Page" is a component that is loaded as the top-level component. It also refers to as a page in a web application.


## What should be the difference in code?

### Pages will handle any loading

It is often that when a page load, data loads, especially if that data is used in multiple places. Hence this is the component that is responsible for loading data. This also makes sense since for optimisation purpose, you don't want to hit the server multiple times for the same data because there's limited endpoint.

???+ note "Coordinator Page"
    The intended design of the coordinator page should have been separated on each tab. However, this is not the case and should be changed. (TODO)
