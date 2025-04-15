<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>API Documentation - User Controller</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      margin: 40px;
      color: white;
    }
    h1 {
      border-bottom: 2px solid #e0e0e0;
      padding-bottom: 10px;
    }
    h2 {
      margin-top: 40px;
      color: #1a73e8;
    }
    .endpoint {
      padding: 24px;
      border-radius: 10px;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
      margin-bottom: 40px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 16px;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: left;
    }
    code, pre {
      padding: 10px;
      border-radius: 5px;
      display: block;
      white-space: pre-wrap;
      background-color: #0f172b;
      color: #a8dd48;
    }
  </style>
</head>
<body>
  <h1>📘 API Documentation</h1>
  <h2>User Controller</h2>
  <p>This controller handles all user-related operations including registration, authentication, profile management, and more.</p>

  <div class="endpoint">
    <h3>POST /users</h3>
    <p><strong>Summary:</strong> Create a new user</p>
    <p><strong>Description:</strong> Registers a new user in the system and sends a verification email.</p>
    <h4>📥 Request Body</h4>
    <p><strong>Content-Type:</strong> application/json</p>
    <pre>
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "StrongPassword123!",
  "userType": "USER"
}
</pre>
    <h4>Success Response (201 Created)</h4>
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>username</td><td>string</td><td>The user’s username</td></tr>
        <tr><td>email</td><td>string</td><td>The registered email address</td></tr>
        <tr><td>userType</td><td>string</td><td>User type (e.g., USER, ADMIN)</td></tr>
        <tr><td>isVerified</td><td>boolean</td><td>Indicates if email is verified</td></tr>
        <tr><td>createdAt</td><td>string (ISO)</td><td>Timestamp of user creation</td></tr>
      </tbody>
    </table>
    <h4>Error Responses</h4>
    <table>
      <thead>
        <tr>
          <th>Status</th>
          <th>Description</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>400 Bad Request</td>
          <td>Email already registered or invalid data</td>
          <td><code>"statusCode": 400,<br>"message": "User already exists with this email",<br>"error": "Bad Request"</code></td>
        </tr>
        <tr>
          <td>500 Internal Server Error</td>
          <td>Unexpected server-side error</td>
          <td><code>{
  "statusCode": 500,
  "message": "User Creation Failed: [reason]",
  "error": "Internal Server Error"
}</code></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="endpoint">
    <h3>POST /resend-verification</h3>
    <p><strong>Summary:</strong> Resend verification email</p>
    <p><strong>Description:</strong> Resends the verification email to the user if not already verified.</p>
    <p><strong>Content-Type:</strong> application/json</p>
    <h4>Request Body</h4>
    <pre>
{
  "email": "john@example.com"
}
</pre>
    <h4>Success Response (200 OK)</h4>
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>message</td><td>string</td><td>Confirmation of resend</td></tr>
      </tbody>
    </table>
    <h4>Error Responses</h4>
    <table>
      <thead>
        <tr>
          <th>Status</th>
          <th>Description</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>400 Bad Request</td>
          <td>Validation failed or bad input</td>
          <td><code>{
  "statusCode": 400,
  "message": "Invalid email format",
  "error": "Bad Request"
}</code></td>
        </tr>
        <tr>
          <td>404 Not Found</td>
          <td>User not found</td>
          <td><code>{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}</code></td>
        </tr>
        <tr>
          <td>409 Conflict</td>
          <td>User already verified</td>
          <td><code>{
  "statusCode": 409,
  "message": "User already verified",
  "error": "Conflict"
}</code></td>
        </tr>
        <tr>
          <td>500 Internal Server Error</td>
          <td>Failed to update user or send mail</td>
          <td><code>{
  "statusCode": 500,
  "message": "Failed to send verification email",
  "error": "Internal Server Error"
}</code></td>
        </tr>
      </tbody>
    </table>
  </div>

<div class="endpoint">
  <h3>GET /verify/:token</h3>
  <p><strong>Summary:</strong> Verify a user</p>
  <p><strong>Description:</strong> Verifies a user with the provided token.</p>
  <h4>Request Params</h4>
  <table>
    <thead>
      <tr>
        <th>Field</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>token</td><td>string</td><td>The verification token sent to the user</td></tr>
    </tbody>
  </table>
  <h4>Success Response (200 OK)</h4>
  <table>
    <thead>
      <tr>
        <th>Field</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>message</td><td>string</td><td>Success message</td></tr>
    </tbody>
  </table>
  <h4>Error Responses</h4>
  <table>
    <thead>
      <tr>
        <th>Status</th>
        <th>Description</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>400 Bad Request</td>
        <td>Invalid or expired token</td>
        <td>
          <code>
"statusCode": 400,
"message": "Invalid or expired token",
"error": "Bad Request"
          </code>
        </td>
      </tr>
      <tr>
        <td>500 Internal Server Error</td>
        <td>Unexpected server-side error</td>
        <td>
          <code>
"statusCode": 500,
"message": "Failed to update user verification status",
"error": "Internal Server Error"
          </code>
        </td>
      </tr>
    </tbody>
  </table>
</div>

</body>
</html>
