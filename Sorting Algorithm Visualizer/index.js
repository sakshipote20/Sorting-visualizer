const arrayContainer = document.getElementById("array-container");
const loopStatus = document.getElementById("loop-status");
let paused = false;
const loopDetails = document.getElementById("loop-details");


const generateArray = () => {
    arrayContainer.innerHTML = "";

    const input = document.getElementById("array-input").value;
    const array = input.split(/[\s,]+/).map(Number);

    array.forEach(barHeight => {
        const arrayBar = document.createElement("div");
        arrayBar.classList.add("array-bar");
        arrayBar.style.height = `${barHeight}%`;
        arrayBar.textContent = barHeight;
        arrayContainer.appendChild(arrayBar);
    });

    loopStatus.textContent = "";
    paused = false; // Reset paused state
    document.getElementById("resume-btn").disabled = true; // Disable resume button
};


// Add Selection Sort Implementation
// Add Selection Sort Implementation
const selectionSortDescending = async () => {
    const bars = document.querySelectorAll(".array-bar");

    if (bars.length === 0) {
        loopStatus.textContent = "No array to sort! Please generate an array first.";
        return;
    }

    loopDetails.textContent = ""; // Clear previous details

    for (let i = bars.length - 1; i > 0; i--) {
        let maxIndex = 0;
        loopStatus.textContent = `Outer loop: i = ${i}`;
        loopDetails.innerHTML += `<div class=\"loop-separator\">Outer Loop i = ${i}</div>`;

        for (let j = 1; j <= i; j++) {
            await checkPause();

            // Highlight comparison
            bars[j].classList.add("compare");
            bars[maxIndex].classList.add("largest");

            const currentArray = Array.from(bars).map(bar => parseInt(bar.style.height));
            loopDetails.innerHTML += `<div>Comparing indices ${j} and ${maxIndex}, Array: [${currentArray.join(", ")}]</div>`;

            if (parseInt(bars[j].style.height) > parseInt(bars[maxIndex].style.height)) {
                bars[maxIndex].classList.remove("largest");
                maxIndex = j;
                bars[maxIndex].classList.add("largest");
            }

            bars[j].classList.remove("compare");
        }

        if (maxIndex !== i) {
            // Swap max element with the last unsorted element
            bars[maxIndex].classList.add("swap");
            bars[i].classList.add("swap");

            loopDetails.innerHTML += `<div style=\"color: #FF5733;\">Swapping ${bars[maxIndex].textContent} and ${bars[i].textContent}</div>`;
            await swap(bars[maxIndex], bars[i]);

            bars[maxIndex].classList.remove("swap");
            bars[i].classList.remove("swap");
        }

        // Mark the sorted element
        bars[i].classList.add("sorted");
        bars[i].textContent += " (Sorted)";
        await pause(500);
    }

    // Mark the first element as sorted
    bars[0].classList.add("sorted");
    bars[0].textContent += " (Sorted)";
    loopStatus.textContent = "Selection sort (descending) completed!";
    loopDetails.innerHTML += `<div style=\"margin-top: 10px; color: #33FF57; font-weight: bold;\">Selection Sort Completed! The array is now sorted.</div>`;
};

// Add button click event in HTML
document.getElementById("selection-sort-desc").addEventListener("click", selectionSortDescending);


// Add button click event in HTML
document.getElementById("selection-sort-desc").addEventListener("click", selectionSortDescending);


// Quick Sort implementation
const quickSort = async (low, high, loopIndex = 1) => {
    if (low < high) {
        loopStatus.textContent = `Quick Sort: Loop ${loopIndex}, low=${low}, high=${high}`;
        loopDetails.innerHTML += `<div class="loop-separator">Loop ${loopIndex}: low=${low}, high=${high}</div>`;

        const pi = await partition(low, high, loopIndex);

        // Recursively sort elements before and after the pivot
        await quickSort(low, pi - 1, loopIndex + 1);
        await quickSort(pi + 1, high, loopIndex + 1);
    }

    // If the sorting is complete
    if (low === 0 && high === document.querySelectorAll(".array-bar").length - 1) {
        loopStatus.textContent = "Quick sort completed!";
        loopDetails.innerHTML += `<div style="color: green;">Quick Sort Completed!</div>`;
    }
};

