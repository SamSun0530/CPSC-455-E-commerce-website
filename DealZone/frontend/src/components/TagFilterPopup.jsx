import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { Clear as ClearIcon, Check as CheckIcon } from '@mui/icons-material';
import '../css/TagFilterPopup.css';

const TagFilterPopup = ({ tags, selected, onClose, onConfirm, onClearTags }) => {
  const [selectedTags, setSelectedTags] = useState(selected);

  useEffect(() => { setSelectedTags(selected)}, [selected]);

  const toggleTag = (tag) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  const handleConfirm = () => {
    onConfirm(selectedTags);
    onClose();
  };

  const handleClear = () => {
    setSelectedTags([]);
    onClearTags();
    onClose();
  }

  return (
    <div className="tag-filter-popup">
      <div className="tag-filter-header">
        <IconButton onClick={handleConfirm} className="confirm-btn">
          <CheckIcon />
        </IconButton>
        <IconButton onClick={handleClear} className="close-btn">
          <ClearIcon />
        </IconButton>
      </div>
      {tags.map((tagObject, index) => (
        <div
          key={index}
          className={`tag ${selectedTags.includes(tagObject.tag) ? 'selected' : ''}`}
          onClick={() => toggleTag(tagObject.tag)}
        >
          {tagObject.tag}
        </div>
      ))}
    </div>
  );
};

export default TagFilterPopup;
