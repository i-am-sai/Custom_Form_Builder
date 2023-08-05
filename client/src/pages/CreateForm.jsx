import React, { useState } from 'react';
import Header from '../components/Header';
import CategorizeQuestion from '../components/CategorizeQuestion';
import ClozeQuestion from '../components/ClozeQuestion';
import Comprehension from '../components/Comprehension';
import { Link } from 'react-router-dom';


export const CreateForm = (state) => {
    console.log(state)
    const [formId, setFormId] = useState('');
    const [questions, setQuestions] = useState([]);
    const [header, setHeader] = useState('');

    const addQuestion = (type) => {
        let initialData;
        if (type === 'Categorize') {
            initialData = { categories: [], items: [{ name: '', category: '' }] };
        } else if (type === 'Cloze') {
            initialData = { paragraph: '', options: [] };
        } else if (type === 'Comprehension') {
            initialData = { instructions: '', passage: '', subQuestions: [] };
        }
        setQuestions([...questions, { type, points: 10, data: initialData }]);
    };

    const removeQuestion = (index) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions);
    };

    const handleQuestionDataChange = (index, data) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = { ...updatedQuestions[index], data };
        setQuestions(updatedQuestions);
    };

    const handlePointsChange = (index, points) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].points = points;
        setQuestions(updatedQuestions);
    };

    const handleSaveForm = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$';
        const charactersLength = characters.length;
        let randomId = '';

        for (let i = 0; i < 7; i++) {
            const randomIndex = Math.floor(Math.random() * charactersLength);
            randomId += characters.charAt(randomIndex);
        }
        setFormId(randomId);
        if (!header) {
            alert('Add Form title');
            return;
        }
        if (questions.length === 0) {
            alert('Add at least one Question');
            return;
        }//http://localhost:8080/create
        const formData = { formId: randomId, header, questions };
        //https://backend-i-am-sai.koyeb.app/create
        fetch('https://backend-i-am-sai.koyeb.app/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log("FormId :", formId);
                alert('Form created successfully');
            })
            .catch((err) => console.log(err));

    };


    return (
        <div className='w-full max-w-screen-md mx-auto mb-20 border-2 p-5 pb-10 mt-10 bg-gray-100'>
            <h2 className='text-3xl font-bold mb-4 p-5 text-center'>Custom Form Editor</h2>
            <Header setHeader={setHeader} />
            {questions.map((question, index) => (
                <div key={index} className='border-2 p-4 rounded mb-4'>
                    <div className='flex justify-between p-2'>
                        {/* Question Number */}
                        <div>
                            <label className='block mb-2 text-gray-700 font-bold text-left text-lg'>Question {index + 1}:</label>
                        </div>

                        {/* Points */}
                        <div className='flex gap-4'>
                            <label className='block mb-2 text-gray-700 font-bold text-left'>Points:</label>
                            <input
                                type='number'
                                min={1}
                                value={question.points}
                                onChange={(e) => handlePointsChange(index, e.target.value)}
                                className='block w-[70px] rounded-md border-gray-300 py-2 px-3 mb-2 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                            />
                        </div>

                        {/* Delete Question */}
                        <button onClick={() => removeQuestion(index)} className='text-red-500 font-bold'>
                            Delete Question
                        </button>
                    </div>

                    {question.type === 'Categorize' && (
                        <CategorizeQuestion
                            questionIndex={index}
                            questionData={question}
                            updateQuestionData={(index, data) => handleQuestionDataChange(index, data)}
                        />
                    )}

                    {question.type === 'Cloze' && (
                        <ClozeQuestion
                            questionIndex={index}
                            questionData={question}
                            updateQuestionData={(index, data) => handleQuestionDataChange(index, data)}
                        />
                    )}

                    {question.type === 'Comprehension' && (
                        <Comprehension
                            questionIndex={index}
                            questionData={question}
                            updateQuestionData={(index, data) => handleQuestionDataChange(index, data)}
                        />
                    )}
                </div>
            ))}

            <div className='mb-4 text-left'>
                <label className='text-xl font-bold mr-6'>Question Categories :</label>
                <div className='text-center flex gap-10 justify-center mt-6'>
                    <button
                        onClick={() => addQuestion('Categorize')}
                        className='border-2 p-2 text-blue-900 font-semibold rounded-full'
                    >
                        + Add Categorize Question
                    </button>
                    <button onClick={() => addQuestion('Cloze')} className='border-2 p-2 text-blue-900 font-semibold rounded-full'>
                        + Add Cloze Question
                    </button>
                    <button
                        onClick={() => addQuestion('Comprehension')}
                        className='border-2 p-2 text-blue-900 font-semibold rounded-full'
                    >
                        + Add Comprehension Question
                    </button>
                </div>
            </div>
            <div className='flex justify-center'>
                <button
                    onClick={handleSaveForm}
                    className='bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                >
                    Save Form
                </button>
            </div>
            {header && questions.length !== 0 ? (
                <div className='flex justify-center mt-4'>
                    <Link to={`/preview/?formId=${formId}`} >
                        <button
                            className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        >
                            Preview/Fill
                        </button>
                    </Link>
                </div>
            ) : null
            }
        </div>

    );
};
