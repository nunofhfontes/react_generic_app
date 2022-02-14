import { BehaviorSubject } from 'rxjs';

// detect browser and get user from local storage
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
    user: userSubject.asObservable(),
    get userValue () {
        return userSubject.value
    }
};