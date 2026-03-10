<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


<header>
	<a href="/"><h1> Dle Maker</h1></a>

	{#if data.user == null}
		<button onclick={() => {window.location.href = "/login";}}>Login</button>
	{:else}
		<a href="/create"><p>Create your own Dle</p></a>
		<div>
			<h2>{data.user.username}</h2>
			<button onclick={() => {window.location.href = "/logout"}}>Logout</button>
		</div>
	{/if}

</header>


<main>
	{@render children()}
</main>


<footer>
	<a href="/privacy_policy"><p>Privacy Policy</p></a>
</footer>



<style>

	:global(*) {
		transition: ease-in-out 0.2s;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		font-family: Arial, sans-serif;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}


	:global(a) {
		text-decoration: none;

	}

	:global(main) {
		flex: 1;
	}

	header {
		width: 100% - 40px;
		height: 80px;
		background-color: black;
		position: sticky;
		top: 0;
		padding: 0px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20px;
	}

	footer {
		width: 100vw;
		height: 80px;
		background-color: black;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	main {
		margin: 20px;
	}

	h1, h2, p {
		margin: 0;
		color: white;
	}

	button {
		width: 100px;
		height: 40px;
		margin-right: 40px;
	}

	:global(a:hover) {
		transform: scale(1.1);
	}


</style>