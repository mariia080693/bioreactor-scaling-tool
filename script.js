// DOM elements
const sourceReactorSelect = document.getElementById('sourceReactor');
const targetReactorSelect = document.getElementById('targetReactor');
const sourceImage = document.getElementById('sourceImage');
const targetImage = document.getElementById('targetImage');
const runButton = document.getElementById('runScaling');
const resultsSection = document.getElementById('resultsSection');

// Source reactor controls
const workingVolumeSlider = document.getElementById('workingVolume');
const workingVolumeValue = document.getElementById('workingVolumeValue');
const stirrerSpeedSlider = document.getElementById('stirrerSpeed');
const stirrerSpeedValue = document.getElementById('stirrerSpeedValue');
const gasFlowRateSlider = document.getElementById('gasFlowRate');
const gasFlowRateValue = document.getElementById('gasFlowRateValue');

// Target reactor controls
const targetWorkingVolumeSlider = document.getElementById('targetWorkingVolume');
const targetWorkingVolumeValue = document.getElementById('targetWorkingVolumeValue');
const targetStirrerSpeedSlider = document.getElementById('targetStirrerSpeed');
const targetStirrerSpeedValue = document.getElementById('targetStirrerSpeedValue');
const targetGasFlowRateSlider = document.getElementById('targetGasFlowRate');
const targetGasFlowRateValue = document.getElementById('targetGasFlowRateValue');

// Advanced settings
const enableEditingCheckbox = document.getElementById('enableEditing');
const klaWeightSlider = document.getElementById('klaWeight');
const mixingWeightSlider = document.getElementById('mixingWeight');
const shearWeightSlider = document.getElementById('shearWeight');
const gasHoldUpWeightSlider = document.getElementById('gasHoldUpWeight');
const kolmogorovWeightSlider = document.getElementById('kolmogorovWeight');

// Results elements
const recommendedSpeed = document.getElementById('recommendedSpeed');
const recommendedFlow = document.getElementById('recommendedFlow');

// Principles section elements
const principlesSection = document.getElementById('principlesSection');
const speedFormula = document.getElementById('speedFormula');
const flowFormula = document.getElementById('flowFormula');

// Reactor configurations
const reactorConfigs = {
    source: {
        Sartorius_250mL: { 
            image: 'Sartorius_Ambr_250ml.png', 
            volume: 0.25, 
            maxSpeed: 4500,
            displayName: 'Sartorius 250mL',
            workingVolumeRange: { min: 0.1, max: 0.25 },
            stirrerSpeedRange: { min: 100, max: 4500 },
            gasFlowRateRange: { min: 0.01, max: 1.0 }
        },
        Sartorius_5L: { 
            image: 'Sartorius_5L.PNG', 
            volume: 5, 
            maxSpeed: 1200,
            displayName: 'Sartorius 5L',
            workingVolumeRange: { min: 3.5, max: 5 },
            stirrerSpeedRange: { min: 50, max: 1200 },
            gasFlowRateRange: { min: 0.01, max: 0.1 }
        },
        Cytiva_200L: { 
            image: 'XDR_200.PNG', 
            volume: 200, 
            maxSpeed: 350,
            displayName: 'Cytiva 200L',
            workingVolumeRange: { min: 40, max: 200 },
            stirrerSpeedRange: { min: 30, max: 350 },
            gasFlowRateRange: { min: 0.0025, max: 0.125 }
        },
        Cytiva_2000L: { 
            image: 'XDR_2000.PNG', 
            volume: 2000, 
            maxSpeed: 115,
            displayName: 'Cytiva 2000L',
            workingVolumeRange: { min: 400, max: 2000 },
            stirrerSpeedRange: { min: 25, max: 115 },
            gasFlowRateRange: { min: 0.001, max: 0.05 }
        }
    },
    target: {
        Sartorius_5L: { 
            image: 'Sartorius_5L.PNG', 
            volume: 5, 
            maxSpeed: 1200,
            displayName: 'Sartorius 5L',
            workingVolumeRange: { min: 3.5, max: 5 },
            stirrerSpeedRange: { min: 50, max: 1200 },
            gasFlowRateRange: { min: 0.01, max: 0.1 }
        },
        Cytiva_200L: { 
            image: 'XDR_200.PNG', 
            volume: 200, 
            maxSpeed: 350,
            displayName: 'Cytiva 200L',
            workingVolumeRange: { min: 40, max: 200 },
            stirrerSpeedRange: { min: 30, max: 350 },
            gasFlowRateRange: { min: 0.0025, max: 0.125 }
        },
        Cytiva_2000L: { 
            image: 'XDR_2000.PNG', 
            volume: 2000, 
            maxSpeed: 115,
            displayName: 'Cytiva 2000L',
            workingVolumeRange: { min: 400, max: 2000 },
            stirrerSpeedRange: { min: 25, max: 115 },
            gasFlowRateRange: { min: 0.001, max: 0.05 }
        }
    }
};

