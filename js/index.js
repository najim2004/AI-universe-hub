const loadCardsData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    displayCards(data.data.tools);
}

const displayCards = (cardsData) => {
    const cardsSection = document.getElementById('cards-section');
    cardsData.forEach(cardData => {
        const aiName = cardData.name;
        const aiImg = cardData.image;
        const publishDate = cardData['published_in'];
        const aiFeatures = cardData.features;
        const ol = document.createElement('ol');
        ol.classList.add('list-decimal', 'list-inside', 'text-[#585858]');
        for (const feature of aiFeatures) {
            const li = document.createElement('li');
            li.innerText = feature;
            ol.appendChild(li);
        }
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="p-6 border-[1px] w-[448px] border-[rgba(17,17,17,0.10)] rounded-2xl">
                <img class="bg-gray-300 w-[437px] h-[280px] mb-6 rounded-2xl" src="${aiImg}" alt="">

                <div id="${cardData.id}">
                    <h3 class="text-2xl font-semibold">Features</h3>
                    
                </div>
                <hr class="my-6 bg-[rgba(17,17,17,0.10)]">
                <div class="flex justify-between items-center">
                    <div class="">
                        <h3 class="text-2xl font-semibold">${aiName}</h3>
                        <p class="mt-4 text-[#585858] flex gap-2 items-center"><img src="./icons/calendar.svg" alt="">${publishDate}</p>
                    </div>
                    <button onclick="detailsBtn('${cardData.id}')" class="btn size-[50px] rounded-[50%] bg-[#FEF7F7]"><img class="size-6" src="./icons/r-arrow.svg" alt=""></button>
                </div>
            </div>
        `
        cardsSection.appendChild(div);
        document.getElementById(`${cardData.id}`).appendChild(ol)

    });
}
const loadCardsDataById = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    showDetails(data.data, id)
}
const detailsBtn = (id) => {
    loadCardsDataById(id);
}

const showDetails = (data, id) => {

    const description = data.description;

    const imageLink = data.image_link[0];

    const inputOutputExamples = data.input_output_examples[0];

    const inputExample = inputOutputExamples.input;

    const outputExample = inputOutputExamples.output;

    const integrations = data.integrations;

    const features = data.features;

    const ula = document.createElement('ul');

    ula.classList.add('list-disc', 'text-[#585858]');

    for (const key in features) {

        const li = document.createElement('li')

        li.innerText = features[`${key}`].feature_name;

        ula.appendChild(li);
    }

    const pricing = data.pricing;

    const plan1 = pricing[0].plan;
    const plan2 = pricing[1].plan;
    const plan3 = pricing[2].plan;
    const price1 = pricing[0].price;
    const price2 = pricing[1].price;
    const price3 = pricing[2].price;



    const ul = document.createElement('ul');

    ul.classList.add('list-disc', 'text-[#585858]');

    for (const i of integrations) {

        const li = document.createElement('li');

        li.innerText = i;

        ul.appendChild(li);

    }
    const modal = document.getElementById('modal');

    const modalHtml = `
        <section
            class="fixed top-0 h-full w-full flex justify-center lg:items-center overflow-y-scroll bg-[rgba(17,17,17,0.60)]">
            
            <div class="relative min-h-[680px] w-[1246px] bg-white rounded-2xl flex flex-wrap justify-center items-center gap-5">

                <button onclick="modalClose()" class="lg:absolute -top-2 -right-3 btn btn-circle bg-[#EB5757] text-white text-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div class="bg-[rgba(235,87,87,0.05)] p-10 rounded-2xl border-[#EB5757] border-[1px]">
                    <p class="max-w-[423px] text-2xl font-semibold leading-9">${description}</p>
                    <div class="flex flex-wrap gap-4 mt-6">
                        <div
                            class="w-[132px] h-[100px] bg-white rounded-2xl text-[#03A30A] font-bold flex flex-col justify-center items-center text-center">
                            ${price1}
                            <br>
                            ${plan1}
                        </div>
                        <div
                            class="w-[132px] h-[100px] bg-white rounded-2xl font-bold flex flex-col justify-center items-center text-center text-[#F28927]">
                            ${price2}
                            <br>
                            ${plan2}
                        </div>
                        <div
                            class="w-[132px] h-[100px] bg-white rounded-2xl font-bold flex flex-col justify-center items-center text-center text-[#EB5757]">
                            Contact
                            ${price3}
                            <br>
                            ${plan3}
                        </div>
                    </div>
                    <div class=" flex justify-between mt-6">
                        <div id="x" class="max-w-[250px]">
                            <h3 class="text-2xl font-semibold mb-4">Features</h3>
                        </div>
                        <div id="${id}a" class="max-w-[140px]">
                            <h3 class="text-2xl font-semibold mb-4">Integrations</h3>
                        </div>

                    </div>
                </div>
                <div class="text-center border-[1px] border-[#E7E7E7] rounded-2xl p-5">
                    <img class="w-[437px] h-[339px] rounded-2xl bg-gray-300" src="${imageLink}" alt="">
                    <h3 class="max-w-[437px] mx-auto text-2xl font-semibold mt-6 mb-4">${inputExample}</h3>
                    <p class="text-[#585858] max-w-[361px] mx-auto">${outputExample}</p>

                </div>
            </div>
        </section>
    `
    modal.innerHTML = modalHtml;

    document.getElementById(`x`).appendChild(ula);

    document.getElementById(`${id}a`).appendChild(ul);
}
const modalClose = () => {

    document.getElementById('modal').innerHTML = '';
}
loadCardsData();