const arrayContainer = document.getElementById("array-container");

const generateArray = () =>{
    arrayContainer.innerHTML = "";
    
    for(let i=0; i<20; i++){
        const barHeight = Math.floor(Math.random() * 80) + 20;
        const arrayBar = document.createElement("div");
        arrayBar.classList.add("array-bar");
        arrayBar.style.height = `${barHeight}%`;
        arrayBar.textContent = barHeight;
        arrayContainer.appendChild(arrayBar);
    }

}

const bubbleSort = async() =>{
    const bars = document.querySelectorAll(".array-bar");
    for(let i=0; i< bars.length-1; i++){
        for(let j=0; j<bars.length-i-1; j++){
            bars[j].style.backgroundColor = "#850F8D";
            bars[j+1].style.backgroundColor = "#850F8D";

            if(parseInt(bars[j].style.height) > parseInt(bars[j+1].style.height)){
                await swap(bars[j], bars[j+1]);
            }

            bars[j].style.backgroundColor = "blueviolet";
            bars[j+1].style.backgroundColor = "blueviolet";
        }
        bars[bars.length-1-i].style.backgroundColor = "yellow";
        bars[bars.length-1-i].style.color = "black";
    }

}

async function merge(bars, low, mid, high){
    const temp=[];
    
    let left = low;
    let right = mid+1;
    
    while(left <= mid && right <= high){
        if(parseInt(bars[left].style.height) <= parseInt(bars[right].style.height)){
            temp.push(bars[left]);
            left++;
        }else{
            temp.push(bars[right]);
            right++;
        }
    }
    while(left <= mid){
        temp.push(bars[left]);
        left++;
    }
    while(right <= high){
        temp.push(bars[right]);
        right++;
    }

    for(let i=low; i<=high; i++){
        bars[i] = temp[i-low];
    }

    const parent = bars[0].parentNode; // Assuming all bars have the same parent
    temp.forEach(bar => {
        parent.appendChild(bar); // This will reorder the elements in the DOM
    });

    await new Promise(resolve => setTimeout(resolve, 500)); ////////////
}

async function mergeSortHelper (bars, low, high) {
    if(low >= high) return;
    let mid = Math.floor((low + high)/2);
    await mergeSortHelper(bars,low, mid );
    await mergeSortHelper(bars, mid+1, high);
    await merge(bars, low, mid, high);
}

async function mergeSort (){
    const bars = Array.from(document.querySelectorAll(".array-bar"));
    await mergeSortHelper(bars, 0, bars.length-1);

}


const swap = (bar1, bar2) =>{
    return new Promise ((resolve) =>{
        const tempHeight = bar1.style.height;
        bar1.style.height = bar2.style.height;
        bar2.style.height = tempHeight;

        const tempText = bar1.textContent;
        bar1.textContent = bar2.textContent;
        bar2.textContent = tempText;

        setTimeout(()=>{
            resolve();
        }, 200)

    });
}


