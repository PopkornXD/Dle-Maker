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
    .autocomplete-container {
        position: relative;
        width: fit-content;
        margin-bottom: 20px;
    }

    .dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        max-height: 200px;
        overflow-y: auto;
        background-color: white;
        border: 1px solid #ccc;
        border-top: none;
        z-index: 1000;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .dropdown-item {
        width: 100%;
        padding: 10px;
        text-align: left;
        background: none;
        border: none;
        cursor: pointer;
        transition: background-color 0.2s;
        font-size: 14px;
    }

    .dropdown-item:hover {
        background-color: #f0f0f0;
    }

    input {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
        font-size: 14px;
    }

    label {
        display: block;
        margin-bottom: 5px;
    }

    .guessRow {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 20px;
        align-items: center;
        text-align: center;
        margin-bottom: 20px;
    }

    .categories {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 20px;
        align-items: center;
        text-align: center;
        margin-bottom: 20px;
    }

    .correctCategory {
        background-color: green;
        display: grid;
        place-items: center;
        margin: 10px;
        height: 100%;
        width: 100%;
        text-align: center;
    }

    .partialCategory {
        background-color: yellow;
        display: grid;
        place-items: center;
        margin: 10px;
        height: 100%;
        width: 100%;
        text-align: center;
    }

    .wrongCategory {
        background-color: red;
        display: grid;
        place-items: center;
        margin: 10px;
        height: 100%;
        width: 100%;
        text-align: center;
    }

    h1, h2, p {
        margin: 0;
    }
    
</style>