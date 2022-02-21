# Testing
In IndEAA, there are two testing frameworks that are chosen:

- Cypress for end-to-end testing from the frontend
- Mocha + Assert for backend unit testing

## CI Pipeline
The CI pipeline has 3 main steps below. See more information in the `.github/workflows/main.yml` file where the CI pipeline is set.

### 1. Linting
This is also know as static code analysis. This make sures that the code follows a certain guideline on formatting and some framework specific standards.

This is important to make sure that the developer are ensured to only read code that is change for the purpose of the pull request implementation instead of being distracted with change of formatting.

### 2. Automated Testing
This checks the code for whether there are tests that failed. This is important for developers to prevent bugs from occuring by automatically testing the correctness defined for the software.


### 3. Automated Test Reporting
Once the automated testing is complete, the testing results gets uploaded to the [System Health Lab Allure Test Reporting Server](https://allure.systemhealthlab.com/), which offers developers visibility over the tests that has been ran.