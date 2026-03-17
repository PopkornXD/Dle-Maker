<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    
    export let data;
    export let form;

    let searchTerm = '';
    let filteredNames = [];
    let showDropdown = false;

    onMount(() => {
        const url = new URL(window.location.href);
        if (url.searchParams.has('reset')) {
            url.searchParams.delete('reset');
            goto(url.pathname + url.search, { replaceState: true, keepFocus: true });
        }
    });

    $: {
        if (searchTerm.length > 0) {
            filteredNames = data.allNames.filter(name => 
                name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            showDropdown = filteredNames.length > 0;
        } else {
            filteredNames = [];
            showDropdown = false;
        }
    }

    function selectName(name) {
        searchTerm = name;
        showDropdown = false;
    }

    function handleBlur() {
        setTimeout(() => {
            showDropdown = false;
        }, 200);
    }
</script>


{#if form?.error}
    <div style="color: red;">{form.error}</div>
{/if}

{#if data?.error}
    <div style="color: red;">{data.error}</div>
{/if}

<form method="POST">
    <div class="autocomplete-container">
        <label for="guess">Guess</label>
        <input 
            type="text" 
            id="guess" 
            name="guess" 
            bind:value={searchTerm}
            on:focus={() => searchTerm.length > 0 && (showDropdown = true)}
            on:blur={handleBlur}
            autocomplete="off"
            required
        />
        {#if showDropdown}
            <div class="dropdown">
                {#each filteredNames as name}
                    <button 
                        type="button"
                        class="dropdown-item"
                        on:click={() => selectName(name)}
                    >
                        {name}
                    </button>
                {/each}
            </div>
        {/if}
    </div>

    <button type="submit">Submit Guess</button>
</form>
<div class="categories">
    <h1>{data.title}</h1>
    {#each data.categories as category}
        <h2>{category}</h2>
    {/each}
</div>

{#each data.guessedRows as guess}
    <div class="guessRow">
        <h2>{guess.name.value}:</h2>

        {#each data.categories as category}
            {#if guess[category].isCorrect}
                <div class="correctCategory">
                    <h2>{guess[category].value}</h2>
                </div>
            {:else if guess[category].partialMatch}
                <div class="partialCategory">
                    <h2>{guess[category].value}</h2>
                    {#if guess[category].higher == true}
                        <p>&darr;</p>
                    {:else if guess[category].higher == false}
                        <p>&uarr;</p>
                    {/if}
                </div>
            {:else}
                <div class="wrongCategory">
                    <h2>{guess[category].value}</h2>
                    {#if guess[category].higher == true}
                        <p>&darr;</p>
                    {:else if guess[category].higher == false}
                        <p>&uarr;</p>
                    {/if}
                </div>
            {/if}
        {/each}
    </div>
{/each}


    

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        background-color: #f5f5f5;
    }

    form {
        max-width: 500px;
        margin: 20px auto;
        padding: 0 15px;
    }

    .autocomplete-container {
        position: relative;
        width: 100%;
        margin-bottom: 20px;
    }

    label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        font-size: 16px;
        color: #333;
    }

    input {
        width: 100%;
        padding: 12px 16px;
        box-sizing: border-box;
        font-size: 16px;
        border: 2px solid #ddd;
        border-radius: 4px;
        transition: border-color 0.2s;
    }

    input:focus {
        outline: none;
        border-color: #4CAF50;
    }

    .dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        max-height: 200px;
        overflow-y: auto;
        background-color: white;
        border: 2px solid #ddd;
        border-top: none;
        z-index: 1000;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    .dropdown-item {
        width: 100%;
        padding: 12px 16px;
        text-align: left;
        background: none;
        border: none;
        cursor: pointer;
        transition: background-color 0.2s;
        font-size: 16px;
    }

    .dropdown-item:hover {
        background-color: #f0f0f0;
    }

    button[type="submit"] {
        width: 100%;
        padding: 12px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    button[type="submit"]:hover {
        background-color: #45a049;
    }

    .categories,
    .guessRow {
        display: grid;
        gap: 8px;
        padding: 15px;
        margin: 10px auto;
        width: 100%;
        max-width: 100vw;
        box-sizing: border-box;
        overflow-x: auto;
    }

    .categories {
        margin-top: 20px;
        gap: 20px;
    }

    /* Force all items on one line */
    .categories {
        grid-auto-flow: column;
        grid-auto-columns: minmax(100px, 1fr);
    }

    .guessRow {
        grid-auto-flow: column;
        grid-auto-columns: minmax(100px, 1fr);
    }

    .categories h1,
    .categories h2 {
        margin: 0;
        padding: 8px 4px;
        font-size: clamp(10px, 1.2vw, 16px);
        font-weight: 700;
        color: #333;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
        hyphens: auto;
        text-align: center;
        line-height: 1.2;
        white-space: nowrap;
    }

    .guessRow h2 {
        margin: 0;
        padding: 8px 4px;
        font-size: clamp(10px, 1.2vw, 16px);
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
        hyphens: auto;
        text-align: center;
        line-height: 1.2;
        color: #333;
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
    }

    .correctCategory,
    .partialCategory,
    .wrongCategory {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 12px 8px;
        min-height: 80px;
        text-align: center;
        transition: transform 0.1s;
        border: 2px solid #000;
    }

    .correctCategory {
        background-color: #4CAF50;
        color: white;
    }

    .partialCategory {
        background-color: #FFC107;
        color: #000;
    }

    .wrongCategory {
        background-color: #f44336;
        color: white;
    }

    .correctCategory:active,
    .partialCategory:active,
    .wrongCategory:active {
        transform: scale(0.98);
    }

    .correctCategory h2,
    .partialCategory h2,
    .wrongCategory h2 {
        font-size: clamp(10px, 1.2vw, 16px);
        word-wrap: break-word;
        overflow-wrap: break-word;
        hyphens: auto;
        max-width: 100%;
        line-height: 1.2;
    }

    .correctCategory p,
    .partialCategory p,
    .wrongCategory p {
        margin: 4px 0 0 0;
        font-size: clamp(16px, 2.5vw, 28px);
        font-weight: bold;
        line-height: 1;
    }

    h1, h2, p {
        margin: 0;
    }

    /* Mobile optimizations */
    @media (max-width: 768px) {
        .categories,
        .guessRow {
            padding: 10px;
            gap: 6px;
        }

        .categories {
            grid-auto-columns: minmax(80px, 1fr);
        }

        .guessRow {
            grid-auto-columns: minmax(80px, 1fr);
        }

        .correctCategory,
        .partialCategory,
        .wrongCategory {
            padding: 10px 6px;
            min-height: 60px;
        }

        .categories h1,
        .categories h2,
        .guessRow h2,
        .correctCategory h2,
        .partialCategory h2,
        .wrongCategory h2 {
            font-size: clamp(9px, 2vw, 14px);
        }

        .correctCategory p,
        .partialCategory p,
        .wrongCategory p {
            font-size: clamp(14px, 3.5vw, 24px);
        }

        input,
        button[type="submit"],
        .dropdown-item {
            font-size: 16px;
        }
    }

    @media (max-width: 480px) {
        .categories,
        .guessRow {
            padding: 8px;
            gap: 4px;
        }

        .categories {
            grid-auto-columns: minmax(65px, 1fr);
        }

        .guessRow {
            grid-auto-columns: minmax(65px, 1fr);
        }

        .correctCategory,
        .partialCategory,
        .wrongCategory {
            padding: 8px 4px;
            min-height: 50px;
        }

        .categories h1,
        .categories h2,
        .guessRow h2,
        .correctCategory h2,
        .partialCategory h2,
        .wrongCategory h2 {
            font-size: clamp(8px, 2.5vw, 12px);
        }

        .correctCategory p,
        .partialCategory p,
        .wrongCategory p {
            font-size: clamp(12px, 4vw, 20px);
        }
    }
    
</style>