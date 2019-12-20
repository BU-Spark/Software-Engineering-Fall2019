import { observable, action, runInAction, decorate, } from 'mobx';
import { getRecentQuestionsHttp } from '../../api/apiHTTP'
import { RecentQuestions } from '../../api/interfaces'

//An example store of how we can pull stull from the APi in a async manner
export interface RecentQuestionStoreInterface {
    isLoading: boolean
    isFailure: boolean
    recentQuestions: RecentQuestions[]
    getRecentQuestions: Function
}

export class RecentQuestionStore {
    isLoading = true
    isFailure = false
    recentQuestions: RecentQuestions[] = []

    async getRecentQuestions() {
        try {
            const data: RecentQuestions[] = await getRecentQuestionsHttp()
            runInAction(() => {
                this.isLoading = false
                if (data != undefined) {
                    this.recentQuestions = data
                } else {
                    this.isFailure = true
                    throw new Error("API failed to respond")
                }
            })
        } catch (err) {
            runInAction(() => {
                this.isLoading = false
                this.isFailure = true
                this.recentQuestions = []
            })
        }
    }
}

decorate(RecentQuestionStore, {
    isLoading: observable,
    isFailure: observable,
    recentQuestions: observable,
    getRecentQuestions: action
})


