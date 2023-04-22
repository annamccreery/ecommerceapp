import { Auth } from 'aws-amplify';

const checkUser = async(updateUser) => {
    try {
        const userData = await Auth.currentSession()
        
        console.log("checkUser", userData);

        //destructuring
        const { idToken: { payload } } = userData 
    
        const isAuthorized =
            payload['cognito:groups'] && //if there are groups
            payload['cognito:groups'].includes('Admin') //and those groups include admin
        
            updateUser({
            username: payload['cognito:username'],
            isAuthorized
        });
    }

    catch (err) {
        console.error(err);
        updateUser({})
    }
    
};

export default checkUser;