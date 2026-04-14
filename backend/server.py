from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

# Admin password (hardcoded as per requirements)
ADMIN_PASSWORD = "admin123"

# ---------- Models ----------

class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    excerpt: str = ""
    content: str = ""
    category: str = ""
    thumbnail: str = ""
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    published: bool = True

class BlogPostCreate(BaseModel):
    title: str
    excerpt: str = ""
    content: str = ""
    category: str = ""
    thumbnail: str = ""
    published: bool = True

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    thumbnail: Optional[str] = None
    published: Optional[bool] = None

class AdminVerify(BaseModel):
    password: str

class AdminVerifyResponse(BaseModel):
    success: bool
    message: str

# ---------- Admin Routes ----------

@api_router.post("/admin/verify", response_model=AdminVerifyResponse)
async def verify_admin(data: AdminVerify):
    if data.password == ADMIN_PASSWORD:
        return AdminVerifyResponse(success=True, message="Access granted")
    raise HTTPException(status_code=401, detail="Invalid password")

# ---------- Blog Routes ----------

@api_router.get("/blogs", response_model=List[BlogPost])
async def get_blogs(published_only: bool = False):
    query = {"published": True} if published_only else {}
    blogs = await db.blogs.find(query, {"_id": 0}).sort("created_at", -1).to_list(100)
    return blogs

@api_router.get("/blogs/{blog_id}", response_model=BlogPost)
async def get_blog(blog_id: str):
    blog = await db.blogs.find_one({"id": blog_id}, {"_id": 0})
    if not blog:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return blog

@api_router.post("/blogs", response_model=BlogPost, status_code=201)
async def create_blog(data: BlogPostCreate):
    blog = BlogPost(**data.model_dump())
    doc = blog.model_dump()
    await db.blogs.insert_one(doc)
    return blog

@api_router.put("/blogs/{blog_id}", response_model=BlogPost)
async def update_blog(blog_id: str, data: BlogPostUpdate):
    update_data = {k: v for k, v in data.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
    result = await db.blogs.update_one({"id": blog_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Blog post not found")
    blog = await db.blogs.find_one({"id": blog_id}, {"_id": 0})
    return blog

@api_router.delete("/blogs/{blog_id}")
async def delete_blog(blog_id: str):
    result = await db.blogs.delete_one({"id": blog_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return {"message": "Blog post deleted", "id": blog_id}

# ---------- Root ----------

@api_router.get("/")
async def root():
    return {"message": "Psychiatrist Website API"}

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
