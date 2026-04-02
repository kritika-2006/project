let data = [];
let totalTime = 0;

function add() {
  let problem = document.getElementById("problem").value;
  let time = parseInt(document.getElementById("time").value);

  if (problem === "" || isNaN(time)) {
    alert("Enter valid data");
    return;
  }

  data.push({ problem: problem.toLowerCase(), time: time });
  totalTime += time;

  display();
  suggest();

  document.getElementById("problem").value = "";
  document.getElementById("time").value = "";
}

function display() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(item => {
    let li = document.createElement("li");
    li.innerText = item.problem + " - " + item.time + " min";
    list.appendChild(li);
  });

  document.getElementById("totalTime").innerText = totalTime + " minutes";
}

function suggest() {
  let count = {};
  let max = 0;
  let top = "";

  data.forEach(item => {
    count[item.problem] = (count[item.problem] || 0) + 1;
  });

  for (let p in count) {
    if (count[p] > max) {
      max = count[p];
      top = p;
    }
  }

  let solution = "";

  if (top.includes("late")) {
    solution = "⏰ Set fixed alarms and prepare earlier";
  } else if (top.includes("lost") || top.includes("keys") || top.includes("charger")) {
    solution = "📍 Keep items at fixed places";
  } else if (top.includes("forget")) {
    solution = "🧠 Use reminders or sticky notes";
  } else {
    solution = "📅 Plan your day and prioritize tasks";
  }

  document.getElementById("suggestion").innerText =
    solution + "\n\nYou can save approx " + Math.floor(totalTime * 0.5) + " minutes daily!";
}