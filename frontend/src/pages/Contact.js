import { React, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FaqList from '../components/FAQ/Faqlist';
import contactimg from '../assets/media/contact1.png'
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <>
            <Header />
            <div>
                <div className='absolute z-0'>
                <img src={contactimg}></img>
                </div>
                
                {/* Contact Us Section */}
                <section className="py-10 bg-gray-50">
                    <div className="relative top-[100px] md:top-[230px] z-20 container mx-auto px-4 md:px-8">
                        <div className="flex flex-col md:flex-row md:space-x-12">
                            <div className="md:w-full bg-white p-6 rounded-lg shadow-lg">
                                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Get in Touch</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-600">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="4"
                                            required
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-red-800 text-white py-2 px-4 rounded-md hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2"
                                    >
                                        Send Message
                                    </button>
                                    {isSubmitted && (
                                        <p className="mt-4 text-green-600 text-center">Your message has been sent successfully!</p>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Additional Information Section */}
                <section className="bg-white flex flex-col md:flex-row py-12 md:pt-64">
                    <div className= "container mx-auto px-4 md:px-8">
                        <div className="flex flex-col md:flex-row justify-between">
                            <div className="w-full md:w-1/2 md:block mt-5">
                                <div className="md:mx-5 md:p-6 mt-8 md:mt-0">
                                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Contact Information</h2>
                                    <p className="text-gray-600 mb-2">
                                        <strong>Address:</strong> A142, Sector 63, Noida, 201301
                                    </p>
                                    <p className="text-gray-600 mb-2">
                                        <strong>Phone:</strong> 9355818985
                                    </p>
                                    <p className="text-gray-600 mb-2">
                                        <strong>Email:</strong> aunherbals@gmail.com
                                    </p>
                                    <div className="mt-6">
                                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Find Us</h3>
                                   <iframe
                                            src="https://www.google.com/maps/embed?pb=!3m2!1sen!2sin!4v1722937835545!5m2!1sen!2sin!6m8!1m7!1seYvF61Drvg0yVG85f9kAlg!2m2!1d28.61999236963626!2d77.37807772397873!3f288.2716301079403!4f0.5703587423002432!5f0.7820865974627469"
                                            width="100%"
                                            height="250"
                                            style={{ border: 0 }}
                                            allowFullScreen=""
                                            loading="lazy"
                                            title="Google Maps"
                                            className="rounded-md shadow-md"
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <h2 className="text-4xl mt-4 font-bold text-gray-800">Most <span className='text-red-800'>Questions</span> by our beloved <br /> Customers</h2>
                                <FaqList />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}

export default Contact;
