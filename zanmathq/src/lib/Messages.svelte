<script>
  import { onMount, onDestroy } from "svelte";
  import { currentUser, pb } from "./pocketbase";

  let newMessage;
  let messages = [];
  // let unsubscribe = () => void;

  onMount(async () => {
    // Get messages in the data base
    const resultList = await pb.collection('messages').getList(1,50, {
      sort: 'created',
      expand: 'user',
    });
    messages = resultList.items;

    //Subscribe to realtime messages
    pb
      .collection('messages')
      .subscribe('*', async ({action,record}) =>{
        if (action === 'create'){
          const user = await pb.collection('users').getOne(record.user);
          record.expand = {user};
          messages = [...messages, record]
        }
        if (action === 'delete'){
          messages = messages.filter((m) => m.id !== record.id);
        }
      });

  });

  async function sendMessage() {
    const data = {
      text: newMessage,
      user: $currentUser.id,
    };
    const createdMessage = await pb.collection('messages').create(data);
  }

  onDestroy(() => {
    pb.collection('messages').unsubscribe();
  })

</script>

<div class="messages">
  {#each messages as message (message.id)}
    <div class="msg">
      <img
        class="avatar"
        src={'https://i.pravatar.cc/40'}
        alt="avatar"
        width = "40px"
      />
      <div>
        <p>Send by @{message.expand?.user?.username}</p>
        <p class="msg-text">{message.txt}</p>
      </div>
    </div>
  {/each}
</div>

<form on:submit|preventDefault={sendMessage}>
  <input placeholder="Question" type="text" bind:value={newMessage} />
  <button type="submit">send</button>
</form>