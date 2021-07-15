const createDocumentFromMarkdown = require('../lib/createDocumentFromMarkdown');
const {DEVELOPMENT_LEVEL} = require('./eocs');

// To generate the report
// The following details are needed:
// Reviews and CourseEvaluation information
// User Information: Reviewers and Coordinators
const generateReport = (courseEvaluation,reviews,coordinators,reviewers) =>{
    // This function is a wrapper for creation of Document and returns a Promise
    const filename = `IndEAA-Report-${courseEvaluation.courseId}`;
    const folderPath = `${courseEvaluation._id}`;
    const markdownDetails =
`
---
title: IndEAA Report - ${courseEvaluation.courseId}
abstract: ABC
---

## Course Information
${courseEvaluation.reviewDescription}

Target Date: ${courseEvaluation.dueDate || 'Not Specified'}

Completed Date: ${courseEvaluation.completedDate || 'Not Specified'}

Coordinators: 

${coordinators.map(user => `- ${user.name ? `${user.name} <${user.email}>`: user.email}`).join('\n')}

Reviewers:

${reviewers.map(user => `- ${user.name ? `${user.name} <${user.email}>` : user.email}`).join('\n')}


## Elements of Competencies
// TODO

## Documents Attached are:

${courseEvaluation.documents.map(document =>`
### Document: ${document.name}
${document.description || 'Document has no description'}

Link: ${document.link || 'Document has no link'}

Tags: ${(document.tags||[]).join(',')}
`).join('\n')}

# Coordinator Review Justification
// TODO: This needs to be changed with the EOC stuff later
${courseEvaluation.eoc.map(remarks =>`
## Justification for ${remarks.eocNumber.join(', ')}
Development Level: ${remarks.developmentLevel ? `${remarks.developmentLevel} - ${DEVELOPMENT_LEVEL[remarks.developmentLevel - 1].short}` : 'Coordinator has not rated the development Level'}

Justification:

${remarks.justification}
`).join('\n')}

# Review

${reviews.map(review =>`
## Review of ${review.user_id}

Read the Development Levels on: ${review.step1DevelopmentLevels}

### General Comment
${review.step4ReviewComment || 'Reviewer has no general comment'}

### Documents Review
${review.step2Documents.map(documentReview => `
${ documentReview.comment ? `#### Review for document ${documentReview.document_id}
${documentReview.comment || 'Reviewer has no comment for document'}

Finished Reviewed On: ${documentReview.finishedReviewedOn || 'Reviewer has not marked finished reviewing document'}
`: ''}`).join('\n')}

### Element of Competencies Review
${review.step3Evaluation.map(eocReview =>`
#### EOC ${eocReview.eoc}
Rating: ${eocReview.rating ? `${eocReview.rating} - ${DEVELOPMENT_LEVEL[eocReview.rating - 1].short}` : 'Reviewer has not rated the EOC'}

Reason: ${eocReview.reason || 'Reviewer did not provide reason'}

Idea for Improvement: ${eocReview.ideaForImprovement ||'Reviewer did not give suggestion'}
`).join('\n')}


`).join('\n')}

`;
    return createDocumentFromMarkdown(markdownDetails,filename,folderPath);
};

const gatherInformationForCourseEvaluationClosure =(app) => async (courseEvaluation_id) =>{
    const reviews = (await app.service('review').find({
        query:{
            course_id: courseEvaluation_id
        },
    })).data;
    const courseEvaluation = await app.service('course-evaluation').get(courseEvaluation_id);
    // This assumes the the courseEvaluation will have the coordinators and reviewers
    const {coordinators, reviewers} = courseEvaluation;
    return generateReport(courseEvaluation,reviews,coordinators,reviewers);
};

module.exports = gatherInformationForCourseEvaluationClosure;
