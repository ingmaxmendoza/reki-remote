const toast = document.getElementById('toast');
let toastTimer = null;

function showError(message) {
  toast.textContent = message;
  toast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add('hidden'), 3000);
}

async function postJson(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(data.error || 'Request failed');
  }
}

document.querySelectorAll('.media-grid button').forEach((button) => {
  button.addEventListener('click', async () => {
    try {
      await postJson(`/media/${button.dataset.action}`);
    } catch (err) {
      showError(err.message);
    }
  });
});

const textInput = document.getElementById('text-input');
document.getElementById('send-text').addEventListener('click', async () => {
  const text = textInput.value;
  if (!text) return;
  try {
    await postJson('/type', { text });
    textInput.value = '';
  } catch (err) {
    showError(err.message);
  }
});
