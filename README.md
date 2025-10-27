# CivicConnect

A modern React Native mobile application that empowers citizens to report and track civic issues in their community. Features a responsive UI with support for both light and dark themes.

![CivicConnect Logo](./assets/icon.png)

## 🌟 Features

- **User Authentication**: Secure user registration and login system
- **Issue Reporting**: Easy-to-use interface for reporting civic issues
- **Location Integration**: Automatic location detection for accurate issue reporting
- **Photo Upload**: Take or upload photos of issues directly through the app
- **Issue Tracking**: Real-time status updates on reported issues
- **Dark/Light Theme**: Customizable app appearance for better user experience
- **Profile Management**: User profile customization and settings
- **Responsive Design**: Optimized for various screen sizes and orientations

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator
- Expo Go app (for physical device testing)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/CivicConnect.git
cd CivicConnect
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
# or
npx expo start
```

4. Run on your device:
- Scan the QR code with Expo Go (Android)
- Scan the QR code with Camera app (iOS)
- Press 'i' for iOS simulator
- Press 'a' for Android emulator

## 📱 App Structure

```
CivicConnect/
├── src/
│   ├── components/     # Reusable UI components
│   ├── navigation/     # Navigation configuration
│   ├── screens/        # App screens
│   ├── services/       # API and external services
│   ├── store/         # State management
│   ├── theme/         # Theme configuration
│   ├── types/         # TypeScript types
│   └── utils/         # Helper functions
├── assets/            # Images and assets
└── App.tsx           # App entry point
```

## 🎨 Theme Customization

The app supports both light and dark themes. Users can:
- Toggle between themes in the Profile screen
- Theme automatically adapts to system preferences
- Customized UI elements for both themes

## 📸 Screenshots

[Place screenshots here showing key features of your app in both light and dark themes]

## 🛠 Technical Stack

- React Native
- TypeScript
- Expo
- React Navigation
- Zustand (State Management)
- AsyncStorage
- Expo Location Services
- React Native Paper (UI Components)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) for the amazing React Native toolchain
- [React Navigation](https://reactnavigation.org/) for the routing system
- All contributors who help improve this project

## 📞 Support

For support, email support@civicconnect.com or open an issue in the repository.

## 🔮 Future Enhancements

- Push notifications for issue updates
- In-app messaging system
- Community forums
- Analytics dashboard
- Multi-language support
- Offline mode support

---

Made with ❤️ for better communities