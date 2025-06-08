document.addEventListener('DOMContentLoaded', () => {
    const toggleIngredientsBtn = document.getElementById('toggleIngredients');
    const ingredientsList = document.querySelector('.ingredients-list');
    const startCookingBtn = document.getElementById('startCooking');
    const nextStepBtn = document.getElementById('nextStep');
    const resetCookingBtn = document.getElementById('resetCooking');
    const printRecipeButton = document.getElementById('printRecipeButton');
    const instructionsList = document.querySelector('.instructions-list');
    const instructions = instructionsList.querySelectorAll('li');
    const progressBar = document.querySelector('.progress-bar');
    const prepTimeSpan = document.getElementById('prep-time');

    let currentStep = 0;
    let totalSteps = instructions.length;
    let timerInterval;
    const initialPrepTimeMinutes = 45;
    let remainingTime = initialPrepTimeMinutes * 60;

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    function startRecipeTimer() {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (remainingTime > 0) {
                remainingTime--;
                prepTimeSpan.textContent = formatTime(remainingTime);
            } else {
                clearInterval(timerInterval);
                prepTimeSpan.textContent = "Time's Up!";
                alert("Preparation time is over!");
            }
        }, 1000);
    }

    function resetRecipeTimer() {
        clearInterval(timerInterval);
        remainingTime = initialPrepTimeMinutes * 60;
        prepTimeSpan.textContent = `${initialPrepTimeMinutes} minutes`;
    }

    toggleIngredientsBtn.addEventListener('click', () => {
        ingredientsList.classList.toggle('hidden');
        if (ingredientsList.classList.contains('hidden')) {
            toggleIngredientsBtn.textContent = 'Show Ingredients';
        } else {
            toggleIngredientsBtn.textContent = 'Hide Ingredients';
        }
    });

    function updateProgressBar() {
        const progress = (currentStep / totalSteps) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function highlightStep(stepIndex) {
        instructions.forEach(step => step.classList.remove('active'));
        if (instructions[stepIndex]) {
            instructions[stepIndex].classList.add('active');
            instructions[stepIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    startCookingBtn.addEventListener('click', () => {
        currentStep = 0;
        highlightStep(currentStep);
        updateProgressBar();
        startCookingBtn.classList.add('hidden');
        nextStepBtn.classList.remove('hidden');
        resetCookingBtn.classList.remove('hidden');
        startRecipeTimer();
    });

    nextStepBtn.addEventListener('click', () => {
        if (currentStep < totalSteps - 1) {
            currentStep++;
            highlightStep(currentStep);
            updateProgressBar();
        } else {
            highlightStep(currentStep);
            updateProgressBar();
            alert('Recipe completed! Enjoy your delicious chocolate cake!');
            nextStepBtn.classList.add('hidden');
            clearInterval(timerInterval);
        }
    });

    resetCookingBtn.addEventListener('click', () => {
        currentStep = 0;
        highlightStep(-1);
        updateProgressBar();
        startCookingBtn.classList.remove('hidden');
        nextStepBtn.classList.add('hidden');
        resetCookingBtn.classList.add('hidden');
        resetRecipeTimer();
    });

    printRecipeButton.addEventListener('click', () => {
        window.print();
    });

    ingredientsList.classList.add('hidden');
    progressBar.style.width = '0%';
});
