import { atom } from "recoil";
import { Person } from "../model/person";


// Should break this out into its own package
interface Request<T> {
    loading: boolean
    data: T
    error: string
}

// Keeps the state of the people request
export const peopleRequestState = atom<Request<Person[]>>({
    key: 'peopleRequestState',
    default: {
        loading: false,
        data: [],
        error: ""
    }
});
