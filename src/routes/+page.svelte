<script>
    export let data;
</script>

<main>

    <h1>Browse dle games</h1>

    {#if data.error}
        <p style="color: red;">{data.error}</p>
    {/if}

    {#each data.tables as table}
        <a href="/{table.tableName}">
            <div class="game">
                <h2>{table.title}</h2>
                <p class="author">by {table.author}</p>

                <h5>Categories</h5>

                <div class="categories">
                    {#each Object.keys(table.rows[0]) as column}
                        <p>{column}</p>
                    {/each}
                </div>    
                    
                
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
    }

    a {
        color: black;
    }
</style>