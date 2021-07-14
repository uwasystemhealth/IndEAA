
// Function for selection only a couple of information from each user
// that has a role in a course
const getUsersForRoleClosure = (app) => async (course_id,role) =>{
    const query = await app.service('users').find({query:
                { 
                    $select:['_id','name','email'],
                    perms: {
                        $elemMatch: { course_id: course_id, role},
                    }
                }
    });
    return query.data;

};

module.exports=getUsersForRoleClosure;