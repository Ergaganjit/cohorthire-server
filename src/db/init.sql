-- Enable foreign key support
PRAGMA foreign_keys = ON;


-- Create the candidates table
CREATE TABLE IF NOT EXISTS candidates (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  jobId INTEGER NOT NULL,
  resume TEXT,
  coverLetter TEXT,
  applicationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'applied',
  FOREIGN KEY (jobId) REFERENCES jobs(id)
);

-- Insert test data into candidates table
INSERT INTO candidates (
  name, email, phone, jobId, resume, coverLetter, status
) VALUES
('John Doe', 'john.doe@example.com', '555-111-2222', 1, 'john_doe_resume.pdf', 'john_doe_cover_letter.pdf', 'applied'),
('Jane Smith', 'jane.smith@example.com', '555-333-4444', 2, 'jane_smith_resume.pdf', NULL, 'applied'),
('Bob Brown', 'bob.brown@example.com', '555-777-8888', 16, 'bob_brown_resume.pdf', NULL, 'applied');