// Initialize the application
function init() {
    setupEventListeners();
    updateSourceSliderRanges(); // Set up initial source slider ranges
    updateTargetReactorOptions(); // Set up initial target options
    updateTargetSliderRanges(); // Set up initial target slider ranges
    updateSliderValues();
    updateReactorImages();
}

// Set up all event listeners
function setupEventListeners() {
    // Source reactor controls
    workingVolumeSlider.addEventListener('input', () => updateValue(workingVolumeSlider, workingVolumeValue, 3));
    stirrerSpeedSlider.addEventListener('input', () => updateValue(stirrerSpeedSlider, stirrerSpeedValue, 3));
    gasFlowRateSlider.addEventListener('input', () => updateValue(gasFlowRateSlider, gasFlowRateValue, 5));

    // Target reactor controls
    targetWorkingVolumeSlider.addEventListener('input', () => updateValue(targetWorkingVolumeSlider, targetWorkingVolumeValue, 2));
    targetStirrerSpeedSlider.addEventListener('input', () => updateValue(targetStirrerSpeedSlider, targetStirrerSpeedValue, 2));
    targetGasFlowRateSlider.addEventListener('input', () => updateValue(targetGasFlowRateSlider, targetGasFlowRateValue, 5));

    // Reactor selection
    sourceReactorSelect.addEventListener('change', function() {
        updateSourceSliderRanges();
        updateTargetReactorOptions();
        updateReactorImages();
    });
    targetReactorSelect.addEventListener('change', function() {
        updateTargetSliderRanges();
        updateReactorImages();
    });

    // Advanced settings
    enableEditingCheckbox.addEventListener('change', toggleAdvancedSettings);
    
    // Weight sliders
    klaWeightSlider.addEventListener('input', updateWeightValues);
    mixingWeightSlider.addEventListener('input', updateWeightValues);
    shearWeightSlider.addEventListener('input', updateWeightValues);
    gasHoldUpWeightSlider.addEventListener('input', updateWeightValues);
    kolmogorovWeightSlider.addEventListener('input', updateWeightValues);

    // Run scaling button
    runButton.addEventListener('click', runScalingCalculation);
}

// Update slider value display
function updateValue(slider, valueElement, decimals) {
    const value = parseFloat(slider.value);
    valueElement.textContent = value.toFixed(decimals);
}

// Update all slider values on initialization
function updateSliderValues() {
    updateValue(workingVolumeSlider, workingVolumeValue, 3);
    updateValue(stirrerSpeedSlider, stirrerSpeedValue, 3);
    updateValue(gasFlowRateSlider, gasFlowRateValue, 5);
    updateValue(targetWorkingVolumeSlider, targetWorkingVolumeValue, 2);
    updateValue(targetStirrerSpeedSlider, targetStirrerSpeedValue, 2);
    updateValue(targetGasFlowRateSlider, targetGasFlowRateValue, 5);
}

