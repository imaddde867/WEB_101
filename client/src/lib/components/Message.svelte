<script>
  import { PUBLIC_API_URL } from "$env/static/public";
  let message = $state("");

  const fetchMessage = async () => {
    const response = await fetch(PUBLIC_API_URL);
    const data = await response.json();
    message = data.message;
  };
</script>

<button onclick={fetchMessage}>Fetch message</button>

<p>Message is: {message}</p>