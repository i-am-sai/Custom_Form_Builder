import React, { useState } from 'react';

const CategorizeQuestion = ({ questionIndex, questionData, updateQuestionData }) => {
    const [questionTitle, setQuestionTitle] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [mediaOption, setMediaOption] = useState('none');
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([{ name: '', category: '' }]);

    const handleImageChange = (e) => {
        // Update the state with the selected image URL
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageURL(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteItem = (index) => {
        // Remove the item and its category from the list
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    const handleQuestionTitleChange = (e) => {
        // Update the state with the question title
        setQuestionTitle(e.target.value);
    };

    const handleCategoryChange = (index, value) => {
        // Update the state with the category at the given index
        const updatedCategories = [...categories];
        updatedCategories[index] = value;
        setCategories(updatedCategories);
    };

    const handleItemChange = (index, key, value) => {
        // Update the state with the item name and its category at the given index
        const updatedItems = [...items];
        updatedItems[index][key] = value;
        setItems(updatedItems);
    };

    const handleAddItem = () => {
        // Add a new item and assign it to the first category
        setItems([...items, { name: '', category: categories[0] }]);
    };

    const handleSaveQuestion = () => {
        updateQuestionData(questionIndex, { categories, items, questionTitle });
        alert('Question Saved Successfully');
    };

    return (
        <div className="bg-gray-100 p-4 rounded-lg">
            {/* Question Title Input */}
            <label className="block mb-2 text-gray-800 font-bold text-lg"> Question Title :</label>
            <input
                type="text"
                placeholder="Enter Question Title"
                value={questionTitle}
                onChange={handleQuestionTitleChange}
                className="block w-full rounded-md border-gray-300 py-2 px-3 mb-4 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />

            {/* Media Option */}
            <div className="flex items-center mb-4">
                <label className="mr-5 block text-gray-800 font-bold text-lg">Image:</label>
                <select
                    value={mediaOption}
                    onChange={(e) => setMediaOption(e.target.value)}
                    className="w-[80px] block w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="none">None</option>
                    <option value="image">Image</option>
                </select>
            </div>

            {/* Conditional rendering for image upload input */}
            {mediaOption === 'image' && (
                <div className="mb-4">
                    <label htmlFor="headerImage" className="text-lg font-semibold mr-6">
                        Upload Question Image (Optional):
                    </label>
                    <input id="headerImage" type="file" accept="image/*" onChange={handleImageChange} />
                </div>
            )}

            {/* Categories Input */}
            <div className="flex flex-col gap-4 mt-4">
                <label className="text-gray-800 font-bold text-lg">Categories :</label>
                <input
                    type="text"
                    name="category1"
                    placeholder="Enter Category 1"
                    value={categories[0]}
                    onChange={(e) => handleCategoryChange(0, e.target.value)}
                    className="w-[250px] rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <input
                    type="text"
                    name="category2"
                    placeholder="Enter Category 2"
                    value={categories[1]}
                    onChange={(e) => handleCategoryChange(1, e.target.value)}
                    className="w-[250px] rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            {/* Items and Categories Assignment */}
            <div className="mt-4">
                <div className="flex justify-between w-[320px]">
                    <label className="text-gray-800 font-bold text-lg">Item</label>
                    <label className="text-gray-800 font-bold text-left-lg">Category</label>
                </div>
                {items.map((item, index) => (
                    <div key={index} className="flex justify-between gap-4 mt-4 w-[500px]">
                        <input
                            type="text"
                            placeholder={`Item ${index + 1}`}
                            value={item.name}
                            onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                            className="flex-1 rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <select
                            value={item.category}
                            onChange={(e) => handleItemChange(index, 'category', e.target.value)}
                            className="flex-1 rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select the Category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        <button type="button" onClick={() => handleDeleteItem(index)}>
                            ❌
                        </button>
                    </div>
                ))}
            </div>

            {/* Add Item Button */}
            <button
                type="button"
                onClick={handleAddItem}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900"
            >
                Add Item
            </button>

            {/* Save Question Button */}
            <button
                onClick={handleSaveQuestion}
                className="mt-6 bg-blue-500 hover:bg-[#6e6c72] text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 block mx-auto"
            >
                Save Question
            </button>
        </div>
    );
};

export default CategorizeQuestion;
