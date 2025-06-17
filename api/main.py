from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from api.routes import submit, queue, sms  # Add the sms import

app = FastAPI(
    title="Maple Handler API",
    description="API for audio submission, transcription, captioning, and Twitter posting",
    version="0.1.0",
)

# Add CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register route modules
app.include_router(submit.router, prefix="/submit", tags=["Submission"])
app.include_router(queue.router, prefix="/queue", tags=["Queue"])
app.include_router(sms.router, prefix="/sms", tags=["SMS"])  # Add the SMS router

# Global exception handler
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.detail},
    )

@app.get("/", tags=["Status"])
def root():
    return {"message": "Handler API is live. She's listening."}

@app.get("/health", tags=["Status"])
def health_check():
    return {"status": "healthy"}