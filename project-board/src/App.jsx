import { useState, useEffect } from 'react'
import Papa from 'papaparse'
import './App.css'

function App() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastFetch, setLastFetch] = useState(null)
  const [showBanner, setShowBanner] = useState(true)

  // Public CSV endpoint - no API key needed!
  const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT0pHDCYRN4LrKUqKHicgT_oAWaWQpLgK7cybJMb4dl8gMYWQHS44mJCGFF-jjFHPJ9qgLQvzjqkgjz/pub?output=csv"

  // Fetch projects from Google Sheets
  const fetchProjects = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(SHEET_CSV_URL)
      const csvText = await response.text()

      // Parse CSV
      const parsed = Papa.parse(csvText, { header: true })
      const rows = parsed.data

      // Filter only approved projects
      const approvedProjects = rows
        .filter(row => {
          // Only include rows where Status is "Approved" (case-insensitive)
          const status = row.Status?.toString().toLowerCase().trim()
          return status === 'approved'
        })
        .filter(row => {
          // Make sure the row has actual data (not empty)
          return row.Name || row.Affiliation || row['Please describe your project']
        })
        .map((row, index) => {
          // Get organization/lab field
          const orgField = row['Please indicate the lab or student org you are part of. (If you are part of neither please indicate N/A)'] 
            || row['Student Org/Lab'] 
            || row['Student Organization'] 
            || row['Organization'] 
            || '';
          
          // Only show if it's not empty and not "N/A"
          const organization = orgField && orgField.toLowerCase().trim() !== 'n/a' ? orgField : null;

          return {
            id: `project-${index}-${Date.now()}`,
            name: row.Name || 'Untitled Project',
            description: row['Please describe your project'] || 'No description provided.',
            campus: row.Affiliation || 'Not specified',
            organization: organization
          };
        })

      setProjects(approvedProjects)
      setLastFetch(new Date())
      setLoading(false)
    } catch (err) {
      console.error('Error fetching projects:', err)
      setError('Failed to load projects. Please try again later.')
      setLoading(false)
    }
  }

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <div className="app">
      {showBanner && (
        <div className="top-banner">
          <span>Currently Accepting Project Applications for Spring 26.</span>
          <a
            href="https://forms.gle/4uEEf1T3A3xGRqzo6"
            target="_blank"
            rel="noopener noreferrer"
            className="banner-link"
          >
            Apply now →
          </a>
          <button
            className="close-btn"
            aria-label="Dismiss banner"
            onClick={() => setShowBanner(false)}
          >
            ×
          </button>
        </div>
      )}
      <header className="header">
        <div className="header-content">
          <h1>CICS BuildBoard</h1>
          <p className="subtitle">Collaborate. Create. Code.</p>
        </div>
        <nav className="nav-links">
          <a 
            href="https://forms.gle/q2w2pQnM3SrugtV78" 
            target="_blank" 
            rel="noopener noreferrer"
            className="nav-button interest-button"
          >
            Join a Project
          </a>
          <a 
            href="https://forms.gle/4uEEf1T3A3xGRqzo6" 
            target="_blank" 
            rel="noopener noreferrer"
            className="nav-button proposal-button"
          >
            Propose a Project
          </a>
        </nav>
      </header>

      <main className="main-content">
        {/* About Section */}
        <section className="about-section">
          <h2>About the Program</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                This project board is run under the <strong>MUSIC (Manning Undergraduate Student Impact Council)</strong> Tech and Innovation Subcommittee, working closely with <strong>Dean Keith Marzullo</strong>.
              </p>
              <p>
                We encourage professors, students, and the UMass community to propose new projects or join a project team. This is a great way to build skills and gain project-based experience for students, and an excellent opportunity for professors from various departments to collaborate on innovative initiatives.
              </p>
              <p className="contact-note">
                <strong>Note:</strong> You will be contacted by email when you are selected for a project.
              </p>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <p>📸</p>
                <p className="caption">Tech Team with Dean Keith Marzullo</p>
                <p className="tbd">(Photo TBD)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="projects-section">
          <h2>Available Projects</h2>

        {error && (
          <div className="error-message">
            <h3>⚠️ Error</h3>
            <p>{error}</p>
          </div>
        )}

        {loading && !error && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading available projects...</p>
          </div>
        )}

          {!loading && !error && projects.length === 0 && (
            <div className="empty-state">
              <h3>No Projects Available Yet</h3>
              <p>Check back soon for exciting collaboration opportunities!</p>
              <p className="hint">Have an idea? Click "Propose a Project" above to get started.</p>
            </div>
          )}

          {!loading && !error && projects.length > 0 && (
            <div className="projects-grid">
              {projects.map((project) => (
                <div key={project.id} className="project-card">
                  <div className="project-header">
                    <h3>{project.name}</h3>
                    <span className="campus-badge">{project.campus}</span>
                  </div>
                  {project.organization && (
                    <div className="project-org">
                      <span className="org-icon">🏛️</span>
                      <span className="org-name">{project.organization}</span>
                    </div>
                  )}
                  <p className="project-description">{project.description}</p>
                  <a 
                    href="https://forms.gle/q2w2pQnM3SrugtV78" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="interest-link"
                  >
                    Join This Project →
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>© 2025 CICS BuildBoard | Collaborate. Create. Code.</p>
      </footer>
    </div>
  )
}

export default App