// Update source reactor slider ranges based on selection
function updateSourceSliderRanges() {
    const sourceReactor = sourceReactorSelect.value;
    const config = reactorConfigs.source[sourceReactor];
    
    if (config) {
        // Update working volume slider
        workingVolumeSlider.min = config.workingVolumeRange.min;
        workingVolumeSlider.max = config.workingVolumeRange.max;
        workingVolumeSlider.value = Math.min(workingVolumeSlider.value, config.workingVolumeRange.max);
        workingVolumeSlider.step = config.workingVolumeRange.max <= 1 ? 0.01 : 0.1;
        
        // Update stirrer speed slider
        stirrerSpeedSlider.min = config.stirrerSpeedRange.min;
        stirrerSpeedSlider.max = config.stirrerSpeedRange.max;
        stirrerSpeedSlider.value = Math.min(stirrerSpeedSlider.value, config.stirrerSpeedRange.max);
        
        // Update gas flow rate slider
        gasFlowRateSlider.min = config.gasFlowRateRange.min;
        gasFlowRateSlider.max = config.gasFlowRateRange.max;
        gasFlowRateSlider.value = Math.min(gasFlowRateSlider.value, config.gasFlowRateRange.max);
        gasFlowRateSlider.step = config.gasFlowRateRange.max <= 1 ? 0.001 : 0.01;
        
        // Update displayed values
        updateValue(workingVolumeSlider, workingVolumeValue, 3);
        updateValue(stirrerSpeedSlider, stirrerSpeedValue, 0);
        updateValue(gasFlowRateSlider, gasFlowRateValue, 3);
    }
}

// Update target reactor slider ranges based on selection
function updateTargetSliderRanges() {
    const targetReactor = targetReactorSelect.value;
    const config = reactorConfigs.target[targetReactor];
    
    if (config) {
        // Update working volume slider
        targetWorkingVolumeSlider.min = config.workingVolumeRange.min;
        targetWorkingVolumeSlider.max = config.workingVolumeRange.max;
        targetWorkingVolumeSlider.value = Math.min(targetWorkingVolumeSlider.value, config.workingVolumeRange.max);
        
        // Set appropriate step size based on reactor type
        if (config.workingVolumeRange.max <= 5) {
            targetWorkingVolumeSlider.step = 0.1; // For 5L and smaller reactors
        } else if (config.workingVolumeRange.max <= 200) {
            targetWorkingVolumeSlider.step = 5; // For 200L reactors
        } else {
            targetWorkingVolumeSlider.step = 10; // For 2000L reactors
        }
        
        // Update stirrer speed slider
        targetStirrerSpeedSlider.min = config.stirrerSpeedRange.min;
        targetStirrerSpeedSlider.max = config.stirrerSpeedRange.max;
        targetStirrerSpeedSlider.value = Math.min(targetStirrerSpeedSlider.value, config.stirrerSpeedRange.max);
        
        // Update gas flow rate slider
        targetGasFlowRateSlider.min = config.gasFlowRateRange.min;
        targetGasFlowRateSlider.max = config.gasFlowRateRange.max;
        targetGasFlowRateSlider.value = Math.min(targetGasFlowRateSlider.value, config.gasFlowRateRange.max);
        targetGasFlowRateSlider.step = config.gasFlowRateRange.max <= 1 ? 0.001 : 0.01;
        
        // Update displayed values
        updateValue(targetWorkingVolumeSlider, targetWorkingVolumeValue, 2);
        updateValue(targetStirrerSpeedSlider, targetStirrerSpeedValue, 0);
        updateValue(targetGasFlowRateSlider, targetGasFlowRateValue, 3);
    }
}

// Update target reactor options based on source reactor selection
function updateTargetReactorOptions() {
    const sourceReactor = sourceReactorSelect.value;
    const sourceVolume = reactorConfigs.source[sourceReactor].volume;
    
    // Clear current options
    targetReactorSelect.innerHTML = '';
    
    // Add only target reactors with higher volumes
    Object.entries(reactorConfigs.target).forEach(([key, config]) => {
        if (config.volume > sourceVolume) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = config.displayName;
            targetReactorSelect.appendChild(option);
        }
    });
    
    // If no valid target reactors, show a message
    if (targetReactorSelect.options.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'No larger reactors available';
        option.disabled = true;
        targetReactorSelect.appendChild(option);
    }
}

// Update reactor images based on selection
function updateReactorImages() {
    const sourceReactor = sourceReactorSelect.value;
    const targetReactor = targetReactorSelect.value;
    
    if (reactorConfigs.source[sourceReactor]) {
        sourceImage.src = reactorConfigs.source[sourceReactor].image;
        sourceImage.alt = `Source Reactor ${reactorConfigs.source[sourceReactor].displayName}`;
    }
    
    if (reactorConfigs.target[targetReactor]) {
        targetImage.src = reactorConfigs.target[targetReactor].image;
        targetImage.alt = `Target Reactor ${reactorConfigs.target[targetReactor].displayName}`;
    }
}

