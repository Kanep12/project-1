const input = document.getElementById("ipInput");
const searchBtn = document.getElementById("searchBtn");
const myIpBtn = document.getElementById("myIpBtn");
const result = document.getElementById("result");

result.style.display = "none";

function getGeo(ip) {
  result.style.display = "block";
  result.innerHTML = "Loading...";

  fetch("http://ip-api.com/json/" + ip)
    .then(res => res.json())
    .then(data => {
      if (data.status === "fail") {
        result.innerHTML = "Error: " + data.message;
        return;
      }

      result.innerHTML = `
        <div class="section">
          <h3 class="text2">IP</h3>
          <p><b>IP:</b> ${data.query}</p>
        </div>

        <div class="section">
          <h3 class="text2">NETWORK</h3>
          <p><b>ISP:</b> ${data.isp}</p>
          <p><b>AS:</b> ${data.as}</p>
          <p><b>AS Name:</b> ${data.asname}</p>
                    <p><b>Org:</b> ${data.org}</p>
        </div>

        <div class="section">
          <h3 class="text2">LOC</h3>
          <p><b>Country:</b> ${data.country}</p>
          <p><b>Country Code:</b> ${data.countryCode}</p>
          <p><b>City:</b> ${data.city}</p>
                    <p><b>Region Name:</b> ${data.regionName}</p>
          <p><b>Lat:</b> ${data.lat}</p>
          <p><b>Lon:</b> ${data.lon}</p>



        </div>
      `;
    })
    .catch(() => {
      result.innerHTML = "Network error.";
    });
}

searchBtn.addEventListener("click", () => {
  if (input.value.trim() === "") {
    result.style.display = "none";
    return;
  }
  getGeo(input.value);
});

if (myIpBtn) {
  myIpBtn.addEventListener("click", () => {
    getGeo("");
  });
}