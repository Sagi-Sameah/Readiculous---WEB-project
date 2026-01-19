#
# from pymongo.mongo_client import MongoClient
# from pymongo.server_api import ServerApi
#
# uri = "mongodb+srv://sagisa:WebProject16@cluster0.o0f3cvg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
#
# # Create a new client and connect to the server
# client = MongoClient(uri, server_api=ServerApi('1'))
#
# # Send a ping to confirm a successful connection
# try:
#     client.admin.command('ping')
#     print("Pinged your deployment. You successfully connected to MongoDB!")
# except Exception as e:
#     print(e)

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Database connection URI
uri = os.getenv('DB_URI')

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
def check_connection():
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(f"Error connecting to the database: {e}")

if __name__ == "__main__":
    check_connection()
