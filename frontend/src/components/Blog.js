import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import Header from './Header';
import Footer from './Footer';
import { blogContents } from '../assets/Data/blog';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Blog = () => {
    const [language, setLanguage] = useState('english');
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [selectedBlog, setSelectedBlog] = useState(null);

    useEffect(() => {
        const synth = window.speechSynthesis;
        const loadVoices = () => {
            const availableVoices = synth.getVoices();
            setVoices(availableVoices);
            setSelectedVoice(availableVoices.find(voice => voice.lang.includes(language === 'english' ? 'en' : 'hi')));
        };

        loadVoices();
        synth.onvoiceschanged = loadVoices;

        // Cleanup function to stop speech synthesis when component unmounts
        return () => {
            synth.cancel();
        };
    }, [language]);

    const handleReadAloud = () => {
        if (selectedBlog) {
            const speech = new SpeechSynthesisUtterance(selectedBlog.content[language]);
            speech.voice = selectedVoice;
            window.speechSynthesis.speak(speech);
        }
    };

    const handleStopAudio = () => {
        window.speechSynthesis.cancel();
    };

    const formatContent = (content, delimiter) => {
        return content?.split(delimiter).map((str, index) => {
            const parts = str.split(/(<b>.*?<\/b>)/g);
            return (
                <p key={index} className={delimiter === '\n' ? 'mb-4' : 'mb-2'}>
                    {parts.map((part, idx) => {
                        if (part.startsWith('<b>') && part.endsWith('</b>')) {
                            return (
                                <span key={idx} className="font-bold text-xl">
                                    {part.replace(/<\/?b>/g, '')}
                                </span>
                            );
                        }
                        return part;
                    })}
                </p>
            );
        });
    };

    return (
        <>
            <Header />
            <div className="container mx-auto p-6">
                {!selectedBlog ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {blogContents.map((blog, index) => (
                            <BlogCard key={index} blog={blog} onOpen={setSelectedBlog} />
                        ))}
                    </div>
                ) : (
                    <div>
                        <button
                            className="my-4 bg-red-900 text-white p-2 rounded-full flex items-center"
                            onClick={() => setSelectedBlog(null)}
                        >
                            <ArrowBackIcon />
                        </button>
                        <div className="mb-4">
                            <label className="mr-2 text-lg text-black font-medium">Select Language: </label>
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="border-2 text-[#9D003F] outline-none rounded-xl p-1"
                            >
                                <option value="english">English</option>
                                <option value="hindi">Hindi</option>
                            </select>
                        </div>
                            <h2 className="text-3xl text-[#9D003F] underline underline-offset-8 font-bold my-6 text-center">{selectedBlog.title}</h2>
                
                        <div className="text-lg text-black leading-relaxed text-left">
                            {formatContent(selectedBlog.content[language], '\n')}
                        </div>
                        <div className="flex justify-center space-x-4 my-6 mt-8">
                            <button
                                className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
                                onClick={handleReadAloud}
                            >
                                Play Blog
                            </button>
                            <button
                                className="bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
                                onClick={handleStopAudio}
                            >
                                Stop Audio
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Blog;
