from database.database import engine
from sqlalchemy import inspect

inspector = inspect(engine)

print("Tables in database:")

for table in inspector.get_table_names():
    print("-", table)