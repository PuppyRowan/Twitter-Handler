CREATE TABLE IF NOT EXISTS submissions (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255),
    storage_path VARCHAR(255),
    text_content TEXT,
    transcript TEXT,
    sound_type VARCHAR(50),
    caption TEXT NOT NULL,
    tone VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- New fields for SMS
    source VARCHAR(20),
    phone_number VARCHAR(20),
    message_sid VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS tweets (
    id SERIAL PRIMARY KEY,
    submission_id INTEGER NOT NULL,
    tweet_id VARCHAR(50) NOT NULL,
    text TEXT NOT NULL,
    url VARCHAR(255) NOT NULL,
    posted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (submission_id) REFERENCES submissions(id)
);

CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    submission_id INTEGER NOT NULL,
    recipient VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    sent BOOLEAN NOT NULL DEFAULT FALSE,
    delivery_status VARCHAR(20),
    message_sid VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    sent_at TIMESTAMP,
    FOREIGN KEY (submission_id) REFERENCES submissions(id)
);

-- Indexes
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_submissions_created_at ON submissions(created_at);
CREATE INDEX idx_tweets_submission_id ON tweets(submission_id);
CREATE INDEX idx_notifications_submission_id ON notifications(submission_id);
CREATE INDEX idx_submissions_source ON submissions(source);
CREATE INDEX idx_submissions_phone_number ON submissions(phone_number);