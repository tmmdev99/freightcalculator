function toggleFlow() {
  const type = document.getElementById("shipmentType").value;
  document.getElementById("partnerSection").style.display = type === "flowB" ? "block" : "none";
}

function calculate() {
  const length = parseFloat(document.getElementById("length").value);
  const width = parseFloat(document.getElementById("width").value);
  const height = parseFloat(document.getElementById("height").value);
  const actualWeight = parseFloat(document.getElementById("actualWeight").value);
  const zone = parseInt(document.getElementById("zone").value);
  const handlingFee = parseFloat(document.getElementById("handlingFee").value);
  const fuelPercent = parseFloat(document.getElementById("fuelPercent").value);
  const addOns = parseFloat(document.getElementById("addOns").value);
  const shipmentType = document.getElementById("shipmentType").value;
  const partner = document.getElementById("partner").value;

  const dimensionalWeight = (length * width * height) / 6000;
  const chargeableWeight = Math.max(actualWeight, dimensionalWeight);

  const zoneRates = {
    1: 0.80,
    2: 0.90,
    3: 1.00,
    4: 1.10,
    5: 1.25
  };
  let ratePerKg = zoneRates[zone] || 1.00;

  // Partner-specific adjustment
  if (shipmentType === "flowB") {
    if (partner === "Mobutolin") ratePerKg += 0.10;
    if (partner === "Jays") ratePerKg += 0.15;
  }

  const baseCost = chargeableWeight * ratePerKg;
  const fuelSurcharge = baseCost * (fuelPercent / 100);
  const totalCost = baseCost + handlingFee + fuelSurcharge + addOns;

  document.getElementById("results").innerHTML = `
    <strong>Chargeable Weight:</strong> ${chargeableWeight.toFixed(2)} kg<br>
    <strong>Rate per kg:</strong> $${ratePerKg.toFixed(2)}<br>
    <strong>Base Cost:</strong> $${baseCost.toFixed(2)}<br>
    <strong>Fuel Surcharge:</strong> $${fuelSurcharge.toFixed(2)}<br>
    <strong>Handling Fee:</strong> $${handlingFee.toFixed(2)}<br>
    <strong>Add-ons:</strong> $${addOns.toFixed(2)}<br>
    <hr>
    <strong>Total Cost:</strong> <span style="color:green;">$${totalCost.toFixed(2)}</span>
  `;
}