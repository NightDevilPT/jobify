<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>User Authentication API Documentation</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background-color: #171717;
    }
    header {
      background-color: #2f2f2f;
      color: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 30px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    h1 {
      margin: 0;
      font-size: 2.2rem;
    }
    header p {
      margin: 10px 0 0;
      font-size: 1.1rem;
      opacity: 0.9;
    }
    /* CSS-only accordion styles */
    .accordion {
      margin-bottom: 15px;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .accordion-item input[type="checkbox"] {
      position: absolute;
      opacity: 0;
      z-index: -1;
    }
    .accordion-item label {
      background-color: #2f2f2f;
      color: white;
      padding: 15px 20px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-left: 4px solid #1a73e8;
      font-weight: 600;
      transition: background-color 0.3s ease;
    }
    .accordion-item label:hover {
      background-color: #3c3c3c;
    }
    .accordion-item label .method {
      background-color: #1a73e8;
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 0.9rem;
      margin-right: 10px;
      font-weight: 500;
    }
    .accordion-indicator {
      font-size: 1.2rem;
      transition: transform 0.3s ease;
    }
    .accordion-content {
      max-height: 0;
      overflow: auto;
      color:white;
      transition: max-height 0.5s ease;
      background-color: #2f2f2f;
      scrollbar-width: none;         /* Firefox */
      -ms-overflow-style: none;  
    }
    .accordion-content::-webkit-scrollbar{
      display: none;
    }
    .accordion-item input:checked ~ .accordion-content {
      max-height: 100vh;
    }
    .accordion-item input:checked + label .accordion-indicator {
      transform: rotate(180deg);
    }
    .accordion-content-inner {
      padding: 20px;
      border-top: 1px solid #e0e0e0;
    }
    h3 {
      margin-top: 0;
      color: #1a73e8;
      border-bottom: 1px solid #e0e0e0;
      padding-bottom: 10px;
    }
    .section {
      margin-bottom: 20px;
    }
    .section h4 {
      margin-bottom: 10px;
      color: white;
    }
    pre {
      background-color: #171717;
      border-left: 4px solid #1a73e8;
      padding: 15px;
      border-radius: 4px;
      overflow-x: auto;
      font-family: 'Consolas', 'Monaco', monospace;
      margin: 15px 0;
    }
    code {
      background-color: #171717;
      padding: 2px 5px;
      border-radius: 3px;
      font-family: 'Consolas', 'Monaco', monospace;
      font-size: 0.9em;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
    }
    th, td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #e0e0e0;
      background-color:#272727;
    }
    th {
      background-color: #171717;
      font-weight: 600;
    }
    tr:hover {
      background-color: #171717;
    }
    .badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 500;
      color: white;
    }
    .badge-success {
      background-color: #28a745;
    }
    .badge-danger {
      background-color: #dc3545;
    }
    .badge-warning {
      background-color: #ffc107;
      color: #343a40;
    }
    footer {
      margin-top: 50px;
      text-align: center;
      color: #6c757d;
      font-size: 0.9rem;
      padding: 20px;
      border-top: 1px solid #e0e0e0;
    }
  </style>
