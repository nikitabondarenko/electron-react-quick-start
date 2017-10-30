const initialState = {
    schedule: ['Mon','Tues','Wednes','Thurs','Fri'].map((day) => ({
        day: `${day}day`,
        times: [9,10,11,12,13,14,15,16].map((num) => ({
            number: '',
            name: '',
            notes: '',
            time: `${num}:00-${num+1}:00`
        }))
    }))
}

const numberScheduler = (state = initialState, action)=>{
    switch(action.type){
        case 'ADD_CALL': 
        return
         {
            // state.schedule[idx].times[idxTime].number: number,
            // state.schedule[idx].times[idxTime].name: name,
            // state.schedule[idx].times[idxTime].notes: notes,
            // state.schedule[idx].times[idxTime].time: curTime
         }
         default:
         return state
    }};

export default numberScheduler;


