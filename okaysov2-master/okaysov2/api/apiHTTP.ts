
//Functions used by mobx for fetching network resources

export function getRecentQuestionsHttp() {

    return fetch('http://localhost:3000/api/recentquestions/', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(val => val.json()).catch(err => {
        return undefined
    }).catch(err => {
        return undefined
    })
}