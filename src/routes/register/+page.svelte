<script>
    export let form;
</script>

<h1>Register</h1>
		
{#if form?.error}
    <div class="error">{form.error}</div>
{/if}

<form method="POST">
    <div>
        <label for="username">Username</label>
        <input 
            type="text" 
            id="username" 
            name="username" 
            required
        />
    </div>
    
    <div>
        <label for="password">Password</label>
        <input 
            type="password" 
            id="password" 
            name="password" 
            required
        />
    </div>
    
    <button type="submit">Register</button>
</form>

<p class="login-link">
    Already have an account? <a href="/login">Login</a>
</p>

<style>
    h1 {
        font-size: clamp(28px, 6vw, 40px);
        text-align: center;
        margin: 30px 10px 20px;
    }

    .error {
        color: #dc3545;
        background-color: #f8d7da;
        border: 1px solid #f5c6cb;
        padding: 12px;
        border-radius: 4px;
        margin: 0 auto 20px;
        max-width: 400px;
        text-align: center;
        font-size: clamp(14px, 2.5vw, 16px);
    }

    form {
        display: flex;
        flex-direction: column;
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        box-sizing: border-box;
    }

    div {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    label {
        font-weight: 600;
        margin-bottom: 8px;
        font-size: clamp(14px, 2.5vw, 16px);
        color: #333;
    }

    input {
        padding: 12px;
        font-size: clamp(14px, 2.5vw, 16px);
        border: 2px solid #ddd;
        border-radius: 4px;
        box-sizing: border-box;
    }

    input:focus {
        outline: none;
        border-color: #4CAF50;
    }

    button {
        padding: 14px;
        font-size: clamp(16px, 3vw, 18px);
        font-weight: 600;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;
        margin-top: 10px;
    }

    button:hover {
        background-color: #45a049;
    }

    .login-link {
        text-align: center;
        margin-top: 20px;
        font-size: clamp(14px, 2.5vw, 16px);
    }

    .login-link a {
        color: #4CAF50;
        text-decoration: none;
        font-weight: 600;
    }

    .login-link a:hover {
        text-decoration: underline;
    }

    @media (max-width: 480px) {
        form {
            padding: 15px;
        }

        h1 {
            margin: 20px 10px 15px;
        }
    }
</style>