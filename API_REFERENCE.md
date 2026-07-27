# API Rate Limits & Best Practices

## Rate Limiting

### Free Tier
- 100 requests per day
- 5 requests per minute
- 1MB response size

### Premium Tier
- Unlimited requests
- Priority processing
- 10MB response size

## Error Handling

All API responses follow this format:

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "timestamp": "2026-07-27T22:00:00Z"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error description",
  "code": "ERROR_CODE",
  "timestamp": "2026-07-27T22:00:00Z"
}
```

## HTTP Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `429 Too Many Requests` - Rate limit exceeded
- `500 Server Error` - Internal error

## Common Error Codes

- `INVALID_INPUT` - Request validation failed
- `UNAUTHORIZED` - User not authenticated
- `FORBIDDEN` - User lacks permissions
- `NOT_FOUND` - Resource not found
- `RATE_LIMIT` - Rate limit exceeded
- `INTERNAL_ERROR` - Server error
- `AI_ERROR` - AI model error
- `PAYMENT_ERROR` - Payment processing error

## Best Practices

1. **Always handle errors** - Use try/catch in client code
2. **Cache responses** - Use browser cache for read operations
3. **Validate input** - Send valid data to APIs
4. **Retry logic** - Implement exponential backoff for failed requests
5. **Monitor usage** - Track API calls to stay within limits

## Example Error Handling

```typescript
try {
  const response = await fetch('/api/prompts/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userInput: 'Write an email',
      platform: 'chatgpt',
      tone: 'professional',
      format: 'markdown',
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    if (error.code === 'RATE_LIMIT') {
      // Handle rate limit
      console.error('Rate limited. Please try again later.')
    }
    throw new Error(error.error)
  }

  const data = await response.json()
  return data.prompt
} catch (error) {
  console.error('API Error:', error)
  // Show user-friendly error message
}
```
