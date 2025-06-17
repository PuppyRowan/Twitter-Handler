from typing import Optional
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

# Define data models (would normally come from database/models.py)
class QueueItem(BaseModel):
    id: str
    filename: Optional[str] = None
    text_content: Optional[str] = None
    transcript: Optional[str] = None
    sound_type: Optional[str] = None
    caption: str
    tone: str
    status: str  # "pending", "approved", "posted", "rejected"
    created_at: datetime

# Mock data until DB is implemented
mock_queue = [
    QueueItem(
        id="1",
        filename="sample-whimper-001.wav",
        transcript="Please use me for your entertainment",
        sound_type="whimper",
        caption="Listen to how pathetic she sounds begging for attention.",
        tone="auto",
        status="pending",
        created_at=datetime.now()
    ),
    QueueItem(
        id="2",
        filename="beg-clip-2.ogg",
        transcript="I need to be exposed online",
        sound_type="beg",
        caption="She claims she \"needs\" to be exposed. Let's oblige.",
        tone="teasing",
        status="approved",
        created_at=datetime.now()
    ),
    QueueItem(
        id="3",
        text_content="I've been naughty again and need to be punished",
        caption="My pet has been misbehaving. Public humiliation seems appropriate.",
        tone="possessive",
        status="posted",
        created_at=datetime.now()
    )
]

@router.get("/")
async def get_queue(status: Optional[str] = Query(None)):
    """
    Get the current post queue, optionally filtered by status.
    
    Args:
        status: Filter by item status (pending, approved, posted, rejected)
    """
    if status:
        filtered_queue = [item for item in mock_queue if item.status == status]
        return {"queue": filtered_queue, "count": len(filtered_queue)}
    return {"queue": mock_queue, "count": len(mock_queue)}

@router.get("/{item_id}")
async def get_queue_item(item_id: str):
    """Get details for a specific queue item."""
    for item in mock_queue:
        if item.id == item_id:
            return item
    raise HTTPException(status_code=404, detail=f"Queue item {item_id} not found")

@router.put("/{item_id}/approve")
async def approve_item(item_id: str):
    """Approve a queue item for posting."""
    for item in mock_queue:
        if item.id == item_id:
            if item.status == "pending":
                item.status = "approved"
                return {"status": "success", "message": f"Item {item_id} approved"}
            else:
                raise HTTPException(status_code=400, 
                                  detail=f"Item {item_id} is not pending (current status: {item.status})")
    raise HTTPException(status_code=404, detail=f"Queue item {item_id} not found")

@router.put("/{item_id}/reject")
async def reject_item(item_id: str):
    """Reject a queue item."""
    for item in mock_queue:
        if item.id == item_id:
            if item.status in ["pending", "approved"]:
                item.status = "rejected"
                return {"status": "success", "message": f"Item {item_id} rejected"}
            else:
                raise HTTPException(status_code=400, 
                                  detail=f"Cannot reject item with status: {item.status}")
    raise HTTPException(status_code=404, detail=f"Queue item {item_id} not found")

@router.put("/{item_id}/post")
async def post_item(item_id: str):
    """Post the item to Twitter immediately."""
    for item in mock_queue:
        if item.id == item_id:
            if item.status == "approved":
                # In production, this would call the twitter service
                item.status = "posted"
                return {
                    "status": "success",
                    "message": f"Item {item_id} posted to Twitter",
                    "tweet_url": "https://twitter.com/user/status/123456789"
                }
            else:
                raise HTTPException(status_code=400, 
                                  detail=f"Only approved items can be posted (current status: {item.status})")
    raise HTTPException(status_code=404, detail=f"Queue item {item_id} not found")

@router.put("/{item_id}/caption")
async def update_caption(item_id: str, caption: str):
    """Update the caption for a queue item."""
    for item in mock_queue:
        if item.id == item_id:
            if item.status not in ["posted", "rejected"]:
                item.caption = caption
                return {"status": "success", "message": f"Caption updated for item {item_id}"}
            else:
                raise HTTPException(status_code=400, 
                                  detail="Cannot update caption for posted or rejected items")
    raise HTTPException(status_code=404, detail=f"Queue item {item_id} not found")
