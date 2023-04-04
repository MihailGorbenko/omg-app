import { setProgress } from "../features/authentication/authSlice"
import { useAppDispatch } from "../store/store"


export default function useProgress() {
    const dispatch = useAppDispatch()

    function set(progress: number) {
        progress = progress < 0 ? 0 : progress > 100 ? 100 : progress
        dispatch(setProgress({ progress }))
    }

    function done() {
        dispatch(setProgress({ progress: 99.9 }))
        const timeout = setTimeout(() => {
            dispatch(setProgress({ progress: 100 }))
            clearTimeout(timeout)
        }, 500)
    }
    function off() {
        dispatch(setProgress({ progress: 0 }))
    }

    return {
        set,
        done,
        off
    }
}