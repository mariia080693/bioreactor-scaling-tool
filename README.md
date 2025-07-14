# 🧪 Bioreactor Scaling Up Tool

A web-based interactive tool for scaling bioprocess parameters between different bioreactor sizes using established bioprocess engineering principles.

## 📋 Overview

This tool helps bioprocess engineers and researchers scale up their bioprocesses from smaller laboratory-scale bioreactors to larger production-scale systems. It applies fundamental scaling relationships while allowing fine-tuning through advanced bioprocess parameters.

## ✨ Features

### 🔬 **Core Functionality**
- **Interactive Scaling Calculations** based on bioprocess engineering principles
- **Dynamic Parameter Ranges** that adjust based on selected reactor type
- **Real-time Formula Display** showing the calculations being used
- **Advanced Weight Factors** for fine-tuning scaling parameters

### 🏭 **Supported Bioreactors**
- **Sartorius 250mL** (Ambr system)
- **Sartorius 5L** 
- **Cytiva 200L** (XDR series)
- **Cytiva 2000L** (XDR series)

### 📊 **Calculated Parameters**
- **Stirrer Speed** (RPM) - Based on constant power per unit volume
- **Gas Flow Rate** (vvm) - Based on maintaining similar kLa

### ⚙️ **Advanced Settings**
- **kLa** (Mass Transfer Coefficient)
- **Mixing Time**
- **Shear Rate**
- **Gas Hold Up**
- **Kolmogorov Scale**

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required

### Installation
1. Download or clone the project files
2. Ensure all files are in the same directory:
   ```
   bioreactor-scaling-tool/
   ├── index.html
   ├── styles.css
   ├── script.js
   ├── README.md
   └── images/
       ├── prototype.PNG
       ├── prototype_2.PNG
       ├── Sartorius_Ambr_250ml.png
       ├── Sartorius_5L.PNG
       ├── XDR_200.PNG
       └── XDR_2000.PNG
   ```
3. Open `index.html` in your web browser

### Usage
1. **Select Source Reactor** - Choose your current/smaller bioreactor
2. **Set Source Parameters** - Adjust working volume, stirrer speed, and gas flow rate
3. **Select Target Reactor** - Choose your desired larger bioreactor
4. **Set Target Ranges** - Define acceptable ranges for the target reactor
5. **Enable Advanced Settings** (optional) - Fine-tune with bioprocess weight factors
6. **Run Scaling Tool** - Click the button to calculate recommendations

## 🔬 Scientific Principles

### Core Scaling Relationships

#### **Stirrer Speed Scaling**
```
N₂ = N₁ × (V₁/V₂)^(1/3)
```
- Based on maintaining constant power per unit volume (P/V)
- Accounts for geometric similarity where impeller diameter scales with volume^(1/3)

#### **Gas Flow Rate Scaling**
```
Q₂ = Q₁ × (V₂/V₁)
```
- Based on maintaining similar mass transfer coefficient (kLa)
- Linear scaling with volume for consistent oxygen transfer

#### **Advanced Weight Factors**
When advanced settings are enabled:
```
N₂ = (mixingWeight + shearWeight + kolmogorovWeight) / 3 × N₁ × (V₁/V₂)^(1/3)
Q₂ = (klaWeight + gasHoldUpWeight) / 2 × Q₁ × (V₂/V₁)
```

## 🎨 Technical Details

### **Built With**
- **HTML5** - Structure and semantics
- **CSS3** - Modern styling with gradients and animations
- **Vanilla JavaScript** - Interactive functionality and calculations

### **Browser Compatibility**
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### **Responsive Design**
- Desktop-first approach
- Tablet and mobile optimized layouts
- Touch-friendly controls

## 📱 User Interface

### **Design Features**
- **Dark Theme** with blue and gold accents
- **Interactive Sliders** with real-time value updates
- **Hover Effects** and smooth animations
- **Dynamic Content** that updates based on selections
- **Visual Feedback** for all user interactions

### **Color Scheme**
- **Primary**: Blue theme (#64b5f6, #42a5f5)
- **Accent**: Gold (#ffd700, #ffb300)
- **Background**: Dark gradients (#0f0f23, #1a1a2e, #16213e)
- **Text**: Light gray (#e0e0e0, #b0bec5)

## ⚡ Performance

### **Optimizations**
- **Minimal Dependencies** - No external libraries
- **Efficient DOM Manipulation** - Direct element references
- **CSS Transitions** - Hardware-accelerated animations
- **Responsive Images** - Optimized for different screen sizes

## 🔧 Configuration

### **Reactor Parameters**
All reactor specifications are defined in `script.js` in the `reactorConfigs` object:

```javascript
const reactorConfigs = {
    source: {
        Sartorius_250mL: {
            volume: 0.25,  // L
            maxSpeed: 4500,  // RPM
            workingVolumeRange: { min: 0.1, max: 0.25 },  // L
            stirrerSpeedRange: { min: 100, max: 4500 },   // RPM
            gasFlowRateRange: { min: 0.01, max: 1.0 }     // vvm
        }
        // ... other reactors
    }
};
```

### **Safety Limits**
- **Minimum Stirrer Speed**: 20 RPM
- **Maximum Gas Flow Rate**: 5.0 vvm
- **Minimum Gas Flow Rate**: 0.1 vvm

## 🧪 Use Cases

### **Research & Development**
- Laboratory to pilot scale transitions
- Process optimization studies
- Parameter screening

### **Manufacturing**
- Production scale-up planning
- Technology transfer
- Process validation

### **Education**
- Bioprocess engineering teaching
- Scale-up principle demonstration
- Interactive learning tool

## 📊 Example Calculations

### **Scaling from 250mL to 5L (20x scale-up)**
- **Source**: 250mL, 1000 RPM, 0.1 vvm
- **Calculations**:
  - Volume scaling factor: 5L ÷ 0.25L = 20x
  - Speed scaling: 1000 × (0.25/5)^(1/3) = 368 RPM
  - Flow scaling: 0.1 × (5/0.25) = 2.0 vvm
- **Result**: 5L, 368 RPM, 2.0 vvm

## 🤝 Contributing

### **Adding New Reactors**
1. Add reactor specifications to `reactorConfigs` in `script.js`
2. Add corresponding images to the images folder
3. Update dropdown options in `index.html`

### **Modifying Calculations**
- Core scaling logic is in the `calculateScaling()` function
- Weight factor applications are clearly marked
- All formulas are documented with engineering principles

## 📄 License

This project is intended for educational and research purposes. Please ensure compliance with your institution's policies when using for commercial applications.

## 🙏 Acknowledgments

- **Bioprocess Engineering Principles** from various academic sources
- **Modern Web Design** practices and responsive design principles
- **User Experience** considerations for scientific applications

## 📞 Support

For questions about bioprocess engineering principles or technical issues, please refer to:
- Bioprocess engineering textbooks for theoretical background
- Web browser documentation for technical issues
- The code comments for implementation details

---

**Version**: 1.0  
**Last Updated**: July 2025  
**Compatibility**: Modern web browsers  
**Status**: Production ready
