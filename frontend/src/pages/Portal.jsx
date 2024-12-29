import React, { useEffect } from 'react';
import AccountBalance from '../components/Account';
import Navbar from '../components/Navbar';
import UserCard from '../components/User';
import axios from 'axios';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Search, User } from 'lucide-react';

const Portal = () => {
    const navigate = useNavigate()
    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const [balance, setbalance] = useState('')
    const [reload, setReload] = useState(false);
    const [card, setcard] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    console.log(searchTerm)



    useEffect(() => {
        const fecthuser = async () => {
            try {

                const response = await axios.get("http://192.168.29.252:3000/api/v1/user/me", {
                    headers: {
                        'token': localStorage.getItem('token')
                    }
                })
                const data = response.data.response
                setfirstname(data[0] || "User")
                setlastname(data[1])
            } catch (err) {
                console.log(err)
            }

        }

        fecthuser()
    }, [])

    useEffect(() => {
        const fetchbalance = async () => {
            try {
                const response = await axios.get("http://192.168.29.252:3000/api/v1/account/balance", {
                    headers: {
                        'token': localStorage.getItem('token')
                    }
                })
                const data = response.data.balance
                setbalance(data)
                setReload(!reload)


            } catch (err) {
                console.log(err)
            }
        }
        fetchbalance()
    }, [])

    useEffect(() => {
        const fecthdata = async () => {
            try {
                const response = await axios.get(`http://192.168.29.252:3000/api/v1/user/bulk?filter=${searchTerm}`, {
                    headers: {
                        'token': localStorage.getItem('token')
                    }
                })
                const data = response.data.Users
                const userList = data.map((value, index) => (

                    <UserCard key={index} firstname={value.firstname} lastname={value.lastname} onSendMoney={() => navigate(`/gateway?to=${value._id}`)

                    } />

                ))
                setcard(userList)

            } catch (err) {
                console.log(err)
            }
        }
        fecthdata()
    }, [searchTerm])

    function handleSearch(e) {
        e.preventDefault()
    }


    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Navbar - full width at the top */}
            <Navbar firstName={firstname} lastName={lastname} />

            {/* Main Content - below navbar */}
            <div className="flex-grow p-4 sm:p-6 md:p-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Account Balance */}
                    <div className="w-full">
                        <AccountBalance balance={balance} />
                    </div>

                    {/* Search Users */}
                    <div className="w-full">
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Search Users</h2>
                            <form onSubmit={handleSearch} className="mb-4">
                                <div className="relative">
                                    {/* Input field */}
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}  // Handle the search on input change
                                        className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm pl-10 py-2"
                                        placeholder="Search users..."
                                    />
                                    {/* Search icon */}
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-gray-400" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* User Cards */}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Dynamically Render User Cards */}
                        {card}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Portal;

