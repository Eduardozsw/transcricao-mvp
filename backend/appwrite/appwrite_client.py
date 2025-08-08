import os
from appwrite.client import Client
from appwrite.services.databases import Databases
from appwrite.services.storage import Storage

client = Client()
client.set_endpoint(os.environ["APPWRITE_ENDPOINT"])
client.set_project(os.environ["APPWRITE_PROJECT_ID"])
client.set_key(os.environ["APPWRITE_KEY_ID"])

databases = Databases(client)
storage = Storage(client)