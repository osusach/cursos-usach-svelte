<script>
	import { loginInfo } from '$lib';
    loginInfo.subscribe(()=>{
        console.log("hubo");
        console.log($loginInfo);
        
        
    })
</script>

{#if $loginInfo.islogged}
	<div>{$loginInfo.name}</div>
	<div>{$loginInfo.picture}</div>
	<div>AAAAAAAAAAA</div>
{/if}

{#if $loginInfo.islogged}
	<div>{$loginInfo.name}</div>
	<div>{$loginInfo.picture}</div>
	<div>AAAAAAAAAAA</div>
{/if}
