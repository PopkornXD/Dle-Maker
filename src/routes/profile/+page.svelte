<script>
    export let data;

    let deleting = null;

    async function deleteGame(tableName, event) {
        event.preventDefault();
        
        if (!confirm(`Are you sure you want to delete "${tableName}"? This cannot be undone.`)) {
            return;
        }

        deleting = tableName;

        try {
            const response = await fetch(`/delete_${tableName}`, {
                method: 'POST'
            });

            const result = await response.json();

            if (result.success) {
                window.location.reload();
            } else {
                alert(`Error: ${result.error}`);
                deleting = null;
            }
        } catch (err) {
            alert(`Error deleting game: ${err.message}`);
            deleting = null;
        }
    }
</script>



{#if data.error}
    <p style="color: red;">{data.error}</p>
{/if}


<main>

    <h1>Your own games:</h1>


    {#if Object.keys(data.tables).length < 1}
        <p>You have not made any games D:</p>
    {/if}

    {#each data.tables as table}
        <a href="/{table.tableName}?reset=true">
            <div class="game">
                <h2>{table.title}</h2>
                <p class="author">by {table.author}</p>

                <h5>Categories</h5>

                <div class="categories">
                    {#each table.categories as category}
                        <p>{category}</p>
                    {/each}
                </div>

                <button 
                    class="delete-btn" 
                    on:click={(e) => deleteGame(table.tableName, e)}
                    disabled={deleting === table.tableName}
                >
                    {deleting === table.tableName ? 'Deleting...' : 'Delete Game'}
                </button>
                    
                
            </div>
        </a>
    {/each}

</main>


<style>

    main {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    h2 {
        margin: 0;
    }


    h5 {
        margin: 0;
    }

    p {
        margin: 0;
    }


    .author {
        margin-bottom: 20px;
        margin-top: 0;
    }

    .categories {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: wrap;
        width: 200px;
        margin: 0;
    }

    .game {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 5px black dashed;
        padding: 10px;
        position: relative;
    }

    a {
        color: black;
        text-decoration: none;
    }

    .delete-btn {
        margin-top: 15px;
        padding: 8px 16px;
        background-color: #dc3545;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.2s;
    }

    .delete-btn:hover:not(:disabled) {
        background-color: #c82333;
    }

    .delete-btn:disabled {
        background-color: #6c757d;
        cursor: not-allowed;
    }
</style>