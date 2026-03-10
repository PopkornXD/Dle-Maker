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
        <label for="dataset">Import dataset</label>
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
    textarea {
        width: 80vw;
        height: 300px;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    button {
        height: 50px;
    }

    div {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }
</style>