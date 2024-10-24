<script>
    import{ currentUser, pb} from './pocketbase';

    let username;
    let password;

    console.log(pb)

    async function login() {
        await pb.collection('users').authWithPassword(username, password);
    }

    async function signUp(){
        try{
            const data = {
                "username": username,
                "password": password,
                "passwordConfirm": password,
            };
            console.log("the data object is " + data.username)
            const createdUser = await pb.collection('users').create(data);
            await login();
        } catch(err){
            console.log("Sign Up Failure")
            console.error(err)
        }
    }

    function signOut(){
        pb.authStore.clear();
    }
</script>

{#if $currentUser}
<p>
    Signed in as {$currentUser.username}
</p>
{:else}
<form on:submit|preventDefault>
    <input
        placeholder="Username"
        type="text"
        bind:value={username}
    />
    <input
        placeholder="Password"
        type="password"
        bind:value={password}
    />
    <button on:click={signUp}>Sign Up</button>
    <button on:click={login}>Login</button>
</form>
{/if}