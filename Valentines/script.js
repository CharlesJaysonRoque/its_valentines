document.addEventListener("DOMContentLoaded", () => {
  // ---------------- Emoji Rain ----------------
  const emojis = ["💕","✨","❤️","⭐","🌸","😘","🥰"];

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

    setTimeout(() => {
      span.remove();
    }, 6000);
  }

  setInterval(() => {
    createEmoji("left");
    createEmoji("right");
  }, 300);

  // ---------------- Supabase Setup ----------------
  const supabase = window.supabase.createClient(
    "https://hbulhidaoqefucdykuvc.supabase.co",  // Your Project URL
    "sb_publishable_ZcHRS0BigECa0RVVtV6XEg_4-SwVv5j" // Your anon key
  );

  // ---------------- Text Input Submit ----------------
  const btn = document.getElementById("firstBtn");
  const input = document.getElementById("firstA");

  btn.addEventListener("click", async () => {
    const answerText = input.value.trim();

    if (!answerText) {
      alert("Please type an answer! please? 🤗");
      return;
    }

    const { data, error } = await supabase
      .from("answers")   // Table name
      .insert([{ answer: answerText }]);

    if (error) {
      console.error(error);
      alert("your answer haven't received yet...");
    } else {
      alert("Answer appreciated 💖");
      input.value = "";
    }
  });

  // ---------------- Yes / No Buttons ----------------
  const yesBtn = document.getElementById("yesbtn");
  const noBtn = document.getElementById("nobtn");

  yesBtn.addEventListener("click", async () => {
    const { error } = await supabase.from("answers").insert([{ answer: "Yes" }]);
    if (!error) alert("Thank you 💖");
  });

  noBtn.addEventListener("click", async () => {
    const { error } = await supabase.from("answers").insert([{ answer: "No" }]);
    if (!error) alert("I guess you're meant for someone else 💖");
  });
});