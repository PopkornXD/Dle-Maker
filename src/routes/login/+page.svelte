<script>
    export let form;
</script>


<h1>Login</h1>

{#if form?.error}
    <div style="color: red;">{form.error}</div>
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
    
    <button type="submit">Login</button>
</form>

<p>
    Don't have an account? <a href="/register">Register</a>
</p>


