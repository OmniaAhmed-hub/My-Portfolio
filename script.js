const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const generateBtn = document.getElementById('generate-btn');
const speakBtn = document.getElementById('speak-btn');
const copyBtn = document.getElementById('copy-btn');
const themeToggle = document.getElementById('theme-toggle');

// Load theme preference
window.addEventListener('load', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
});

// Toggle dark/light mode
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Fetch quote from API
async function getQuote() {
  quoteText.textContent = 'Loading...';
  quoteAuthor.textContent = '';
  try {
    const res = await fetch('https://api.quotable.io/random');
    const data = await res.json();
    quoteText.textContent = `"${data.content}"`;
    quoteAuthor.textContent = `— ${data.author || 'Unknown'}`;
  } catch (err) {
    quoteText.textContent = 'Failed to fetch quote.';
    quoteAuthor.textContent = '';
  }
}

generateBtn.addEventListener('click', getQuote);

// Speak quote
speakBtn.addEventListener('click', () => {
  const utterance = new SpeechSynthesisUtterance(`${quoteText.textContent} by ${quoteAuthor.textContent}`);
  speechSynthesis.speak(utterance);
});

// Copy quote
copyBtn.addEventListener('click', () => {
  const text = `${quoteText.textContent} ${quoteAuthor.textContent}`;
  navigator.clipboard.writeText(text)
    .then(() => alert('✅ Quote copied!'))
    .catch(() => alert('❌ Failed to copy.'));
});
