const input = document.getElementById("ipInput");
const searchBtn = document.getElementById("searchBtn");
const myIpBtn = document.getElementById("myIpBtn");
const result = document.getElementById("result");

function getGeo(ip) {

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
          <h3>Location</h3>
          <p><b>IP:</b> ${data.query}</p>
          <p><b>Continent:</b> ${data.continent}</p>
          <p><b>Country:</b> ${data.country} (${data.countryCode})</p>
          <p><b>Region:</b> ${data.regionName}</p>
          <p><b>City:</b> ${data.city}</p>
          <p><b>ZIP:</b> ${data.zip}</p>
          <p><b>Timezone:</b> ${data.timezone}</p>
          <p><b>Offset:</b> ${data.offset}</p>
          <p><b>Coordinates:</b> ${data.lat}, ${data.lon}</p>
        </div>

        <div class="section">
          <h3>Network</h3>
          <p><b>ISP:</b> ${data.isp}</p>
          <p><b>Org:</b> ${data.org}</p>
          <p><b>AS:</b> ${data.as}</p>
          <p><b>AS Name:</b> ${data.asname}</p>
        </div>

        <div class="section">
          <h3>Security</h3>
          <p><b>Mobile:</b> ${data.mobile}</p>
          <p><b>Proxy:</b> ${data.proxy}</p>
          <p><b>Hosting:</b> ${data.hosting}</p>
        </div>
      `;
    })
    .catch(() => {
      result.innerHTML = "Network error.";
    });
}

searchBtn.addEventListener("click", () => {
  getGeo(input.value);
});

myIpBtn.addEventListener("click", () => {
  getGeo(""); // current IP
});