from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
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

    completed_week = Column(Integer)

    last_opened = Column(
        DateTime(timezone=True),
        server_default=func.now()
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