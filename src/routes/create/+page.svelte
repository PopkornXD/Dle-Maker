<script>
    export let form;
</script>


<h1>Make your own Dle!</h1>

{#if form?.success}
    <div style="color: green;">{form.message}</div>

{/if}

{#if form?.error}
    <div style="color: red;">{form.error}</div>
{/if}

<form method="POST">
    <div>
        <label for="title">Title of Dle</label>
        <input 
            type="text" 
            name="title" 
            id="title"
            required
        />
    </div>

    <div>
        <label for="dataset">Import dataset (dataset MUST have a 'name' column)</label>
        <textarea 
            id="dataset" 
            name="dataset" 
            placeholder="Paste from Excel here..."
            required
        ></textarea>
    </div>

    <button type="submit">Create Dle</button>



</form>



<style>
    h1 {
        font-size: clamp(24px, 5vw, 36px);
        text-align: center;
        margin: 20px 10px;
    }

    form {
        display: flex;
        flex-direction: column;
        max-width: 800px;
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

    textarea {
        width: 100%;
        height: 300px;
        padding: 12px;
        font-size: clamp(13px, 2vw, 14px);
        font-family: monospace;
        border: 2px solid #ddd;
        border-radius: 4px;
        box-sizing: border-box;
        resize: vertical;
    }

    textarea:focus {
        outline: none;
        border-color: #4CAF50;
    }

    button {
        height: 50px;
        font-size: clamp(16px, 3vw, 18px);
        font-weight: 600;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    button:hover {
        background-color: #45a049;
    }

    @media (max-width: 768px) {
        form {
            padding: 15px;
        }

        textarea {
            height: 250px;
        }

        button {
            height: 48px;
        }
    }

    @media (max-width: 480px) {
        form {
            padding: 10px;
        }

        textarea {
            height: 200px;
        }

        button {
            height: 44px;
        }
    }
</style>