// Toggle advanced settings editing
function toggleAdvancedSettings() {
    const weightControls = document.querySelector('.weight-controls');
    const isEnabled = enableEditingCheckbox.checked;
    
    weightControls.style.opacity = isEnabled ? '1' : '0.5';
    weightControls.style.pointerEvents = isEnabled ? 'auto' : 'none';
    
    // Reset to defaults if disabled
    if (!isEnabled) {
        klaWeightSlider.value = 1;
        mixingWeightSlider.value = 1;
        shearWeightSlider.value = 1;
        gasHoldUpWeightSlider.value = 1;
        kolmogorovWeightSlider.value = 1;
        updateWeightValues();
    }
}

// Update weight values display
function updateWeightValues() {
    const klaValue = klaWeightSlider.nextElementSibling;
    const mixingValue = mixingWeightSlider.nextElementSibling;
    const shearValue = shearWeightSlider.nextElementSibling;
    const gasHoldUpValue = gasHoldUpWeightSlider.nextElementSibling;
    const kolmogorovValue = kolmogorovWeightSlider.nextElementSibling;
    
    klaValue.textContent = parseFloat(klaWeightSlider.value).toFixed(3);
    mixingValue.textContent = parseFloat(mixingWeightSlider.value).toFixed(3);
    shearValue.textContent = parseFloat(shearWeightSlider.value).toFixed(3);
    gasHoldUpValue.textContent = parseFloat(gasHoldUpWeightSlider.value).toFixed(3);
    kolmogorovValue.textContent = parseFloat(kolmogorovWeightSlider.value).toFixed(3);
}

// Run scaling calculation
function runScalingCalculation() {
    // Add loading state
    runButton.classList.add('loading');
    runButton.textContent = 'Calculating...';
    runButton.disabled = true;
    
    // Simulate calculation delay
    setTimeout(() => {
        calculateScaling();
        showResults();
        
        // Remove loading state
        runButton.classList.remove('loading');
        runButton.textContent = 'Run Scaling Tool';
        runButton.disabled = false;
    }, 1500);
}

// Calculate scaling parameters
function calculateScaling() {
    // Get source parameters
    const sourceVolume = parseFloat(workingVolumeSlider.value);
    const sourceSpeed = parseFloat(stirrerSpeedSlider.value);
    const sourceFlowRate = parseFloat(gasFlowRateSlider.value);
    
    // Get target parameters
    const targetVolume = parseFloat(targetWorkingVolumeSlider.value);
    
    // Get reactor configurations for validation
    const sourceReactor = sourceReactorSelect.value;
    const targetReactor = targetReactorSelect.value;
    
    if (!sourceReactor || !targetReactor || !reactorConfigs.target[targetReactor]) {
        // Handle case where no valid target reactor is selected
        recommendedSpeed.textContent = 'N/A';
        recommendedFlow.textContent = 'N/A';
        return;
    }
    
    // Calculate scaling factor
    const volumeScalingFactor = targetVolume / sourceVolume;
    
    // Calculate recommended parameters using simplified scaling relationships
    // Power per unit volume scaling: P/V ∝ N³D²
    // Assuming geometric similarity, D ∝ V^(1/3)
    // Therefore: N₂ = N₁ × (V₁/V₂)^(1/3)
    const speedScalingFactor = Math.pow(sourceVolume / targetVolume, 1/3);
    const recommendedStirrerSpeed = sourceSpeed * speedScalingFactor;
    
    // Gas flow rate typically scales with volume
    // For maintaining similar kLa: Q₂ = Q₁ × (V₂/V₁)
    const recommendedGasFlowRate = sourceFlowRate * volumeScalingFactor;
    
    // Apply weight factors if editing is enabled
    let finalSpeed = recommendedStirrerSpeed;
    let finalFlowRate = recommendedGasFlowRate;
    
    if (enableEditingCheckbox.checked) {
        const klaWeight = parseFloat(klaWeightSlider.value);
        const mixingWeight = parseFloat(mixingWeightSlider.value);
        const shearWeight = parseFloat(shearWeightSlider.value);
        const gasHoldUpWeight = parseFloat(gasHoldUpWeightSlider.value);
        const kolmogorovWeight = parseFloat(kolmogorovWeightSlider.value);
        
        // Apply weighted adjustments (simplified approach)
        // Include all factors in the calculations
        finalSpeed *= (mixingWeight + shearWeight + kolmogorovWeight) / 3;
        finalFlowRate *= (klaWeight + gasHoldUpWeight) / 2;
    }
    
    // Ensure values are within reasonable ranges based on target reactor
    const targetConfig = reactorConfigs.target[targetReactor];
    finalSpeed = Math.max(20, Math.min(targetConfig.maxSpeed, finalSpeed));
    finalFlowRate = Math.max(0.1, Math.min(5.0, finalFlowRate));
    
    // Update results
    recommendedSpeed.textContent = `${finalSpeed.toFixed(1)} RPM`;
    recommendedFlow.textContent = `${finalFlowRate.toFixed(3)} vvm`;
}

