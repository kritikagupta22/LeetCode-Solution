const fs = require("fs");

const stats = JSON.parse(fs.readFileSync("stats.json", "utf8"));

// Read all uploaded problems
const problems = Object.entries(stats.leetcode.shas)
    .filter(([key]) => /^\d/.test(key));

const solved = problems.length;

let easy = 0;
let medium = 0;
let hard = 0;
let unknown = 0;

// Count difficulty
for (const [, value] of problems) {
    switch ((value.difficulty || "").toLowerCase()) {
        case "easy":
            easy++;
            break;
        case "medium":
            medium++;
            break;
        case "hard":
            hard++;
            break;
        default:
            unknown++;
    }
}

// Progress bar
function bar(value, total, color) {
    const length = 10;
    const filled = Math.round((value / Math.max(total, 1)) * length);
    return color.repeat(filled) + "⬜".repeat(length - filled);
}

// Last Updated
const lastDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
});

// Latest 5 uploaded (highest problem number)
const recent = problems
    .map(([name]) => name)
    .sort((a, b) => parseInt(b) - parseInt(a))
    .slice(0, 5)
    .map(problem =>
        problem
            .replace(/^\d+-/, "")
            .replace(/-/g, " ")
            .replace(/\b\w/g, c => c.toUpperCase())
    );

const dashboard = `

## 📊 Upload Dashboard

🚀 **Total Uploaded:** **${solved}**

🟢 **Easy (${easy})**

${bar(easy, solved, "🟩")}

🟡 **Medium (${medium})**

${bar(medium, solved, "🟨")}

🔴 **Hard (${hard})**

${bar(hard, solved, "🟥")}

⚪ **Unknown (${unknown})**

${bar(unknown, solved, "⬜")}

---

## 📚 Recently Solved

${recent.map(problem => `✔ ${problem}`).join("\n")}

---

## 📈 Repository Overview

📂 **Repository:** LeetCode Solutions

🧩 **Problems Uploaded:** ${solved}

📅 **Last Updated:** ${lastDate}

🤖 Auto Synced using **LeetHub v2**

`;

let readme = fs.readFileSync("README.md", "utf8");

const start = "<!-- STATS_START -->";
const end = "<!-- STATS_END -->";

const regex = new RegExp(`${start}[\\s\\S]*${end}`);

readme = readme.replace(
    regex,
`${start}

${dashboard}

${end}`
);

fs.writeFileSync("README.md", readme);

console.log("README Updated Successfully!");
