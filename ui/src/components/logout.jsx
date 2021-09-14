import { useEffect } from 'react';
export default function Logout() {
    useEffect(() => {
        window.location = "/";
        return () => {
        }
    }, [])

    return (null
    )
}
