# Smart Discount Calculator

A comprehensive discount calculator that helps you calculate the real final price of products with multiple discount types, taxes, and shipping costs.

## Features

- ✨ **Multiple Discount Types**: Support for coupons, promo codes, membership discounts, and more
- 💰 **Real-time Calculations**: Instant results as you type
- 📊 **Detailed Breakdown**: Transparent price calculation with step-by-step details
- 🏛️ **Tax Calculation**: Accurate sales tax computation
- 🚚 **Shipping Options**: Various shipping methods including free shipping
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- 🔒 **Privacy Focused**: All calculations happen in your browser
- 📋 **Copy & Share**: Easy sharing of calculation results

## Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd smart-discount-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The build files will be generated in the `dist` directory.

## Usage

1. **Enter Original Price**: Start by entering the item's original price
2. **Add Discounts**: 
   - Add coupon discounts (percentage or fixed amount)
   - Add promo codes
   - Include membership or subscription discounts
3. **Set Tax Rate**: Enter your local sales tax rate
4. **Choose Shipping**: Select shipping option or enter custom cost
5. **View Results**: See your final price with detailed breakdown

## Project Structure

```
src/
├── components/
│   ├── Calculator/
│   │   ├── InputForm.tsx      # Main input form
│   │   └── ResultDisplay.tsx  # Results display
│   └── UI/
│       ├── Button.tsx         # Reusable button component
│       ├── Input.tsx          # Input component
│       └── Select.tsx         # Select component
├── hooks/
│   ├── useCalculator.ts       # Main calculator logic
│   └── useLocalStorage.ts     # Local storage hook
├── types/
│   └── calculator.ts          # TypeScript type definitions
├── utils/
│   ├── calculations.ts        # Core calculation logic
│   └── validation.ts          # Input validation utilities
├── App.tsx                    # Main app component
├── main.tsx                   # App entry point
└── index.css                  # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- UI components built with [Tailwind CSS](https://tailwindcss.com/)
- Built with [Vite](https://vitejs.dev/) and [React](https://reactjs.org/)

---

Made with ❤️ for smart shoppers everywhere! 