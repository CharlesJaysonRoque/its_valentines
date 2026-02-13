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
      .from("Answer") // <-- exact table name
      .insert([{ question_one: answerText, question_two: "" }]);

    if (error) {
      console.error(error);
      alert("Error saving answer: " + error.message);
    } else {
      alert("Answer saved 💖");
      input.value = "";
    }
  });

  // Yes / No buttons (question two)
  const yesBtn = document.getElementById("yesbtn");
  const noBtn = document.getElementById("nobtn");

  yesBtn.addEventListener("click", async () => {
    const { data, error } = await supabase
      .from("Answer")
      .insert([{ question_one: "", question_two: "Yes" }]);
    if (error) {
      console.error(error);
      alert("Error saving Yes: " + error.message);
    } else alert("Yes saved 💖");
  });

  noBtn.addEventListener("click", async () => {
    const { data, error } = await supabase
      .from("Answer")
      .insert([{ question_one: "", question_two: "No" }]);
    if (error) {
      console.error(error);
      alert("Error saving No: " + error.message);
    } else alert("No saved 💖");
  });

  // Emoji rain
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
