// FormPreview.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';

export const PreviewForm = (props) => {
    const location = useLocation()
    const [formId, setformid] = useState("")

    const [data, setData] = useState({})
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [answer, setAnswer] = useState([])
    const [response, setResponse] = useState([])
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [dropCategory, setDropCategory] = useState([]);
    const navigate = useNavigate()


    useEffect(() => {

        setformid(location.search.replace("?formId=", ""))
        console.log("formid", formId);
        if (formId) {

            fetch(`https://backend-i-am-sai.koyeb.app/forms/?formId=${formId}`)
                .then((res) => res.json())
                .then((res) => {
                    console.log('Data from server:', res);
                    setData(res);
                });
        }
    }, [formId]);



    useEffect(() => {
        const initialItems = data?.questions?.map((question) => {
            if (question.type === 'Categorize') {
                return {
                    question,
                    items: question.data.items.map((item, index) => ({
                        id: `item-${index}`,
                        content: item.name,
                        category: null,
                    })),
                };
            } else {
                return null;
            }
        });
        setItems(initialItems?.filter(Boolean) || []);
    }, [data]);


    useEffect(() => {
        const initialCategories = data?.questions?.map((question) => {
            if (question.type === 'Categorize') {
                return question.data.categories;
            } else {
                return null;
            }
        });
        setCategories(initialCategories?.filter(Boolean) || []);
    }, [data]);


    const handleSubmit = () => {
        console.log("Response is :", data);
        if (!name || !email) {
            alert("Enter you name and email id.");
            return;
        }

        // Check if the description is provided and not empty
        if (!data.header || !data.header.description.trim()) {
            alert("Header description is required.");
            return;
        }

        let obj = { name, email, formId, response }
        fetch(`https://backend-i-am-sai.koyeb.app/response/create`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(obj)
        })
            .then((res) => res.json())
            .then((res) => {
                alert("Response submitted successfully")
                navigate("/thankyou")
            })
            .catch((err) => console.log(err))
    };


    const replaceWordsWithUnderscores = (paragraph, options) => {
        return paragraph.split(' ').map((word, index) => {
            const isUnderlined = options?.includes(word);
            return isUnderlined ? (
                <span key={index}>
                    {Array.from({ length: word.length }, (_, i) => (
                        <span key={i}>&#95;</span>
                    ))}
                </span>
            ) : (
                <span key={index}>{word} </span>
            );
        });
    };

    const handleAnswerSave = (index, data) => {
        const updatedResponse = [...response];
        updatedResponse[index] = { ...updatedResponse[index] = data };
        setResponse(updatedResponse)
        alert("Answer Saved Successfully")
        // window.location.href = "/thankyou"
    }


    const handleDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const sourceIndex = result.source.index;
        const sourceQuestionIndex = parseInt(result.source.droppableId.split('-')[1]);
        const destinationCategory = result.destination.droppableId.split('-')[1];

        if (
            Number.isNaN(sourceQuestionIndex) ||
            !items[sourceQuestionIndex]?.items ||
            !destinationCategory
        ) {
            return;
        }

        const updatedItems = [...items];
        const draggedItem = updatedItems[sourceQuestionIndex].items[sourceIndex];

        const questionCategories = categories[sourceQuestionIndex];
        if (!questionCategories) {
            return;
        }

        // Find the correct category index in the categories array
        const categoryIndex = questionCategories.indexOf(destinationCategory);

        if (categoryIndex === undefined || categoryIndex === -1) {
            return;
        }
        // Set the category of the dragged item
        draggedItem.category = questionCategories[categoryIndex];

        // Update the 'dropCategory' state to store the dropped item
        setDropCategory((prevDropCategory) => [...prevDropCategory, draggedItem]);

        // Remove the dragged item from the 'items' state
        updatedItems[sourceQuestionIndex].items.splice(sourceIndex, 1);
        setItems(updatedItems);
    };

    return (

        <div className='border-2 p-10 w-[800px] m-auto mb-20 text-left mt-10 bg-gray-100'>
            {Object.keys(data).length !== 0 ? (
                <div>
                    <div className='border-2 p-5 mb-10'>
                        <h1 className='text-2xl font-semibold mb-4'>{data?.header?.heading || ''}</h1>
                        <p className='text-gray-600'>{data?.header?.description || ''}</p>
                        <h1 className='text-sm italic mt-2'>Note:(Click the save button after filling the answer of each Question)</h1>
                    </div>
                    <div className='border-2 p-4 rounded mb-4'>
                        <h1 className='text-xl font-bold mb-4 '>Enter Your Details :</h1>
                        <div className=' pb-5 flex justify-between w-[400px]'>
                            <div >
                                <h1 className='text-xl font-bold mb-1'>Name:</h1>
                                <input
                                    type="text"
                                    placeholder={`Enter your name`}
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    className="flex-1 rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
                                />
                            </div>
                            <div>
                                <h1 className='text-xl font-bold mb-1'>Email:</h1>
                                <input
                                    type="email"
                                    placeholder={`Enter your Email`}
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    className="flex-1 rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
                                />
                            </div>
                        </div>
                    </div>
                    {/* Questions */}
                    {data?.questions?.map((question, index) => (
                        <div key={index + question} className='border-2 p-4 rounded mb-4'>
                            {/* Display question based on its type */}
                            <h1 className='text-xl font-bold mb-4 underline'>Question No: {index + 1}</h1>
                            <DragDropContext onDragEnd={handleDragEnd}>
                                {question.type === 'Categorize' && (
                                    <div>
                                        <h1 className='text-lg font-bold mb-4'>{question.data.questionTitle}:</h1>
                                        <Droppable droppableId={`question-${index}`} direction='horizontal'>
                                            {(provided) => (

                                                <div {...provided.droppableProps} ref={provided.innerRef} className='flex mb-5'>
                                                    {items[index]?.items.map((el, i) => (
                                                        <Draggable key={el.id} draggableId={el.id} index={i}>
                                                            {(provided) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className='font-bold ml-5 p-1.5 rounded-full border-2 border-gray-900 border-solid border-opacity-100 border-2 mb-1 mt-1
                                    bg-[#aa82ef]'
                                                                >
                                                                    {el.content}
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>

                                        {/* Render categories */}
                                        {categories ? (
                                            <div className='flex p-5'>
                                                {categories[index]?.map((category, i) => (
                                                    <div key={i} className='h-[200px] border-2 border-gray-900 ml-5 w-[200px] text-center rounded-md mb-2 '>
                                                        <div className='border-2 p-1.5 mb-2 font-bold bg-red-400'>{category}</div>
                                                        <Droppable droppableId={`category-${category}`} direction='vertical'>
                                                            {(provided) => (
                                                                <div {...provided.droppableProps} ref={provided.innerRef} className='rounded-full font-bold  ' >
                                                                    {dropCategory?.map((item, itemIndex) => {
                                                                        if (item.category === category) {
                                                                            return (
                                                                                <Draggable key={item.id} draggableId={item.id} index={itemIndex}>
                                                                                    {(provided) => (
                                                                                        <div
                                                                                            ref={provided.innerRef}
                                                                                            {...provided.draggableProps}
                                                                                            {...provided.dragHandleProps}
                                                                                            className='bg-transparent p-2 rounded-full border-2 border-gray-900 border-solid border-opacity-100 border-2 mb-1 mt-1 bg-blue-500'
                                                                                        >
                                                                                            {item.content}
                                                                                        </div>
                                                                                    )}
                                                                                </Draggable>
                                                                            );
                                                                        } else {
                                                                            return null;
                                                                        }
                                                                    })}
                                                                    {provided.placeholder}
                                                                </div>
                                                            )}
                                                        </Droppable>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div>Loading Categories...</div>
                                        )}
                                        <h1 className='text-sm italic'>(Drag the Item and Drop in its respective category)</h1>
                                        <button
                                            onClick={() => handleAnswerSave(index, { questionNo: index + 1, answer: dropCategory })}
                                            className='bg-blue-600 mt-5 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                        >
                                            Save Answer
                                        </button>
                                    </div>
                                )}
                            </DragDropContext>
                            {question.type === 'Cloze' && (
                                <div>
                                    <h1 className='text-xl font-bold mb-4'> Fill in the blanks.</h1>
                                    <div className='flex gap-2 mt-2'>
                                        <h1 className='text-lg font-semibold mt-1'>Options:</h1>
                                        {question.data.options.map((el) => (
                                            <button className='font-bold ml-5  rounded-full border-2 p-1 border-gray-900 border-solid border-opacity-100 border-2 mb-1  '>{el}</button>
                                        ))}
                                    </div>
                                    <div className='flex flex-wrap gap-2 mt-1'>
                                        {replaceWordsWithUnderscores(question.data.paragraph, question.data.options)}
                                    </div>
                                    <div className='flex gap-5 mt-4 '>
                                        <input
                                            onChange={(e) => setAnswer(e.target.value)}
                                            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
                                            type='text'
                                            placeholder={`Enter the answer`}
                                        />
                                    </div>
                                    <h1 className='text-sm italic mt-2'>(Enter the answers in correct sequence separated by commas)</h1>
                                    <button
                                        onClick={() => handleAnswerSave(index, { questionNo: index + 1, answer: answer })}
                                        className='bg-blue-600 mt-5 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                    >Save Answer</button>
                                </div>
                            )}

                            {question.type === 'Comprehension' && (
                                <div>
                                    <h1 className='text-xl font-bold mb-4'>{question.data.instructions} </h1>
                                    <h1 className='text-md font-semibold mb-4'>{question.data.passage} </h1>
                                    <h1 className='text-xl font-bold mb-2'>MCQ</h1>
                                    {question.data.subQuestions.map((el, i) => (
                                        <div key={i}>
                                            <>
                                                <h1 className='text-md font-bold mb-2' >{i + 1}.  {el.question}</h1>
                                                <div>
                                                    {el.options.map((item, j) => (
                                                        <div key={j} className='flex items-center mb-2'>
                                                            <input
                                                                onChange={(e) => setAnswer(item)}
                                                                type='radio' name={`MCQ_${index}_${i}`}
                                                                className='form-radio h-4 w-4 text-blue-600'
                                                            />
                                                            <label className='ml-2 '>{item}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        </div>
                                    ))}

                                    <button
                                        onClick={() => handleAnswerSave(index, { questionNo: index + 1, answer: answer })}
                                        className='bg-blue-600 mt-5 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                    >Save Answer</button>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Submit Button */}
                    <Link to={`/thankyou`} >
                        <button
                            onClick={handleSubmit}
                            className='bg-blue-500  hover:bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
                            Submit Form
                        </button>
                    </Link>
                </div>) : <h1 className='text-2xl font-semibold mb-4'>Form is Loading. Please wait....... </h1>}
        </div>

    );
};

