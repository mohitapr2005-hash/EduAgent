from database.database import engine
from database.base import Base
import database.models

print("Creating database tables...")

Base.metadata.create_all(bind=engine)

print("Database connected successfully!")