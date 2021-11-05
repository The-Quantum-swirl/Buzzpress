import React from 'react'
import api from './../../service/ServiceCall';
export default function AdminDashboard() {
    // useEffect(() => {
    //     const allUsers = api.getAllUsers();
    // }, { allUsers })
    return (
        <div>
            <h1>
                This is the admin AdminDashboard
            </h1>
            <div>
                {allUsers.map((obj, i) => { <h4>obj.id </h4> })}
            </div>
        </div>

    )
}
