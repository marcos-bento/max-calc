import React, { useState } from 'react';
import './accordion.css';

interface AccordionItem {
    title: string;
    content1: string;
    content2?: string;
    content3?: string;
  }
  
  const Accordion: React.FC<AccordionItem> = ({ title, content1,content2,content3 }) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    const handleToggle = () => {
      setIsExpanded(!isExpanded);
    };
  
    return (
      <div className="accordion-item">
        <button className="accordion-button" onClick={handleToggle}>
          {title}
        </button>
  
        {isExpanded && (
          <div className="accordion-content">
            {content1}
            <br></br><br></br>
            {content2 && content2}
            <br></br><br></br>
            {content3 && content3}
          </div>
        )}
      </div>
    );
  };
  
  export default Accordion;