const partition = async (low, high, loopIndex) => {
    const bars = document.querySelectorAll(".array-bar");
    const pivot = parseInt(bars[high].style.height);

    // Highlight the pivot
    bars[high].style.backgroundColor = "red";
    bars[high].textContent = `${pivot} (Pivot)`;

    let i = low - 1;

    for (let j = low; j < high; j++) {
        await checkPause();

        // Highlight current comparison
        bars[j].style.backgroundColor = "#850F8D";

        if (parseInt(bars[j].style.height) < pivot) {
            i++;
            bars[i].style.backgroundColor = "#4CAF50"; // Highlight swap target
            await swap(bars[i], bars[j]);
        }

        bars[j].style.backgroundColor = "blueviolet"; // Revert color
    }

    // Place the pivot in the correct position
    await swap(bars[i + 1], bars[high]);

    // Reset bar colors and update text
    bars[high].style.backgroundColor = "blueviolet";
    bars[high].textContent = pivot; // Reset pivot text
    bars[i + 1].style.backgroundColor = "yellow"; // Mark as sorted
    bars[i + 1].textContent = `${pivot} (Sorted)`; // Update text to show it’s sorted

    // Log pivot placement and array state
    const arrayState = Array.from(bars).map(bar => parseInt(bar.style.height));
    loopDetails.innerHTML += `<div style="color: green;">Loop ${loopIndex}: Pivot=${pivot} placed at index ${i + 1}, Array: [${arrayState.join(", ")}]</div>`;
    await pause(500);

    return i + 1;
};

const startQuickSort = async () => {
    const bars = document.querySelectorAll(".array-bar");

    if (bars.length === 0) {
        loopStatus.textContent = "No array to sort! Please generate an array first.";
        return;
    }

    // Reset status and details
    loopStatus.textContent = "Starting quick sort...";
    loopDetails.innerHTML = "";

    await quickSort(0, bars.length - 1);

    // Mark all bars as sorted and update their text
    bars.forEach(bar => {
        bar.style.backgroundColor = "yellow";
        bar.textContent = `${parseInt(bar.style.height)} (Sorted)`;
    });
};




// Bubble Sort (Ascending)
const bubbleSortAscending = async () => {
    const bars = document.querySelectorAll(".array-bar");

    if (bars.length === 0) {
        loopStatus.textContent = "No array to sort! Please generate an array first.";
        return;
    }

    loopDetails.textContent = ""; // Clear previous details

    for (let i = 0; i < bars.length - 1; i++) {
        
        loopStatus.textContent = `Outer loop: i = ${i}`;
        loopDetails.innerHTML += `<div class="loop-separator">Outer Loop i = ${i}</div>`;

        for (let j = 0; j < bars.length - i - 1; j++) {
            await checkPause();

            // Highlight comparison
            loopStatus.textContent = `Outer loop: i = ${i}, Inner loop: j = ${j}`;
            bars[j].classList.add("compare");
            bars[j + 1].classList.add("compare");

            // Log current state
            const currentArray = Array.from(bars).map(bar => parseInt(bar.style.height));
            loopDetails.innerHTML += `<div>i = ${i}, j = ${j}, Array: [${currentArray.join(", ")}]</div>`;

            if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
                bars[j].classList.add("largest");
                bars[j + 1].classList.add("swap");

                // Log swap
                loopDetails.innerHTML += `<div style="color: crimson;">Swapping ${currentArray[j]} and ${currentArray[j + 1]}</div>`;
                await swap(bars[j], bars[j + 1]);

                bars[j].classList.remove("largest");
                bars[j + 1].classList.remove("swap");
            }

            bars[j].classList.remove("compare");
            bars[j + 1].classList.remove("compare");
        }

        bars[bars.length - 1 - i].style.backgroundColor = "yellow";
        bars[bars.length - 1 - i].textContent += " (Sorted)";
        await pause(500);
    }

    bars[0].style.backgroundColor = "yellow";
    bars[0].textContent += " (Sorted)";
    loopStatus.textContent = "Bubble sort (ascending) completed!";
};

