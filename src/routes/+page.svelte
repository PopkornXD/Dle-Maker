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
        padding: 20px;
        max-width: 100%;
        box-sizing: border-box;
    }

    h1 {
        font-size: clamp(24px, 5vw, 36px);
        margin-bottom: 30px;
        text-align: center;
    }

    .gameGallery {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 30px;
        width: 100%;
        max-width: 1200px;
        padding: 0 10px;
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
    }

    .game:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }

    a {
        color: black;
        text-decoration: none;
        width: 100%;
    }

    @media (max-width: 768px) {
        main {
            padding: 15px 10px;
        }

        .gameGallery {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }

        .game {
            padding: 15px;
        }
    }

    @media (max-width: 480px) {
        main {
            padding: 10px 5px;
        }

        .gameGallery {
            grid-template-columns: 1fr;
            gap: 15px;
        }

        .game {
            padding: 12px;
        }
    }
</style>