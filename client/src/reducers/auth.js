

// do i even need this if using express session

const defaultState = {

};

export default (state = defaultState, action) => {



    switch (action.type) {

        // TODO ???
        case 'TEST':

            console.log('action',action);
            return {

            };



        default:
            return state;
    }
};
