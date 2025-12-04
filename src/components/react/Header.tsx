import React from 'react'

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`header ${className}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <i className="fas fa-brain fa-beat-fade"></i>
            <div className="logo-text">
              <h1>My Grammar Struggle Notes</h1>
              <p>Personal Notes</p>
            </div>
          </div>
          <a 
            href="https://ssccomputernote.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              textDecoration: 'none'
            }}
          >
            <i className="fas fa-laptop-code"></i>
            <span>My Computer Notes</span>
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header