// Show results section with animation
function showResults() {
    resultsSection.style.display = 'block';
    resultsSection.classList.add('fade-in');
    
    // Show principles section
    principlesSection.style.display = 'block';
    principlesSection.classList.add('fade-in');
    
    // Update formulas based on whether advanced settings are enabled
    updateFormulas();
    
    // Scroll to results
    resultsSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

// Update formulas display based on advanced settings
function updateFormulas() {
    if (enableEditingCheckbox.checked) {
        // Show formulas with weight factors
        speedFormula.textContent = 'N₂ = (mixingWeight + shearWeight + kolmogorovWeight) / 3 × N₁ × (V₁/V₂)^(1/3)';
        flowFormula.textContent = 'Q₂ = (klaWeight + gasHoldUpWeight) / 2 × Q₁ × (V₂/V₁)';
    } else {
        // Show basic formulas without weight factors
        speedFormula.textContent = 'N₂ = N₁ × (V₁/V₂)^(1/3)';
        flowFormula.textContent = 'Q₂ = Q₁ × (V₂/V₁)';
    }
}

// Add some visual feedback for slider interactions
function addSliderEffects() {
    const sliders = document.querySelectorAll('input[type="range"]');
    
    sliders.forEach(slider => {
        slider.addEventListener('input', function() {
            const value = (this.value - this.min) / (this.max - this.min) * 100;
            this.style.background = `linear-gradient(to right, #42a5f5 0%, #42a5f5 ${value}%, #1a1a2e ${value}%, #1a1a2e 100%)`;
        });
        
        // Initialize background
        const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
        slider.style.background = `linear-gradient(to right, #42a5f5 0%, #42a5f5 ${value}%, #1a1a2e ${value}%, #1a1a2e 100%)`;
    });
}

// Add hover effects for reactor images
function addImageEffects() {
    const images = [sourceImage, targetImage];
    
    images.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Validate inputs and provide feedback
function validateInputs() {
    const sourceVolume = parseFloat(workingVolumeSlider.value);
    const targetVolume = parseFloat(targetWorkingVolumeSlider.value);
    const sourceReactor = sourceReactorSelect.value;
    const targetReactor = targetReactorSelect.value;
    
    if (!targetReactor || targetReactor === '') {
        showNotification('Please select a target reactor with higher volume than the source', 'warning');
        return;
    }
    
    const sourceConfig = reactorConfigs.source[sourceReactor];
    const targetConfig = reactorConfigs.target[targetReactor];
    
    if (sourceConfig && targetConfig && targetConfig.volume <= sourceConfig.volume) {
        showNotification('Target reactor volume should be larger than source reactor volume for scale-up', 'warning');
    }
    
    if (targetVolume <= sourceVolume) {
        showNotification('Target working volume should typically be larger than source working volume for scale-up', 'warning');
    }
}

// Show notification messages
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'warning' ? '#f39c12' : '#3498db'};
        color: white;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    init();
    addSliderEffects();
    addImageEffects();
    
    // Add validation on value changes
    workingVolumeSlider.addEventListener('change', validateInputs);
    targetWorkingVolumeSlider.addEventListener('change', validateInputs);
});

// Add some CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
