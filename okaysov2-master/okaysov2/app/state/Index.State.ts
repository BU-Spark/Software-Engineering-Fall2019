import {RecentQuestionStore} from './RecentQuestions.State'

//A central location to store all the stores so that we can easily impor them. 
export const stores = {
    recentQuestionStore: new RecentQuestionStore()
}

