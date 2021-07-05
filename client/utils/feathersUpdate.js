import { services } from 'store/feathersClient';

export const updateCurrentlyBeingViewedCourse = (course_id) =>{
  services['course-evaluation'].get(course_id);
};

export const getOrCreateReview = async(course_id, reviewer_id) =>{
  const response = await services.review.find({
    query: {
      user_id: reviewer_id,
      course_id
    },
  });
  if(response.value.total<=0){
    services.review.create({
      user_id: reviewer_id,
      course_id
    });
  }
};



