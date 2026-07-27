# PromptCraft AI - API Reference

## Overview

The PromptCraft AI API provides programmatic access to prompt generation, management, and community features.

**Base URL**: `https://api.promptcraft.ai/v1`

## Authentication

All API requests require authentication using a Bearer token:

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.promptcraft.ai/v1/prompts
```

## Rate Limiting

- Free tier: 100 requests/hour
- Premium tier: 10,000 requests/hour
- Enterprise: Custom limits

## Endpoints

### Prompts

#### Generate Prompt
```
POST /prompts/generate
```

**Request**:
```json
{
  "description": "A prompt for ChatGPT to write a blog post",
  "platform": "chatgpt",
  "tone": "professional",
  "length": "medium"
}
```

**Response**:
```json
{
  "id": "prompt_123",
  "content": "You are a professional blog writer...",
  "platform": "chatgpt",
  "tone": "professional",
  "created_at": "2026-07-27T10:30:00Z"
}
```

#### List Prompts
```
GET /prompts
```

**Query Parameters**:
- `limit` (integer, default: 20)
- `offset` (integer, default: 0)
- `platform` (string, optional)
- `search` (string, optional)

#### Get Prompt
```
GET /prompts/{id}
```

#### Update Prompt
```
PATCH /prompts/{id}
```

#### Delete Prompt
```
DELETE /prompts/{id}
```

### Users

#### Get Current User
```
GET /users/me
```

#### Update Profile
```
PATCH /users/me
```

#### Get Usage
```
GET /users/me/usage
```

### Subscription

#### Get Plan
```
GET /subscription/plan
```

#### List Plans
```
GET /subscription/plans
```

#### Create Subscription
```
POST /subscription/subscribe
```

### Community

#### List Featured Prompts
```
GET /community/featured
```

#### Search Prompts
```
GET /community/search?q=query
```

#### Like Prompt
```
POST /community/prompts/{id}/like
```

## Error Handling

Errors are returned with appropriate HTTP status codes:

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Description is required",
    "details": {}
  }
}
```

### Error Codes
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

## Examples

### JavaScript
```javascript
const response = await fetch('https://api.promptcraft.ai/v1/prompts/generate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    description: 'Write a blog post',
    platform: 'chatgpt'
  })
});

const prompt = await response.json();
```

### Python
```python
import requests

response = requests.post(
    'https://api.promptcraft.ai/v1/prompts/generate',
    headers={
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    },
    json={
        'description': 'Write a blog post',
        'platform': 'chatgpt'
    }
)

prompt = response.json()
```

### cURL
```bash
curl -X POST https://api.promptcraft.ai/v1/prompts/generate \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Write a blog post",
    "platform": "chatgpt"
  }'
```

## Webhook Events

### Events
- `prompt.created` - Prompt created
- `subscription.started` - Subscription activated
- `subscription.ended` - Subscription cancelled
- `payment.completed` - Payment processed
- `payment.failed` - Payment failed

## Support

- Email: api-support@promptcraft.ai
- Docs: https://docs.promptcraft.ai
- Status: https://status.promptcraft.ai

