# Secure Cloud File Upload Service

A backend service built with Node.js, Express.js, MongoDB, Multer, and Cloudinary for securely uploading, managing, and storing files.

The project focuses on understanding real-world file handling, cloud storage integration, validation, security checks, and database relationships.

---

## Features

- Upload images and documents
- Handle multipart/form-data requests
- File validation
  - File type validation
  - File size restriction
  - File signature verification
- Store files on Cloudinary
- Store metadata in MongoDB
- User ownership mapping
- Fetch uploaded files
- Fetch files by user
- Download/access files
- Delete files from Cloudinary and database
- Temporary file cleanup
- Centralized error handling
- Environment based configuration

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- Cloudinary
- Postman
- Git & GitHub

---

## Project Architecture

```
Client
   |
   v
Express Server
   |
   v
Routes
   |
   v
Multer Middleware
   |
   |-- Validate file
   |-- Check size
   |-- Temporary storage
   |
   v
Controller
   |
   |----------------|
   v                v
Cloudinary       MongoDB

Actual File      Metadata
Storage          Storage

                 filename
                 url
                 publicId
                 owner
                 size
                 type
```

---

## Upload Flow

```
Client uploads file

        |

POST /api/files/upload

        |

Multer Middleware

        |

Creates req.file

        |

Controller uploads file to Cloudinary

        |

Cloudinary returns:

secure_url
public_id

        |

MongoDB saves metadata

        |

Temporary local file deleted

        |

Response returned
```

---

## Database Schema

### User

```javascript
{
    name:String,

    email:String
}
```

---

### File

```javascript
{
    filename:String,

    originalName:String,

    url:String,

    publicId:String,

    mimetype:String,

    size:Number,


    owner:{
        type:ObjectId,
        ref:"User"
    }
}
```

---

## API Endpoints


### Upload File

```
POST /api/files/upload
```

Form Data:

```
file  : uploaded file

owner : userId
```

---

### Get All Files

```
GET /api/files
```

---

### Get Single File

```
GET /api/files/:id
```

---

### Get User Files

```
GET /api/files/user/:userId
```

---

### Download File

```
GET /api/files/download/:id
```

Flow:

```
File ID

   |

MongoDB lookup

   |

Get Cloudinary URL

   |

Return file
```

---

### Delete File

```
DELETE /api/files/:id
```

Flow:

```
Find file

     |

Delete from Cloudinary using publicId

     |

Delete MongoDB document

     |

Return response
```

---

## Environment Variables

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_url

CLOUD_NAME=your_cloud_name

CLOUD_API_KEY=your_api_key

CLOUD_API_SECRET=your_secret
```

---

## Installation

Clone repository

```bash
git clone <repo-url>
```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

Server runs at:

```
http://localhost:5000
```

---

## Security Features

### File Type Validation

Only allowed formats are accepted:

```
image/png

image/jpeg

application/pdf
```

---

### File Size Limit

Large files are rejected before processing.

---

### File Signature Checking

Checks actual file content instead of trusting only filename/extensions.

Example:

```
virus.exe renamed as image.png

Rejected
```

---

### Safe Storage Design

Files:

```
Cloudinary
```

Metadata:

```
MongoDB
```

This keeps the database lightweight.

---

## Error Handling

Centralized error middleware handles:

- Validation errors
- Upload errors
- Server errors

Example:

```json
{
    "success":false,
    "message":"Invalid file type"
}
```

---

## Concepts Learned

- Express routing
- Middleware architecture
- Multipart/form-data handling
- Multer file processing
- Cloud storage integration
- MongoDB relationships
- Mongoose populate
- Ownership design
- File validation
- Error handling
- Environment variables
- Production cleanup flow

---

## Future Improvements

- JWT Authentication
- Role based access control
- AWS S3 integration
- Private file sharing
- Temporary download links
- Virus scanning