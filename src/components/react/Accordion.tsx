import { useState, useRef, useEffect } from 'react'

interface AccordionProps {
  id: string;
  title: string;
  content: string;
  className?: string;
}

const Accordion: React.FC<AccordionProps> = ({ 
  id, 
  title, 
  content, 
  className = ''
}) => {
  const [isActive, setIsActive] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      if (isActive) {
        contentRef.current.style.maxHeight = contentRef.current.scrollHeight + "px"
      } else {
        contentRef.current.style.maxHeight = '0'
      }
    }
  }, [isActive])

  return (
    <section className={`section ${isActive ? 'active' : ''} ${className}`} id={id}>
      <h2 
        className="section-title"
        onClick={() => setIsActive(!isActive)}
      >
        {title}
        <i className={`fas fa-chevron-${isActive ? 'up' : 'down'} accordion-arrow`}></i>
      </h2>
      <div className="accordion-content" ref={contentRef}>
        <div 
          className="content-wrapper"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  )
}

export default Accordion