import { useState, useEffect } from 'react'
import { notes } from '../../data/notes.js'

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onToggle, 
  className = '' 
}) => {
  const [activeSection, setActiveSection] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.section')
      let current = ''

      sections.forEach(section => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 150 && rect.bottom >= 150) {
          current = section.id
        }
      })

      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      // Calculate the position considering the header height
      const headerHeight = 100;
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    if (isMobile) {
      onToggle()
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && isMobile && (
        <div 
          className="sidebar-overlay"
          onClick={onToggle}
        />
      )}
      
      <aside className={`sidebar ${isOpen ? 'open' : ''} ${className}`}>
        <div className="sidebar-header">
          <div className="sidebar-title">
            <i className="a-duotone fa-solid fa-book-open fa-beat-fade"></i>
            <h3>Study Topics</h3>
          </div>
          <div className="sidebar-actions">
            <button className="sidebar-toggle" onClick={onToggle}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      
        <div className="sidebar-content">
          <div className="topics-count">
            <i className="fas fa-list-check"></i>
            <span>{notes.length} Topics Available</span>
          </div>
          
          <nav className="sidebar-nav">
            {notes.map((note: Note, index: number) => (
              <a 
                key={note.id}
                href={`#${note.id}`}
                className={`nav-item ${activeSection === note.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(note.id)
                }}
              >
                <span className="nav-number">{index + 1}</span>
                <span className="nav-text">{note.title}</span>
                {activeSection === note.id && (
                  <i className="fas fa-chevron-right active-indicator"></i>
                )}
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </>
  )
}

export default Sidebar