export const getRangeOfDevelopmentLevel = (developmentLevelList) => {
    const filteredList = removeNulls(developmentLevelList);
    if(filteredList.length===0){
        return '-';
    }
    return(`${Math.min(...filteredList)} - ${Math.max(...filteredList)}`);};
export const getAverageOfDevelopmentLevel = (developmentLevelList,roundDigit=2) =>{ 
    // https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
    const filteredList = removeNulls(developmentLevelList);
    return(filteredList.reduce((accumulator,current) => accumulator+current, 0) / filteredList.length).toFixed(roundDigit);
};

// Removes the Falsy Values on a list - also 0
export const removeNulls = (list) => list.filter(item => Boolean(item));

// This has an some equivalence to
// utils/eocs::getDetailsOfEntireEOC
// but this one is for reviews not justifications
export const getDetailsOfReviewEOC = (eocGeneralAndSpecific,review) => {
    // Gets the details of review of EOC
    // If cannnot be found - it will return the default values for all fields
    const selectedEOCEvaluation = review?.step3Evaluation.find(currentEvaluation => (
        currentEvaluation?.eoc == eocGeneralAndSpecific )) || {rating:0, reason:'', ideaForImprovement:''};

    return selectedEOCEvaluation;
};

export const linkReviewerAndReview = (reviewers, reviews) =>{
    // This will return an array of objects with each object having two fields
    // Object: {reviewer: [INSERT REVIEWER OBJECT HERE], review: [INSERT REVIEW OBJECT HERE]}
    // Note review can be null, but never reviewer
    // -> reviewsUserLinked

    return reviewers.map(reviewer=>{
        const reviewOfUser = reviews?.find(review=> review.user_id === reviewer._id) || null;
        return {reviewer, review:reviewOfUser};
    });
};

export const getAllCommentsOfDocument = (document_id, reviewsUserLinked)=>{
    // Used for compiling document results
    // This will return an array of objects with each object having two fields
    // reviewer - reviewer object
    // comment - comment of that reviewer for that document
    const comments = reviewsUserLinked.map(({review,reviewer}) =>({
        reviewer,
        comment: review?.step2Documents.find(documentInReview=> documentInReview.document_id === document_id)?.comment || ''
    }));
    return comments;
};