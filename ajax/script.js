// XMLHttpRequest
(() => {
  const xhr = new XMLHttpRequest(),
    $xhr = document.getElementById("xhr"),
    $fragment = document.createDocumentFragment();

  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) return;
    if (xhr.status >= 200 && xhr.status < 300) {
      let json = JSON.parse(xhr.responseText);
      // console.log(json);

      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
        $fragment.appendChild($li);
      });
      $xhr.appendChild($fragment);
    } else {
      console.log("Error:( ");
      const message = xhr.statusText || "Ocurrio un error";
      $xhr.innerHTML = `Error: ${xhr.status}: ${message}`;
    }
    // console.log(xhr);
  });
  xhr.open("GET", "https://jsonplaceholder.typicode.com/users");

  xhr.send();
})();

// Api fetch
(() => {
  const $fetch = document.getElementById("fetch"),
    $fragment = document.createDocumentFragment();

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
        $fragment.appendChild($li);
      });
      $fetch.appendChild($fragment);
      // console.log(json);
    })
    .catch((err) => {
      const message = err.statusText || "Ocurrio un error";
      $fetch.innerHTML = `Error: ${err.status}: ${message}`;
      console.log("Error ", err);
    })

    .finally
    // console.log("Esto se ejecutara independientemente de la respuesta fetch")
    ();
})();

// Api fetch con async
(() => {
  const $fetchAsync = document.getElementById("fetch-async"),
    $fragment = document.createDocumentFragment();

  async function getData() {
    try {
      let res = await fetch("https://jsonplaceholder.typicode.com/users"),
        json = await res.json();

      console.log(res, json);

      if (!res.ok) throw { status: res.status, statusText: res.statusText };

      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
        $fragment.appendChild($li);
      });
      $fetchAsync.appendChild($fragment);
    } catch (err) {
      const message = err.statusText || "Ocurrio un error";
      $fetchAsync.innerHTML = `Error: ${err.status}: ${message}`;
    } finally {
    }
  }

  getData();
})();

// Axios
(() => {
  const $axios = document.getElementById("axios"),
    $fragment = document.createDocumentFragment();

  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      console.log(res);
      res.data.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
        $fragment.appendChild($li);
      });
      $axios.appendChild($fragment);
    })
    .catch((err) => {
      console.log(err.response);
      const message = err.response.statusText || "Ocurrio un error";
      $axios.innerHTML = `Error: ${err.response.status}: ${message}`;
    })
    .finally(console.log("Finally de axios"));
})();

// Axios con async
(() => {
  const $axiosAsync = document.getElementById("axiosAsync"),
    $fragment = document.createDocumentFragment();

  async function getData() {
    try {
      let res = await axios.get("https://jsonplaceholder.typicode.com/users"),
        json = await res.data;

      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
        $fragment.appendChild($li);
      });
      $axiosAsync.appendChild($fragment);
    } catch (err) {
      console.log(err.response);
      const message = err.response.statusText || "Ocurrio un error";
      $axiosAsync.innerHTML = `Error: ${err.response.status}: ${message}`;
    } finally {
      console.log("Finally de axiosAsync");
    }
  }

  getData();
})();
