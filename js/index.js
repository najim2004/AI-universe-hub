const loadCardsData=async()=>{
    const res=await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data=await res.json();
    displayCards(data.data.tools);
}

const displayCards=(cardsData)=>{
    const cardsSection=document.getElementById('cards-section');
    cardsData.forEach(cardData => {
        const aiName=cardData.name;
        const aiImg=cardData.image;
        const aiFeatures=cardData.features;
        const ol=document.createElement('ol');
        ol.classList.add('list-decimal','list-inside','text-[#585858]');
        aiFeatures.forEach(feature => {
            const li=document.createElement('li');
            li.innerText=feature;
            ol.appendChild(li);
        });
        const div=document.createElement('div');
        div.innerHTML=`
            <div class="p-6 border-[1px] w-[448px] border-[rgba(17,17,17,0.10)] rounded-2xl">
                <img class="bg-gray-300 w-[437px] h-[280px] mb-6 rounded-2xl" src="${aiImg}" alt="">

                <div class="">
                    <h3 class="text-2xl font-semibold">Features</h3>
                    ${ol}
                </div>
                <hr class="my-6 bg-[rgba(17,17,17,0.10)]">
                <div class="flex justify-between items-center">
                    <div class="">
                        <h3 class="text-2xl font-semibold">${aiName}</h3>
                        <p class="mt-4 text-[#585858] flex gap-2 items-center"><img src="./icons/calendar.svg" alt="">11/01/2022</p>
                    </div>
                    <button class="btn size-[50px] rounded-[50%] bg-[#FEF7F7]"><img class="size-6" src="./icons/r-arrow.svg" alt=""></button>
                </div>
            </div>
        `
        cardsSection.appendChild(div);
    });

}

loadCardsData();