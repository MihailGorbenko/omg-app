import {  setLoading } from "../features/authentication/authSlice";
import { useAppDispatch } from "../store/store";


export default function useLoader() {
    const dispatch = useAppDispatch()

    function off() {
        dispatch(setLoading({ loading: false }))
    }
    function on() {
        dispatch(setLoading({ loading: true }))
    }

    return {
        on,
        off
    }
}