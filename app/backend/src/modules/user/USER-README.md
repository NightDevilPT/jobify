<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Jobify Project Documentation</title>
<style>
	body {
		font-family: Arial, sans-serif;
		line-height: 1.6;
		margin: 0;
		padding: 20px;
		transition: background-color 0.3s, color 0.3s;
	}
	h1, h2, h3 {
		margin-top: 1.2em;
	}
	code {
		background-color: #f4f4f4;
		padding: 2px 4px;
		font-size: 0.9em;
		border-radius: 4px;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		margin-top: 1em;
	}
	th, td {
		border: 1px solid #ddd;
		padding: 8px;
	}
	th {
		background-color: #f2f2f2;
		text-align: left;
	}
	/* Light theme */
	:root {
		--background-color: #ffffff;
		--text-color: #333333;
		--code-background-color: #f4f4f4;
		--link-color: #1a73e8;
		--table-header-color: #f2f2f2;
	}
	/* Dark theme */
	@media (prefers-color-scheme: dark) {
		:root {
			--background-color: #121212;
			--text-color: #e0e0e0;
			--code-background-color: #333333;
			--link-color: #8ab4f8;
			--table-header-color: #333333;
		}
	}
	/* Apply theme colors */
	body {
		background-color: var(--background-color);
		color: var(--text-color);
	}
	a {
		color: var(--link-color);
	}
	code {
		background-color: var(--code-background-color);
		color: var(--text-color);
	}
	th {
		background-color: var(--table-header-color);
	}
</style>
</head>
<body>

<h1>Jobify Project - User Module Documentation</h1>

<p>This documentation provides an overview of the routes, purpose, and structure of the Jobify backend User Module. This module includes user registration, verification, login, password management, and user profile functionalities.</p>

<h2>Table of Contents</h2>
<ul>
	<li><a href="#user-routes">User Routes</a></li>
	<li><a href="#project-structure">Project Structure</a></li>
</ul>

<h2 id="user-routes">User Routes</h2>

<table>
	<thead>
		<tr>
			<th>Route</th>
			<th>Method</th>
			<th>Description</th>
			<th>Request Body / Query Parameters</th>
			<th>Response</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>/user/register</code></td>
			<td>POST</td>
			<td>Registers a new user</td>
			<td>
				<strong>CreateUserDto</strong>:
				<ul>
					<li><code>username</code>: <em>string</em> - Required</li>
					<li><code>email</code>: <em>string</em> - Required</li>
					<li><code>password</code>: <em>string</em>, min 6 characters - Required</li>
					<li><code>userType</code>: <em>UserType</em> (Candidate/Recruiter) - Required</li>
				</ul>
			</td>
			<td>A success message or error if the user already exists</td>
		</tr>
		<tr>
			<td><code>/user/verify</code></td>
			<td>GET</td>
			<td>Verifies a user's email</td>
			<td>
				<strong>Query Parameter</strong>:<br>
				<code>token</code> - Verification token (Required)
			</td>
			<td>A success message or error if the token is invalid</td>
		</tr>
		<tr>
			<td><code>/user/login</code></td>
			<td>POST</td>
			<td>Authenticates a user and returns a JWT token</td>
			<td>
				<strong>LoginUserDto</strong>:
				<ul>
					<li><code>email</code>: <em>string</em> - Required</li>
					<li><code>password</code>: <em>string</em>, min 6 characters - Required</li>
				</ul>
			</td>
			<td>A JWT token or error if credentials are incorrect</td>
		</tr>
		<tr>
			<td><code>/user/forgot-password</code></td>
			<td>POST</td>
			<td>Generates a reset password token and sends it to the user's email</td>
			<td>
				<strong>ForgotPasswordDto</strong>:
				<ul>
					<li><code>email</code>: <em>string</em> - Required</li>
				</ul>
			</td>
			<td>A success message or error if the user is not found</td>
		</tr>
		<tr>
			<td><code>/user/update-password</code></td>
			<td>POST</td>
			<td>Updates the user's password if the token is valid</td>
			<td>
				<strong>Query Parameter</strong>: <code>token</code> - Reset password token (Required)
				<br><strong>UpdatePasswordDto</strong>:
				<ul>
					<li><code>password</code>: <em>string</em>, min 6 characters - Required</li>
				</ul>
			</td>
			<td>A success message or error if the token is invalid or expired</td>
		</tr>
	</tbody>
</table>

<h2 id="project-structure">Project Structure</h2>

<pre><code>.
├── src
│   ├── modules
│   │   └── user
│   │       ├── commands
│   │       │   ├── handler
│   │       │   ├── impl
│   │       ├── dto
│   │       ├── entities
│   │       ├── repositories
│   │       ├── user.controller.ts
│   │       ├── user.module.ts
│   │       └── user.service.ts
└── tests
	└── user.controller.spec.ts
	└── user.service.spec.ts
</code></pre>
</body>
</html>
