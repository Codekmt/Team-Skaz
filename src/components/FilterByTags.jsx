import React, { useState } from 'react';

const FilterByTags = ({ questions }) => {
    const [selectedTag, setSelectedTag] = useState('');

    const handleTagChange = (event) => {
        setSelectedTag(event.target.value);
    };

    const filteredQuestions = questions.filter(question =>
        question.tags.includes(selectedTag)
    );

    return (
        <div>
            <select onChange={handleTagChange} value={selectedTag}>
                <option value="">Select a tag</option>
                {Array.from(new Set(questions.flatMap(question => question.tags))).map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                ))}
            </select>

            <ul>
                {filteredQuestions.map(question => (
                    <li key={question.id}>{question.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default FilterByTags;