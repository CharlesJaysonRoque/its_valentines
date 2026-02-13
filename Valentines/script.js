document.addEventListener("DOMContentLoaded", () => {
  const supabase = window.supabase.createClient(
    "https://hbulhidaoqefucdykuvc.supabase.co",
    "sb_publishable_ZcHRS0BigECa0RVVtV6XEg_4-SwVv5j"
  );

  // Elements
  const input = document.getElementById("firstA");
  const yesBtn = document.getElementById("yesbtn");
  const noBtn = document.getElementById("nobtn");

  // ---------------- Yes/No buttons (save input + yes/no) ----------------
  async function saveAnswer(answer) {
    const answerText = input.value.trim(); // grab text input

    const { data, error } = await supabase
      .from("Answer")
      .insert([{ question_one: answerText, question_two: answer }]);

    if (error) {
      console.error(error);
      alert("Error saving answer: " + error.message);
    } else {
      alert(`Thank you for answering 💖`);
      input.value = ""; // clear input field
    }
  }

  yesBtn.addEventListener("click", () => saveAnswer("Yes"));
  noBtn.addEventListener("click", () => saveAnswer("No"));

  // ---------------- Emoji rain ----------------
  const emojis = ["💕","✨","❤️","⭐","🌸","😘"];
  function createEmoji(side) {
    const container = document.querySelector(`.emoji-rain.${side}`);
    if (!container) return;
    const span = document.createElement("span");
    span.classList.add("emoji");
    span.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    span.style.left = Math.random() * 170 + "px";
    span.style.animationDuration = (Math.random() * 3 + 3) + "s";
    span.style.fontSize = (Math.random() * 15 + 15) + "px";
    container.appendChild(span);
    setTimeout(() => span.remove(), 6000);
  }

  setInterval(() => {
    createEmoji("left");
    createEmoji("right");
  }, 300);
});

