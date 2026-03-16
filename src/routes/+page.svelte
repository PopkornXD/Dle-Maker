<script>
    export let data;
</script>

<main>

    <h1>Browse dle games</h1>

    {#if data.error}
        <p style="color: red;">{data.error}</p>
    {/if}

    <div class="gameGallery">
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
                    
                    
                </div>
            </a>
        {/each}
    </div>

</main>


<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .gameGallery {
        display: flex;
        flex-direction: row;
        gap: 40px;
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