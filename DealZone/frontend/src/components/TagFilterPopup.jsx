import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { Clear as ClearIcon, Check as CheckIcon } from '@mui/icons-material';
import '../css/TagFilterPopup.css';

const TagFilterPopup = ({ tags, onClose, onConfirm }) => {
  //TODO: filter by the selected tags upon confirmation
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  //TODO
  const handleConfirm = () => {
    onClose();
  };

  return (
    <div className="tag-filter-popup">
      <div className="tag-filter-header">
        <IconButton onClick={handleConfirm} className="confirm-btn">
          <CheckIcon />
        </IconButton>
        <IconButton onClick={onClose} className="close-btn">
          <ClearIcon />
        </IconButton>
      </div>
      {tags.map((tag, index) => (
        <div
          key={index}
          className={`tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
          onClick={() => toggleTag(tag)}
        >
          {tag}
        </div>
      ))}
    </div>
  );
};

export default TagFilterPopup;
