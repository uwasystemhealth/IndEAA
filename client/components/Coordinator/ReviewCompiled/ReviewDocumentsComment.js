import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// Utils
import {getAllCommentsOfDocument} from 'utils/compileResult';

const ReviewDocumentsComments = ({reviewsUserLinked}) => {
    // Get all the documents in the store
    const courseState = useSelector(state=>state['course-evaluation']);
    const course = courseState?.data;
    
    return (
        <div>
            {course?.documents.map(document=> (<ReviewDocumentsComment
                document={document}
                key={document?._id}
                // Get only comments if the document id is defined
                commentsUserLinked={document?._id ? getAllCommentsOfDocument(document._id, reviewsUserLinked) : []}
            />))}
        </div>
    );
};

export default ReviewDocumentsComments;


const ReviewDocumentsComment = ({document, commentsUserLinked}) => {
    console.log(document?._id );
    return (
        <div>
            
            {document?.name}
            {commentsUserLinked.map(commentUserLinked =>(
                <div key={commentUserLinked}>
                    reviewer name: {commentUserLinked?.reviewer?.name || commentUserLinked?.reviewer?.email} <br/>
                    reviewer comment: {commentUserLinked?.comment}
                </div>
            ))}
        </div>
    );
};


