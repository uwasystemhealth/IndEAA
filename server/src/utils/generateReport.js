const createDocumentFromMarkdown = require('./lib/createDocumentFromMarkdown');

// To generate the report
// The following details are needed:
// Reviews and CourseEvaluation information
// User Information: Reviewers and Coordinators
const generateReport = (courseEvaluation,reviews,coordinators,reviewers) =>{
    // This function is a wrapper for creation of Document and returns a Promise
    const filename = `IndEAA-${courseEvaluation._id}-${courseEvaluation.courseId}`;
    const markdownDetails =`
    # IndEAA Report: ${courseEvaluation.courseId}
    Coordinators: 

    ${coordinators.map(user => `- ${user.name}`).join('\n')}

    Reviewers:

    ${reviewers.map(user => `- ${user.name}`).join('\n')}

    ## Course Information
    ${courseEvaluation.reviewDescription}

    Target Date: ${courseEvaluation.reviewTargetDate}
    Completed Date: ${courseEvaluation.completedDate}
    Coordinators:

    ## Elements of Competencies
    // TODO

    ## Documents Attached are:
    
    ${courseEvaluation.documents.map(document =>`
    ### ${document.name}
    ${document.description}

    Link: ${document.link}
    Tags: ${document.tags.join(',')}
    `).join('\n')}

    ## Coordinator Review Justification
    // TODO

    # Review

    ${reviews.map(review =>`
    ## Review of ${reviewers.find(user => user._id == review.user_id).name}
    
    Read the Development Levels on: ${review.step1DevelopmentLevels}

    ### General Comment
    ${review.step4ReviewComment}

    ### Documents Review
    ${review.step2Documents.map(documentReview => `
    #### ${documentReview.document_id}
    ${documentReview.comment}

    Finished Reviewed On: ${documentReview.finishedReviewedOn}
    `).join('\n')}

    ### Element of Competencies Review
    ${review.step3Evaluation.map(eocReview =>`
    #### EOC ${eocReview.eoc}
    Rating: ${eocReview.rating}
    Reason: ${eocReview.reason}
    Idea for Improvement: ${eocReview.ideaForImprovement}
    `).join('\n')}


    `).join('\n')}
    
    `;
    return createDocumentFromMarkdown(markdownDetails,filename);
};

