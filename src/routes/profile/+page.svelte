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
        padding: 20px;
        max-width: 100%;
        box-sizing: border-box;
    }

    h1 {
        font-size: clamp(24px, 5vw, 36px);
        margin-bottom: 30px;
        text-align: center;
    }

    h2 {
        margin: 0;
        font-size: clamp(18px, 3vw, 24px);
    }

    h5 {
        margin: 10px 0;
        font-size: clamp(14px, 2.5vw, 16px);
    }

    p {
        margin: 5px;
        font-size: clamp(12px, 2vw, 14px);
    }

    .author {
        margin-bottom: 15px;
        margin-top: 5px;
        font-style: italic;
        color: #666;
    }

    .categories {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        gap: 8px;
        width: 100%;
        margin: 10px 0;
    }

    .categories p {
        background-color: #f0f0f0;
        padding: 4px 12px;
        border-radius: 4px;
        font-size: clamp(11px, 1.8vw, 13px);
    }

    .game {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 3px solid #333;
        padding: 20px;
        background-color: white;
        transition: transform 0.2s, box-shadow 0.2s;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        position: relative;
        margin-bottom: 20px;
        width: 100%;
        max-width: 400px;
    }

    .game:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }

    a {
        color: black;
        text-decoration: none;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .delete-btn {
        margin-top: 15px;
        padding: 10px 20px;
        background-color: #dc3545;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        font-size: clamp(14px, 2.5vw, 16px);
        transition: background-color 0.2s;
        width: 100%;
        max-width: 200px;
    }

    .delete-btn:hover:not(:disabled) {
        background-color: #c82333;
    }

    .delete-btn:disabled {
        background-color: #6c757d;
        cursor: not-allowed;
    }

    @media (max-width: 768px) {
        main {
            padding: 15px 10px;
        }

        .game {
            padding: 15px;
            max-width: 100%;
        }
    }

    @media (max-width: 480px) {
        main {
            padding: 10px 5px;
        }

        .game {
            padding: 12px;
        }

        .delete-btn {
            padding: 8px 16px;
        }
    }
</style>