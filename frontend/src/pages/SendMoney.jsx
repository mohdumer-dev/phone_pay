import React, { useEffect, useState } from 'react';
import { ArrowRight, DollarSign } from 'lucide-react'; 
import axios from 'axios';
import '../index.css';
import { useNavigate,useLocation } from 'react-router-dom'; 


const SendMoneyPage = ({setAmount,amount,setfirstname,firstname,setReciever}) => {
    const   navigate=useNavigate()
    const location = useLocation();
   const queryParams = new URLSearchParams(location.search);

    const to = queryParams.get('to');
 
   
    const [lastname, setlastname] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fecthuser = async () => {
            try {
                const response = await axios.get(`http://192.168.29.252:3000/api/v1/user/info?to=${to}`, {
                    headers: {
                        'token': localStorage.getItem('token')
                    }
                });
                const data = response.data.response;
                setfirstname(data[0] || "User");
                setlastname(data[1]);
            } catch (err) {
                console.log(err);
            }
        };
        fecthuser();
    }, []);

    const transfer = async () => {
        setReciever(to)
        setLoading(true);
        try {
            // Wait for some time (e.g., 2 seconds) before making the API call
            await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay
    
            const response = await axios.post(
                'http://192.168.29.252:3000/api/v1/account/transfer',
                {
                    amount: amount,
                    to: to,
                },
                {
                    headers: {
                        'token': localStorage.getItem('token'),
                    },
                }
            );
            const result = response.data.response;
            console.log(result);

        } catch (err) {
            console.log(err);
        } finally {
            
            setLoading(false); // Stop loading
            navigate('/confirmation')

        }
    };

    const handleSendMoney = (e) => {
        e.preventDefault();
        
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 font-poppins mb-6">
                        Send Money
                    </h1>
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center text-white text-3xl font-bold mb-4">
                            {firstname[0]}
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 font-poppins">
                            {firstname} {lastname}
                        </h2>
                    </div>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSendMoney}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="amount" className="sr-only">
                                Amount
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <DollarSign className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                    id="amount"
                                    name="amount"
                                    type="number"
                                    required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm font-poppins"
                                    placeholder="Enter amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={transfer}
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200 font-poppins"
                            disabled={loading} // Disable button during loading
                        >
                            {loading ? (
                                <div className="loader"></div> // Circular spinner when loading
                            ) : (
                                <>
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        <ArrowRight className="h-5 w-5 text-purple-500 group-hover:text-purple-400" aria-hidden="true" />
                                    </span>
                                    Send Money
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SendMoneyPage;
