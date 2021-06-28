// React + Redux + Functionality
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useRedirectIfFinish = (review, courseID) => {
    const router = useRouter();
    useEffect(()=>{
        if(review?.submittedDate && review.course_id===courseID){
            // If Submitted date is determined defined
            router.push(`/reviewer/${review.course_id}/5-finish`);
        }
    }, [review]);
};

export default useRedirectIfFinish;
