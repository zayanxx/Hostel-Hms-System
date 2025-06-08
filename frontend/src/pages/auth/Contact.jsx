import React, { useState } from "react";
import { FaUser, FaEnvelope, FaCommentDots, FaCheckCircle } from "react-icons/fa";

const Contact = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-md flex flex-col justify-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-600 mb-6">
                    Contact Us
                </h2>

                {submitted ? (
                    <div className="text-green-600 flex flex-col items-center space-y-4 text-center">
                        <FaCheckCircle size={48} />
                        <p className="text-lg font-medium">
                            Thank you for contacting us! We will get back to you soon.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div className="relative">
                            <label className="block text-gray-300 font-medium mb-1">
                                Name
                            </label>
                            <div className="relative">
                                <FaUser className="absolute top-3.5 left-3 text-blue-500" />
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <label className="block text-gray-300 font-medium mb-1">
                                Email
                            </label>
                            <div className="relative">
                                <FaEnvelope className="absolute top-3.5 left-3 text-blue-500" />
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                                />
                            </div>
                        </div>

                        {/* Message */}
                        <div className="relative">
                            <label className="block text-gray-300 font-medium mb-1">
                                Message
                            </label>
                            <div className="relative">
                                <FaCommentDots className="absolute top-4 left-3 text-blue-500" />
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 resize-none"
                                ></textarea>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 rounded-md shadow-md hover:opacity-90 active:scale-95 transition-transform duration-100"
                        >
                            Send
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Contact;
