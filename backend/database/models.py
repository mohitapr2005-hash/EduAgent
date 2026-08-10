from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Date,
    ForeignKey,
    Text
)

from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from database.base import Base


# ==========================
# USERS
# ==========================

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    firebase_uid = Column(
        String,
        unique=True,
        nullable=False
    )

    name = Column(String)

    email = Column(
        String,
        unique=True,
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    courses = relationship("Course", back_populates="user")


# ==========================
# COURSES
# ==========================

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    title = Column(String, nullable=False)

    description = Column(Text)
    roadmap_json = Column(Text)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    user = relationship("User", back_populates="courses")

    lessons = relationship(
        "Lesson",
        back_populates="course"
    )

    progress = relationship(
        "Progress",
        back_populates="course"
    )

    quizzes = relationship(
        "QuizScore",
        back_populates="course"
    )

    videos = relationship(
        "Video",
        back_populates="course"
    )


# ==========================
# LESSONS
# ==========================

class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True)

    course_id = Column(
        Integer,
        ForeignKey("courses.id")
    )

    week = Column(Integer)

    title = Column(String)

    course = relationship(
        "Course",
        back_populates="lessons"
    )


# ==========================
# PROGRESS
# ==========================

class Progress(Base):
    __tablename__ = "progress"

    id = Column(Integer, primary_key=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    course_id = Column(
        Integer,
        ForeignKey("courses.id")
    )

    completed_week = Column(
        Integer,
        default=0
    )

    last_opened = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    course = relationship(
        "Course",
        back_populates="progress"
    )


# ==========================
# QUIZ SCORES
# ==========================

class QuizScore(Base):
    __tablename__ = "quiz_scores"

    id = Column(Integer, primary_key=True)

    course_id = Column(
        Integer,
        ForeignKey("courses.id")
    )

    week = Column(Integer)

    score = Column(Integer)

    course = relationship(
        "Course",
        back_populates="quizzes"
    )


# ==========================
# VIDEOS
# ==========================

class Video(Base):
    __tablename__ = "videos"

    id = Column(Integer, primary_key=True)

    course_id = Column(
        Integer,
        ForeignKey("courses.id")
    )

    week = Column(Integer)

    video_path = Column(String)

    course = relationship(
        "Course",
        back_populates="videos"
    )

    # ==========================
# INTERVIEWS
# ==========================

class Interview(Base):
    __tablename__ = "interviews"

    id = Column(Integer, primary_key=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    topic = Column(String)

    score = Column(Integer)

    feedback = Column(Text)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    # ==========================
# USER PROFILE
# ==========================



class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True)

    firebase_uid = Column(
        String,
        unique=True,
        nullable=False
    )

    full_name = Column(String)
    university = Column(String)
    target_company = Column(String)
    github = Column(String)
    linkedin = Column(String)
    skills = Column(Text)
    bio = Column(Text)
    photo_url = Column(Text)



class UserStats(Base):
    __tablename__ = "user_stats"

    id = Column(Integer, primary_key=True, index=True)

    firebase_uid = Column(String, unique=True, index=True)

    courses = Column(Integer, default=0)
    lessons_completed = Column(Integer, default=0)
    quizzes = Column(Integer, default=0)
    ai_questions = Column(Integer, default=0)
    coding_interviews = Column(Integer, default=0)
    resume_checks = Column(Integer, default=0)

    xp = Column(Integer, default=0)
    coins = Column(Integer, default=0)
    level = Column(Integer, default=1)
    streak = Column(Integer, default=0)


class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)

    firebase_uid = Column(String, index=True)

    question = Column(Text)

    answer = Column(Text)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )


    from sqlalchemy import Date

class AIUsage(Base):
    __tablename__ = "ai_usage"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    feature = Column(
        String,
        nullable=False
    )

    used_count = Column(
        Integer,
        default=0
    )

    daily_limit = Column(
        Integer,
        nullable=False
    )

    last_reset = Column(
        Date,
        nullable=False
    )