const insertionSort = async () => {
    const bars = document.querySelectorAll(".array-bar");

    if (bars.length === 0) {
        loopStatus.textContent = "No array to sort! Please generate an array first.";
        return;
    }

    loopDetails.textContent = ""; // Clear previous details
    loopDetails.innerHTML += `<div class="loop-separator">Starting Insertion Sort...</div>`;

    for (let i = 1; i < bars.length; i++) {
        const key = parseInt(bars[i].style.height);
        bars[i].style.backgroundColor = "blue"; // Highlight the key element
        loopStatus.textContent = `Processing i = ${i}, Inserting Key = ${key}`;

        let j = i - 1;

        while (j >= 0 && parseInt(bars[j].style.height) > key) {
            await checkPause();

            // Shift element
            bars[j + 1].style.height = bars[j].style.height;
            bars[j + 1].textContent = bars[j].textContent;

            j--;
        }

        // Insert the key into the correct position
        bars[j + 1].style.height = `${key}%`;
        bars[j + 1].textContent = key;

        // Mark the key element and current array as sorted
        const updatedArray = Array.from(bars).map(bar => parseInt(bar.style.height));
        bars[j + 1].style.backgroundColor = "yellow";

        // Update details
        loopDetails.innerHTML += `<div style="color: darkgreen;">
            i = ${i}, j = ${j + 1}, Inserted Key = ${key}, Array: [${updatedArray.join(", ")}]
        </div>`;

        await pause(500);
    }

    bars.forEach(bar => bar.style.backgroundColor = "yellow"); // Mark all elements as sorted
    loopDetails.innerHTML += `<div style="margin-top: 10px; color: darkgreen; font-weight: bold;">
        Insertion Sort Completed! The array is now sorted.
    </div>`;
    loopStatus.textContent = "Insertion sort completed!";
};



const bubbleSortDescending = async () => {
    const bars = document.querySelectorAll(".array-bar");

    if (bars.length === 0) {
        loopStatus.textContent = "No array to sort! Please generate an array first.";
        return;
    }

    loopDetails.textContent = ""; // Clear previous details

    for (let i = 0; i < bars.length - 1; i++) {
        loopStatus.textContent = `Outer loop: i = ${i}`;
        loopDetails.innerHTML += `<div class="loop-separator">Outer Loop i = ${i}</div>`;

        for (let j = 0; j < bars.length - i - 1; j++) {
            await checkPause();

            loopStatus.textContent = `Outer loop: i = ${i}, Inner loop: j = ${j}`;
         

            const currentArray = Array.from(bars).map(bar => parseInt(bar.style.height));
            loopDetails.innerHTML += `<div>i = ${i}, j = ${j}, Array: [${currentArray.join(", ")}]</div>`;

            if (parseInt(bars[j].style.height) < parseInt(bars[j + 1].style.height)) {
                bars[j].classList.add("swap");
                bars[j + 1].classList.add("swap");

                loopDetails.innerHTML += `<div style="color: crimson;">Swapping ${currentArray[j]} and ${currentArray[j + 1]}</div>`;
                await swap(bars[j], bars[j + 1]);

                bars[j].classList.remove("swap");
                bars[j + 1].classList.remove("swap");
            }

        }

        bars[bars.length - 1 - i].classList.add("sorted");
        bars[bars.length - 1 - i].textContent += " (Sorted)";
        await pause(500);
    }

    bars[0].classList.add("sorted");
    bars[0].textContent += " (Sorted)";
    loopStatus.textContent = "Bubble sort (descending) completed!";
};


// Utility functions
const pause = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const swap = (bar1, bar2) => {
    return new Promise((resolve) => {
        const tempHeight = bar1.style.height;
        bar1.style.height = bar2.style.height;
        bar2.style.height = tempHeight;

        const tempText = bar1.textContent;
        bar1.textContent = bar2.textContent;
        bar2.textContent = tempText;

        setTimeout(() => resolve(), 300); // Delay for swap animation
    });
};

const togglePause = () => {
    paused = true;
    document.getElementById("pause-btn").disabled = true;
    document.getElementById("resume-btn").disabled = false;
    loopStatus.textContent = "Paused";
};

const resumeSorting = () => {
    paused = false;
    document.getElementById("pause-btn").disabled = false;
    document.getElementById("resume-btn").disabled = true;
};

const checkPause = async () => {
    while (paused) {
        await pause(100);
    }
};
