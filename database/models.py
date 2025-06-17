from datetime import datetime
from typing import Optional, List
from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, create_engine, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker

Base = declarative_base()

class Submission(Base):
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    filename = Column(String(255), nullable=True)
    storage_path = Column(String(255), nullable=True)
    text_content = Column(Text, nullable=True)  # For direct text submissions
    transcript = Column(Text, nullable=True)
    sound_type = Column(String(50), nullable=True)
    caption = Column(Text, nullable=False)
    tone = Column(String(50), nullable=False)
    status = Column(String(20), nullable=False, default="pending")  # pending, approved, posted, rejected
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # New fields for SMS tracking
    source = Column(String(20), nullable=True)  # 'audio', 'text', 'sms'
    phone_number = Column(String(20), nullable=True)  # For SMS submissions
    message_sid = Column(String(50), nullable=True)  # Twilio message ID
    
    # Link to tweets if posted
    tweets = relationship("Tweet", back_populates="submission")
    
    # Link to notification messages
    notifications = relationship("Notification", back_populates="submission")

class Tweet(Base):
    __tablename__ = "tweets"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    submission_id = Column(Integer, ForeignKey("submissions.id"), nullable=False)
    tweet_id = Column(String(50), nullable=False)  # The ID from Twitter
    text = Column(Text, nullable=False)
    url = Column(String(255), nullable=False)
    posted_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    
    submission = relationship("Submission", back_populates="tweets")

class Notification(Base):
    __tablename__ = "notifications"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    submission_id = Column(Integer, ForeignKey("submissions.id"), nullable=False)
    recipient = Column(String(50), nullable=False)  # Phone number or other identifier
    message = Column(Text, nullable=False)
    sent = Column(Boolean, default=False)
    delivery_status = Column(String(20), nullable=True)  # delivered, failed, etc.
    message_sid = Column(String(50), nullable=True)  # Twilio message ID
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    sent_at = Column(DateTime, nullable=True)
    
    submission = relationship("Submission", back_populates="notifications")

# Create database engine
def get_engine(db_url="sqlite:///twitter_handler.db"):
    return create_engine(db_url)

def get_session():
    engine = get_engine()
    Session = sessionmaker(bind=engine)
    return Session()

def init_db():
    engine = get_engine()
    Base.metadata.create_all(engine)