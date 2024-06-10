-- -- jobs table 
-- --Run: wrangler d1 execute cohorthire-db --file=./init.sql
CREATE TABLE IF NOT EXISTS jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  jobTitle TEXT NOT NULL,
  company TEXT NOT NULL,
  numberOfOpenings INTEGER NOT NULL,
  country TEXT NOT NULL,
  language TEXT NOT NULL,
  location TEXT NOT NULL,
  jobType TEXT NOT NULL,
  schedule TEXT NOT NULL,
  pay TEXT NOT NULL,
  supplementalPay TEXT,
  benefits TEXT,
  jobDescription TEXT NOT NULL,
  applicationMethod TEXT NOT NULL,
  requireResume INTEGER NOT NULL,
  applicationUpdates INTEGER NOT NULL,
  candidatesContactEmail TEXT NOT NULL,
  applicationDeadline DATE NOT NULL,
  candidatesContactPhone TEXT NOT NULL,
  flexibleLanguageRequirement INTEGER NOT NULL,
  hiringTimeline TEXT NOT NULL,
  expectedStartDate DATE NOT NULL,
  sponsorship INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Test data
INSERT INTO jobs (
  jobTitle, company, numberOfOpenings, country, language, location, jobType, schedule, pay, 
  supplementalPay, benefits, jobDescription, applicationMethod, requireResume, applicationUpdates, 
  candidatesContactEmail, applicationDeadline, candidatesContactPhone, flexibleLanguageRequirement, 
  hiringTimeline, expectedStartDate, sponsorship
) VALUES
('Software Engineer', 'TechCorp', 5, 'USA', 'English', 'Remote', 'Full-time', 'Flexible', '100,000 - 120,000 USD', 
 'Stock Options', 'Health, Dental, Vision', 'Develop and maintain software applications', 'Online', 1, 1, 
 'jobs@techcorp.com', '2024-08-01', '555-123-4567', 1, '2 months', '2024-09-01', 0),
('Marketing Specialist', 'MarketMinds', 3, 'Canada', 'English', 'Toronto', 'Part-time', 'Morning Shift', '50,000 - 60,000 CAD', 
 NULL, 'Health, Dental', 'Create and manage marketing campaigns', 'Email', 0, 0, 
 'hr@marketminds.ca', '2024-07-15', '555-765-4321', 0, 'Immediate', '2024-07-20', 0),
('Data Analyst', 'DataPros', 2, 'UK', 'English', 'London', 'Contract', 'Day Shift', '40,000 - 50,000 GBP', 
 'Bonus', NULL, 'Analyze and interpret complex data sets', 'Online', 1, 1, 
 'careers@datapros.co.uk', '2024-06-30', '555-321-6548', 0, '1 month', '2024-07-15', 1),
('Product Manager', 'InnovateInc', 4, 'Germany', 'German', 'Berlin', 'Full-time', 'Flexible', '70,000 - 90,000 EUR', 
 'Profit Sharing', 'Health, Pension', 'Lead product development cycles', 'Website', 1, 1, 
 'apply@innovateinc.de', '2024-09-01', '555-987-6543', 1, '3 months', '2024-10-01', 1);


-- candidates table

-- Create the new table with jobId allowing NULL and having a foreign key constraint
CREATE TABLE IF NOT EXISTS candidates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  resume TEXT,
  coverLetter TEXT,
  applicationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'applied'
);

INSERT INTO candidates (
  name, email, phone, resume, coverLetter, status
) VALUES
('John Doe', 'john.doe@example.com', '555-111-2222', 'john_doe_resume.pdf', 'john_doe_cover_letter.pdf', 'applied'),
('Jane Smith', 'jane.smith@example.com', '555-333-4444', 'jane_smith_resume.pdf', NULL, 'applied'),
('Bob Brown', 'bob.brown@example.com', '555-777-8888',  'bob_brown_resume.pdf', NULL, 'applied'),
('Bob Brown', 'bob.brown@example.com', '555-777-8888',  'bob_brown_resume.pdf', NULL, 'applied'),
('Charlie Adams', 'charlie.adams@example.com', '555-999-0000',  'charlie_adams_resume.pdf', 'charlie_adams_cover_letter.pdf', 'applied');

-- Junction table for linking candidates and jobs

CREATE TABLE IF NOT EXISTS candidate_jobs (
  candidateId INTEGER NOT NULL,
  jobId INTEGER NOT NULL,
  PRIMARY KEY (candidateId, jobId),
  FOREIGN KEY (candidateId) REFERENCES candidates(id),
  FOREIGN KEY (jobId) REFERENCES jobs(id)
);