//your JS code here. If required.
document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");

  // Utility: returns a Promise resolving after 1–3 seconds
  function createPromise(id) {
    const delay = Math.random() * 2 + 1; // 1–3 seconds

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: id, time: delay });
      }, delay * 1000);
    });
  }

  // Create the 3 promises
  const p1 = createPromise("Promise 1");
  const p2 = createPromise("Promise 2");
  const p3 = createPromise("Promise 3");

  // Wait for all to resolve
  const startTime = performance.now();

  Promise.all([p1, p2, p3])
    .then((results) => {
      // Remove loading row
      output.innerHTML = "";

      // Add each promise result
      results.forEach((result, index) => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = `Promise ${index + 1}`;

        const timeCell = document.createElement("td");
        timeCell.textContent = result.time.toFixed(3);

        row.appendChild(nameCell);
        row.appendChild(timeCell);

        output.appendChild(row);
      });

      // Add total time row
      const totalRow = document.createElement("tr");
      const totalName = document.createElement("td");
      const totalValue = document.createElement("td");

      totalName.textContent = "Total";

      const totalTime =
        (performance.now() - startTime) / 1000; // seconds

      totalValue.textContent = totalTime.toFixed(3);

      totalRow.appendChild(totalName);
      totalRow.appendChild(totalValue);
      output.appendChild(totalRow);
    });
});
