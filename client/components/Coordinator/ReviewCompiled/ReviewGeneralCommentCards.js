import React from 'react';

const ReviewCommentCards = ({reviewsUserLinked}) => {
    return (
        <div>
            {reviewsUserLinked.map(({reviewer, review})=>(
                <ReviewCommentCard
                    name={reviewer?.name || reviewer?.email}
                    comment={review?.step4ReviewComment}
                />))
            }
        </div>
    );
};

export default ReviewCommentCards;


const ReviewCommentCard = ({name,comment}) => {
    return (
        <div>
            name: {name} <br/>
            comment: {comment}
        </div>
    );
};


