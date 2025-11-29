let targetStar = 6;

// Setup target star selector
document.querySelectorAll("#targetStarSelector .star-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll("#targetStarSelector .star-btn")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
    targetStar = parseInt(this.dataset.star);
  });
});

function calculate() {
  // Hitung total kebutuhan untuk bintang target
  // Bintang 0 = 1 karakter
  // Bintang 1 = 2 karakter bintang 0
  // Bintang 2 = 2 karakter bintang 1 = 4 karakter bintang 0
  // Bintang n = 2^n karakter bintang 0
  const totalNeeded = Math.pow(2, targetStar);

  // Hitung total nilai yang sudah dimiliki (dalam setara bintang 0)
  let totalOwnedValue = 0;
  let breakdownHTML = "";

  for (let i = 0; i <= 5; i++) {
    const input = document.getElementById(`inv${i}`);
    const count = parseInt(input.value) || 0;

    if (count > 0) {
      const valuePerChar = Math.pow(2, i);
      const totalValue = count * valuePerChar;
      totalOwnedValue += totalValue;

      breakdownHTML += `
                <div class="breakdown-item">
                    <span>★${i} × ${count} karakter (2^${i} = ${valuePerChar} per karakter)</span>
                    <span style="color: #667eea; font-weight: 600;">${totalValue.toLocaleString(
                      "id-ID"
                    )}</span>
                </div>
            `;
    }
  }

  if (breakdownHTML === "") {
    breakdownHTML =
      '<div class="breakdown-item"><span style="color: #999;">Tidak ada karakter yang dimiliki</span></div>';
  }

  // Hitung sisa kebutuhan
  const remaining = Math.max(0, totalNeeded - totalOwnedValue);

  // Tampilkan hasil
  document.getElementById("targetDisplay").textContent = targetStar;
  document.getElementById("totalNeeded").textContent =
    totalNeeded.toLocaleString("id-ID") + " (2^" + targetStar + ")";
  document.getElementById("totalOwned").textContent =
    totalOwnedValue.toLocaleString("id-ID");
  document.getElementById("remaining").textContent =
    remaining.toLocaleString("id-ID");
  document.getElementById("breakdownList").innerHTML = breakdownHTML;

  document.getElementById("result").classList.add("show");

  // Scroll to result
  document
    .getElementById("result")
    .scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Auto calculate on Enter key in input fields
document.querySelectorAll('input[type="number"]').forEach((input) => {
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      calculate();
    }
  });
});
