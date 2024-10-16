import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";
import BlogCard from "../components/blogCard";
import { createBlog } from "../api/api";
import { useSelector, useDispatch } from "react-redux";
import { setBlogsData } from "../redux/Reducers/blogsSlice";
import { useSnackbar } from "notistack";
import { ClipLoader } from "react-spinners";

const Payment = () => {
  const blogsData = useSelector((state)=> state.blogs.data)
  const data = useSelector((state) => state.blogs.newBlog)
    const navigate = useNavigate();
    //const location = useLocation();
    //const [data, setData] = useState(location.state || {});
    const [paymentSuccessful, setPaymentSuccessful] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar()

    useEffect(() => {
      if (!data || Object.keys(data).length === 0) {
        navigate("/");
      }
    }, [data, navigate]);
    

    const handlePaymentSuccess = async () => {
        setPaymentSuccessful(true);
        navigate("/");
    };

    const handlePaymentError = () => {
        navigate(-1);
    };

    const handleFreeTrial = async () => {
      setLoading(true);
      console.log("Free trail clicked")
        try {
          const createdBlog = await createBlog(
              process.env.REACT_APP_API,
              data,
              localStorage.getItem("blogAuthToken")
          );
          const updatedData = Array.isArray(blogsData) ? [createdBlog.blog, ...blogsData] : [createdBlog.blog]
          dispatch(setBlogsData(updatedData));
          setLoading(false);
          navigate("/");
          enqueueSnackbar("Blog created successfully.", {variant:"success"})
          //alert("Blog created successfully.");
            
        } catch (error) {
          enqueueSnackbar("Error creating blog with free trial:", error, {variant:"error"})
        } finally{
          setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-6">
            <h2 className="text-3xl font-semibold mb-8 text-center w-full text-gray-800">
                One Last Step Before You Publish
            </h2>
            <div className="flex flex-col md:flex-row justify-between items-start w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 space-y-6 md:space-y-0 md:space-x-6">
                <div className="w-full md:w-1/2 p-4 border border-gray-200 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Blog Preview</h2>
                    <BlogCard blog={data} />
                </div>
                <div className="w-full md:w-1/2 p-4 border border-gray-200 rounded-lg">
                    <h2 className="text-xl font-semibold mb-6 text-gray-700">Choose Your Payment</h2>
                    <PayPalButtons
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: { value: "0.01" },
                                    },
                                ],
                            });
                        }}
                        onApprove={async (data, actions) => {
                            const order = await actions.order.capture();
                            console.log("Order successful:", order);
                            handlePaymentSuccess();
                        }}
                        onError={handlePaymentError}
                    />
                    <div className="flex justify-between items-center mt-8">
                        <button
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg shadow-md transition duration-200"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-200"
                            onClick={handleFreeTrial}
                            disabled={loading}
                        >
                          {loading ? (
                              <ClipLoader color="#ffffff" size={20} />
                          ) : (
                              "Free Trail"
                          )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;