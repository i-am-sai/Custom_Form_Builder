import React, { useState, useRef } from 'react';

const ClozeQuestion = ({ questionIndex, questionData, updateQuestionData }) => {
    const [paragraph, setParagraph] = useState(questionData.data?.paragraph || '');
    const [options, setOptions] = useState(questionData.data?.options || []);
    const [selectedWord, setSelectedWord] = useState('');

    const paragraphRef = useRef(null);

    const handleParagraphChange = () => {
        const paragraphText = paragraphRef.current.innerText;
        setParagraph(paragraphText);
        updateQuestionData(questionIndex, { ...questionData, data: { ...questionData.data, paragraph: paragraphText } });
    };

    const handleUnderline = () => {
        const selection = window.getSelection();
        if (selection) {
            const selectedText = selection.toString().trim();
            if (selectedText !== '') {
                setSelectedWord(selectedText);
            }
        }
    };

    const handleConfirmUnderline = () => {
        setOptions((prevOptions) => [...prevOptions, selectedWord]);
        document.execCommand('underline', false, null); // Underline the selected text
        setSelectedWord('');
        updateQuestionData(questionIndex, { ...questionData, data: { ...questionData.data, options: [...options, selectedWord] } });
    };

    const handleCancelUnderline = () => {
        const selectedText = selectedWord;
        const replacedText = paragraph.replace(`<u>${selectedText}</u>`, selectedText);
        setParagraph(replacedText);
        setSelectedWord('');
    };

    const handleSaveQuestion = () => {
        updateQuestionData(questionIndex, { paragraph, options })
        alert("Question Saved Succesfully")
    }

    return (
        <div className="border-2 p-4 rounded mb-4">

            {/* Cloze Question Preview */}
            <label className="block mb-2 text-gray-700 font-bold text-left">Preview:</label>
            <p className='border-2 rounded-md bg-gray-100 py-5 font-semibold  '>
                {paragraph.split(' ').map((word, index) => {
                    const isUnderlined = options.includes(word);
                    return isUnderlined ? (
                        <span key={index}>
                            {Array.from({ length: word.length }, (_, i) => (
                                <span key={i}>&#95;</span>
                            ))}
                        </span>
                    ) : (
                        <span key={index}>{word} </span>
                    );
                })}
            </p>
            {/* Paragraph Input */}
            <label className="block mb-2 text-gray-700 font-bold text-left">Sentence:</label>
            <div
                ref={paragraphRef}
                onInput={handleParagraphChange}
                onMouseUp={handleUnderline}
                contentEditable
                suppressContentEditableWarning
                className="block w-full rounded-md border-2 -gray-300 py-2 px-3 mb-4 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
            />
            <h1 className='text-sm italic  text-left'>(Underline the word  by selecting it here to convert them into blanks)</h1>




            {/* Options */}
            <label className="block mt-4 text-gray-700 font-bold text-left">Options:</label>
            {options.map((option, index) => (
                <div key={index} className="flex justify-between gap-4 mt-4 w-[500px]">
                    <input
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        readOnly
                        className="flex-1 rounded-md border-2-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
                    />
                    <button
                        type="button"
                        onClick={() => setOptions((prevOptions) => prevOptions.filter((_, i) => i !== index))}
                    >
                        ❌
                    </button>
                </div>
            ))}

            {/* Confirmation Popup */}
            {selectedWord && (
                <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded">
                        <p>Do you want to underline the selected word?</p>
                        <button
                            type="button"
                            onClick={handleConfirmUnderline}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            onClick={handleCancelUnderline}
                            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            No
                        </button>
                    </div>
                </div>
            )}
            {/* Save Question Button */}
            <div className="text-center"> {/* Wrap the button in a div and add 'text-center' class */}
                <button
                    onClick={handleSaveQuestion}
                    className="bg-blue-500 hover:bg-blue-200 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-5"
                >
                    Save Question
                </button>
            </div>
        </div>
    );
};

export default ClozeQuestion;
