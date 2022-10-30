let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

let galleryMarvel = document.getElementById("galleryMarvel");
let next = document.getElementById("next");
let back = document.getElementById("back");

fetchApi("https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=d85331878d40f6e2720a83fbbb943139&hash=fbca8b43b324301df96186ad2b90ece5", requestOptions, "getMarvel(data1)");

function fetchApi(url, requestOptions, method) {
    fetch(url, requestOptions)
        .then(response => response.json())  // convertir a json
        .then(data1 => eval(method))    //imprimir los datos en la consola
        .catch(err => console.log('Solicitud fallida', err)); // Capturar errores
}

function getMarvel(marvel) {
    next.setAttribute("title", marvel.next);
    back.setAttribute("title", marvel.previous);

    for (const marvelP of marvel.json.results) {
        fetchApi(marvelP.thumbnail.path, requestOptions, "createdMarvel(data1)");
    }
}

function createdMarvel(marvel) {
    let img = marvel.data.results.thumbnail.path
    let marvelInfo = {
        image_url: img == null ? marvel.data.results.thumbnail.path: img,
        name: marvel.data.results.name,
        type: marvel.data.results[0].modified
    }

    skills = getStories(marvel.data.results.stories);

    galleryMarvel.innerHTML += `<article onclick="getMarvelDetail('${marvelInfo.image_url}', '${marvelInfo.name}', '${skills}')" class="card-marvel">
                            <div class="card-marvel__img">
                                <img src="${marvelInfo.image_url}" alt="images">
                            </div>
                            <div class="card-marvel_content">
                                <h2 class="card-marvel__title">${marvelInfo.name}<br><span class="card-marvel__text">Type: ${marvelInfo.type}</span></h2>
                            </div>
                        </article>`;
}

function getMarvelDetail(imageUrl, name, skills) {
    Swal.fire({
        html:
            `<h1><b>${name}</b></h1>
            ${skills}`,
        imageUrl: imageUrl,
        width: 600,
        imageHeight: 500,
        background: '#212121',
        imageAlt: 'A tall image'
    });
}

function update(btn) {
    if(eval(btn + ".title !== 'null'")) {
        galleryMarvel.innerHTML = "";

        window.scroll({ top: 0, left: 0, behavior: 'smooth' });

        eval("fetchApi(" + btn + ".title, requestOptions, 'getMarvel(data)');");
    }
}

function getStories(stories) {
    let skills = "";

    for (storie of stories) {
        skills += `<p><b>${storie.items.name}:</b> ${storie.items.type}</p>`;
    }
    return skills;
}










