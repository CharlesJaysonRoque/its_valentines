document.addEventListener("DOMContentLoaded", () => {
  const supabase = window.supabase.createClient(
    "https://hbulhidaoqefucdykuvc.supabase.co",
    "sb_publishable_ZcHRS0BigECa0RVVtV6XEg_4-SwVv5j"
  );

  // Text input (question one)
  const btn = document.getElementById("firstBtn");
  const input = document.getElementById("firstA");

  btn.addEventListener("click", async () => {
    const answerText = input.value.trim();
    if (!answerText) {
      alert("Please type an answer!");
      return;
    }

    const { data, error } = await supabase
      .from("answers") // table name
      .insert([{ question_one: answerText }]); // column name

    if (error) {
      console.error(error);
      alert("Error saving answer.");
    } else {
      alert("Answer saved 💖");
      input.value = "";
    }
  });

  // Yes / No buttons (question two)
  const yesBtn = document.getElementById("yesbtn");
  const noBtn = document.getElementById("nobtn");

  yesBtn.addEventListener("click", async () => {
    const { error } = await supabase
      .from("answers")
      .insert([{ question_two: "Yes" }]); // column name
    if (!error) alert("Yes saved 💖");
  });

  noBtn.addEventListener("click", async () => {
    const { error } = await supabase
      .from("answers")
      .insert([{ question_two: "No" }]); // column name
    if (!error) alert("No saved 💖");
  });

  // Emoji rain code stays the same
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