</head>
<body>
  <header>
    <h1>📘 User Authentication API Documentation</h1>
    <p>A comprehensive API for user registration, verification, and management</p>
  </header>
  
  <!-- User Registration Start -->
  <div class="accordion">
    <div class="accordion-item">
      <input type="checkbox" id="accordion-1">
      <label for="accordion-1">
        <div>
          <span class="method">POST</span> /users
          <span> - Register a new user</span>
        </div>
        <span class="accordion-indicator">▼</span>
      </label>
      <div class="accordion-content">
        <div class="accordion-content-inner">
          <h3>Create a new user</h3>
          <p>Registers a new user in the system and sends a verification email.</p>
          <div class="section">
            <h4>📥 Request Body</h4>
            <p><strong>Content-Type:</strong> application/json</p>
            <pre>{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "StrongPassword123!",
  "userType": "USER"
}</pre>
          </div>
          <div class="section">
            <h4>Success Response <span class="badge badge-success">201 Created</span></h4>
            <table>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>username</td><td>string</td><td>The user's username</td></tr>
                <tr><td>email</td><td>string</td><td>The registered email address</td></tr>
                <tr><td>userType</td><td>string</td><td>User type (e.g., USER, ADMIN)</td></tr>
                <tr><td>isVerified</td><td>boolean</td><td>Indicates if email is verified</td></tr>
                <tr><td>createdAt</td><td>string (ISO)</td><td>Timestamp of user creation</td></tr>
              </tbody>
            </table>
          </div>
          <div class="section">
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
                  <td><span class="badge badge-warning">400</span> Bad Request</td>
                  <td>Email already registered or invalid data</td>
                  <td><pre>{
  "statusCode": 400,
  "message": "User already exists with this email",
  "error": "Bad Request"
}</pre></td>
                </tr>
                <tr>
                  <td><span class="badge badge-danger">500</span> Internal Server Error</td>
                  <td>Unexpected server-side error</td>
                  <td><pre>{
  "statusCode": 500,
  "message": "User Creation Failed: [reason]",
  "error": "Internal Server Error"
}</pre></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- User Registration End -->

  <!-- Resend Verification Link Start -->
  <div class="accordion">
    <div class="accordion-item">
      <input type="checkbox" id="accordion-2">
      <label for="accordion-2">
        <div>
          <span class="method">POST</span> /resend-verification
          <span> - Resend verification email</span>
        </div>
        <span class="accordion-indicator">▼</span>
      </label>
      <div class="accordion-content">
        <div class="accordion-content-inner">
          <h3>Resend verification email</h3>
          <p>Resends the verification email to the user if not already verified.</p>
          <div class="section">
            <h4>📥 Request Body</h4>
            <p><strong>Content-Type:</strong> application/json</p>
            <pre>{
  "email": "john@example.com"
}</pre>
          </div>
          <div class="section">
            <h4>Success Response <span class="badge badge-success">200 OK</span></h4>
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
          </div>
          <div class="section">
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
                  <td><span class="badge badge-warning">400</span> Bad Request</td>
                  <td>Validation failed or bad input</td>
                  <td><pre>{
  "statusCode": 400,
  "message": "Invalid email format",
  "error": "Bad Request"
}</pre></td>
                </tr>
                <tr>
                  <td><span class="badge badge-warning">404</span> Not Found</td>
                  <td>User not found</td>
                  <td><pre>{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}</pre></td>
                </tr>
                <tr>
                  <td><span class="badge badge-warning">409</span> Conflict</td>
                  <td>User already verified</td>
                  <td><pre>{
  "statusCode": 409,
  "message": "User already verified",
  "error": "Conflict"
}</pre></td>
                </tr>
                <tr>
                  <td><span class="badge badge-danger">500</span> Internal Server Error</td>
                  <td>Failed to update user or send mail</td>
                  <td><pre>{
  "statusCode": 500,
  "message": "Failed to send verification email",
  "error": "Internal Server Error"
}</pre></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Resend Verification Link End -->

  <!-- Verify User Start -->
  <div class="accordion">
    <div class="accordion-item">
      <input type="checkbox" id="accordion-3">
      <label for="accordion-3">
        <div>
          <span class="method">GET</span> /verify/:token
          <span> - Verify a user</span>
        </div>
        <span class="accordion-indicator">▼</span>
      </label>
      <div class="accordion-content">
        <div class="accordion-content-inner">
          <h3>Verify a user</h3>
          <p>Verifies a user with the provided token.</p>
          <div class="section">
            <h4>Request Parameters</h4>
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
          </div>
          <div class="section">
            <h4>Success Response <span class="badge badge-success">200 OK</span></h4>
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
          </div>
          <div class="section">
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
                  <td><span class="badge badge-warning">400</span> Bad Request</td>
                  <td>Invalid or expired token</td>
                  <td><pre>{
  "statusCode": 400,
  "message": "Invalid or expired token",
  "error": "Bad Request"
}</pre></td>
                </tr>
                <tr>
                  <td><span class="badge badge-danger">500</span> Internal Server Error</td>
                  <td>Unexpected server-side error</td>
                  <td><pre>{
  "statusCode": 500,
  "message": "Failed to update user verification status",
  "error": "Internal Server Error"
}</pre></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>  
  <!-- Verify User Start -->

  <!-- Login User Start -->
  <!-- Login User Start -->
<div class="accordion">
  <div class="accordion-item">
    <input type="checkbox" id="accordion-login">
    <label for="accordion-login">
      <div>
        <span class="method">POST</span> /login <span> - Login a user</span>
      </div>
      <span class="accordion-indicator">▼</span>
    </label>
    <div class="accordion-content">
      <div class="accordion-content-inner">
        <h3>Login a User</h3>
        <p>Logs in a user with the provided credentials (email and password).</p>
        <div class="section">
          <h4>Request Parameters</h4>
          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>email</td>
                <td>string</td>
                <td>The email address of the user</td>
              </tr>
              <tr>
                <td>password</td>
                <td>string</td>
                <td>The password of the user (minimum 6 characters)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="section">
          <h4>Success Response <span class="badge badge-success">200 OK</span></h4>
          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>message</td>
                <td>string</td>
                <td>Login successful message</td>
              </tr>
              <tr>
                <td>accessToken</td>
                <td>string</td>
                <td>JWT token for accessing protected routes</td>
              </tr>
              <tr>
                <td>refreshToken</td>
                <td>string</td>
                <td>JWT token for refreshing the access token</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="section">
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
                <td><span class="badge badge-warning">400</span> Bad Request</td>
                <td>Invalid credentials (wrong email or password)</td>
                <td><pre>{ "statusCode": 400, "message": "Invalid credentials", "error": "Bad Request" }</pre></td>
              </tr>
              <tr>
                <td><span class="badge badge-danger">500</span> Internal Server Error</td>
                <td>Unexpected server-side error</td>
                <td><pre>{ "statusCode": 500, "message": "Internal server error", "error": "Internal Server Error" }</pre></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</div>
<!-- Login User End -->

  <!-- Login User End -->
  <footer>
    <p>© 2025 User Authentication API Documentation</p>
  </footer>
</body>
</html>
