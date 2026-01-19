from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson import ObjectId

uri ="mongodb+srv://sagisa:WebProject16@cluster0.o0f3cvg.mongodb.net/Readiculous_WebProject16"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

# Access the database
db = client["Readiculous_WebProject16"]
users_col = db['users']
books_col = db['books']

# Function to get collection
def get_collection(name):
    return db[name]

# CRUD operations for users
def add_user(user_data):
    try:
        users_col.insert_one(user_data)
    except Exception as e:
        print(f"Error adding user: {e}")

def get_user_by_email(email):
    try:
        return users_col.find_one({"email": email})
    except Exception as e:
        print(f"Error fetching user: {e}")
        return None

def update_user(email, updated_data):
    try:
        users_col.update_one({"email": email}, {"$set": updated_data})
    except Exception as e:
        print(f"Error updating user: {e}")

def delete_user(email):
    try:
        users_col.delete_one({"email": email})
    except Exception as e:
        print(f"Error deleting user: {e}")

# CRUD operations for books (add more as needed)
def add_book(book_data):
    try:
        books_col.insert_one(book_data)
    except Exception as e:
        print(f"Error adding book: {e}")

def get_book_by_title(title):
    try:
        return books_col.find_one({"title": title})
    except Exception as e:
        print(f"Error fetching book: {e}")
        return None

def get_book_by_id(book_id):
    try:
        return books_col.find_one({"_id": book_id})
    except Exception as e:
        print(f"Error fetching book: {e}")
        return None

def update_book(book_id, updated_data):
    try:
        books_col.update_one({"_id": book_id}, {"$set": updated_data})
    except Exception as e:
        print(f"Error updating book: {e}")

def add_comment(book_id, comment):
    try:
        books_col.update_one({"_id": book_id}, {"$push": {"comments": comment}})
    except Exception as e:
        print(f"Error adding comment: {e}")

def get_all_books():
    try:
        return list(books_col.find())
    except Exception as e:
        print(f"Error fetching books: {e}")
        return []
